"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Sparkles,
  Loader2,
  Send,
  Calendar,
  User,
  Trash2,
} from "lucide-react";
import { Post, Comment, User as UserType } from "@/lib/types";
import api from "@/lib/utils";
import { AxiosResponse } from "axios";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import UserListModal from "@/components/UserListModal";

export default function UniquePostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.postId as string;
  const { currentUser } = useAuth();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentAuthors, setCommentAuthors] = useState<{
    [key: number]: UserType;
  }>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [userHasLiked, setUserHasLiked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch post, comments, and current user in parallel
        const promises = [
          api.get(`/posts/${postId}`),
          api.get(`/comment/post/${postId}`),
        ];

        // Only fetch user if there's a current user in context
        if (currentUser) {
          promises.push(api.get("/users/me"));
        }

        const responses = await Promise.all(promises);
        const [postResponse, commentsResponse, userResponse] = responses;

        setPost(postResponse.data);
        setComments(commentsResponse.data);

        // Check if current user has liked the post
        if (userResponse && userResponse.data) {
          const userId = userResponse.data.id;
          setUserHasLiked(postResponse.data.likes.includes(userId));
        }

        // Fetch author information for each comment
        const uniqueAuthorIds = [
          ...new Set(
            commentsResponse.data.map((comment: Comment) => comment.authorId)
          ),
        ] as number[];

        if (uniqueAuthorIds.length > 0) {
          const authorPromises = uniqueAuthorIds.map((authorId: number) =>
            api.get(`/users/${authorId}`)
          );

          const authorResponses = await Promise.all(authorPromises);
          const authorsMap: { [key: number]: UserType } = {};

          authorResponses.forEach((response, index) => {
            authorsMap[uniqueAuthorIds[index]] = response.data;
          });

          setCommentAuthors(authorsMap);
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
        setError("Failed to load post");
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchData();
    }
  }, [postId, currentUser]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !post || !currentUser) return;

    setIsAddingComment(true);
    try {
      const response: AxiosResponse<Comment> = await api.post("/comment", {
        content: newComment.trim(),
        postId: parseInt(postId),
      });

      setComments((prev) => [...prev, response.data]);

      // Add current user to commentAuthors if not already there
      if (!commentAuthors[currentUser.id]) {
        setCommentAuthors((prev) => ({
          ...prev,
          [currentUser.id]: currentUser,
        }));
      }

      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsAddingComment(false);
    }
  };

  const handleLikePost = async () => {
    if (!post || !currentUser) return;

    setIsLiking(true);
    try {
      await api.post(`/posts/like/${postId}`);

      // Refresh the post to get updated likes
      const response: AxiosResponse<Post> = await api.get(`/posts/${postId}`);
      setPost(response.data);

      // Update the like status for current user
      const userResponse = await api.get("/users/me");
      const userId = userResponse.data.id;
      setUserHasLiked(response.data.likes.includes(userId));
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setIsLiking(false);
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      await api.delete(`/comment/${commentId}`);
      setComments((prev) => prev.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-700 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-white">
          <Loader2 className="animate-spin w-6 h-6" />
          <span>Loading post...</span>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-gray-700 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-400 mb-6">
            {error || "The post you're looking for doesn't exist."}
          </p>
          <Button
            onClick={() => router.push("/home/blog")}
            className="bg-green-600 text-black font-semibold hover:bg-green-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-700">
      {/* Header */}
      <header className="bg-gray-800 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/home/blog")}
              className="text-white hover:text-green-500 mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-green-600">Post Details</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Post Content */}
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold text-green-500 mb-6">
            {post.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-600">
            <Avatar
              className="w-12 h-12 cursor-pointer"
              onClick={() => router.push(`/home/profile/${post.author.id}`)}
            >
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="bg-gray-700 text-white">
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <p
                className="font-medium text-white text-lg hover:text-green-500 cursor-pointer transition-colors"
                onClick={() => router.push(`/home/profile/${post.author.id}`)}
              >
                {post.author.name}
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {formatDistanceToNow(new Date(post.createdAt), {
                    addSuffix: true,
                  })}
                </span>
                <span className="flex items-center">
                  <User className="w-4 h-4 mr-1" />
                  {post.author.role}
                </span>
              </div>
            </div>
          </div>

          {/* Post Content */}
          <div className="mb-6">
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
              {post.content}
            </p>
          </div>

          {/* AI Summary */}
          {post.aiSummary && (
            <div className="bg-green-500/10 border-l-4 border-green-400 p-4 rounded mb-6">
              <div className="flex items-start space-x-2">
                <Sparkles className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-500 mb-2">
                    AI SUMMARY
                  </p>
                  <p className="text-sm text-gray-300">{post.aiSummary}</p>
                </div>
              </div>
            </div>
          )}

          {/* Post Actions */}
          <div className="flex items-center space-x-6 pt-4 border-t border-gray-600">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleLikePost}
                disabled={isLiking || !currentUser}
                className={`flex items-center space-x-2 transition-colors disabled:opacity-50 ${
                  userHasLiked
                    ? "text-red-500 hover:text-red-600"
                    : "text-gray-400 hover:text-red-500"
                }`}
              >
                {isLiking ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Heart
                    className={`w-5 h-5 ${userHasLiked ? "fill-current" : ""}`}
                  />
                )}
              </button>
              <UserListModal
                count={post.likes.length}
                type="likes"
                postId={post.id.toString()}
              >
                <span className="text-gray-400 hover:text-red-400 cursor-pointer transition-colors px-2 py-1 rounded hover:bg-gray-700/50">
                  {post.likes.length} likes
                </span>
              </UserListModal>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <MessageCircle className="w-5 h-5" />
              <span>{comments.length} comments</span>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-500 mb-6">
            Comments ({comments.length})
          </h2>

          {/* Add Comment */}
          {currentUser ? (
            <div className="mb-6">
              <Textarea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-green-500 focus:border-green-500 mb-3"
                rows={3}
              />
              <Button
                onClick={handleAddComment}
                disabled={!newComment.trim() || isAddingComment}
                className="bg-green-600 text-black font-semibold hover:bg-green-700"
              >
                {isAddingComment ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Add Comment
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="mb-6 text-center">
              <p className="text-gray-400 mb-3">
                Login to add comments and like posts
              </p>
              <Button
                onClick={() => router.push("/auth/login")}
                className="bg-green-600 text-black font-semibold hover:bg-green-700"
              >
                Login
              </Button>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-4">
            {comments.length > 0 ? (
              comments.map((comment) => {
                const author = commentAuthors[comment.authorId];
                if (!author) return null; // Skip if author not loaded yet

                return (
                  <div key={comment.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar
                        className="w-8 h-8 cursor-pointer"
                        onClick={() =>
                          router.push(`/home/profile/${author.id}`)
                        }
                      >
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-gray-600 text-white text-sm">
                          {author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span
                              className="font-medium text-white hover:text-green-500 cursor-pointer transition-colors"
                              onClick={() =>
                                router.push(`/home/profile/${author.id}`)
                              }
                            >
                              {author.name}
                            </span>
                            <span className="text-xs text-gray-400">
                              {formatDistanceToNow(
                                new Date(comment.createdAt),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </span>
                          </div>
                          {currentUser &&
                            currentUser.id === comment.authorId && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteComment(comment.id)}
                                className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                        </div>
                        <p className="text-gray-300">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-400 text-center py-6">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
