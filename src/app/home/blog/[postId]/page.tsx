"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
} from "lucide-react";
import { Post, Comment } from "@/lib/types";
import api from "@/lib/utils";
import { AxiosResponse } from "axios";
import { formatDistanceToNow } from "date-fns";

export default function UniquePostPage() {
  const params = useParams();
  const router = useRouter();
  const postId = params.postId as string;

  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isAddingComment, setIsAddingComment] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const response: AxiosResponse<Post> = await api.get(`/posts/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Failed to load post");
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleAddComment = async () => {
    if (!newComment.trim() || !post) return;

    setIsAddingComment(true);
    try {
      const response: AxiosResponse<Comment> = await api.post(
        `/posts/${postId}/comments`,
        {
          content: newComment.trim(),
        }
      );

      setPost((prev) =>
        prev
          ? {
              ...prev,
              comments: [...prev.comments, response.data],
            }
          : null
      );

      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsAddingComment(false);
    }
  };

  const handleLikePost = async () => {
    if (!post) return;

    try {
      await api.post(`/posts/${postId}/like`);
      // Update likes in local state (assuming the API returns updated post or we refetch)
      setPost((prev) =>
        prev
          ? {
              ...prev,
              likes: [...prev.likes, 1], // Simplified - in real app you'd handle user ID properly
            }
          : null
      );
    } catch (error) {
      console.error("Error liking post:", error);
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
        {/* Main Post Card */}
        <Card className="bg-gray-800 border-gray-600 text-white mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-green-500 mb-4">
              {post.title}
            </CardTitle>

            {/* Author Info */}
            <div className="flex items-center space-x-3 mb-4">
              <Avatar className="w-10 h-10">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="bg-gray-700 text-white">
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-white">{post.author.name}</p>
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
          </CardHeader>

          <CardContent>
            {/* Post Content */}
            <div className="prose prose-invert max-w-none mb-6">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {post.content}
              </p>
            </div>

            {/* AI Summary */}
            {post.aiSummary && (
              <div className="bg-gray-600/50 border-l-4 border-green-400 p-4 rounded mb-6">
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
              <button
                onClick={handleLikePost}
                className="flex items-center space-x-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart className="w-5 h-5" />
                <span>{post.likes.length}</span>
              </button>
              <div className="flex items-center space-x-2 text-gray-400">
                <MessageCircle className="w-5 h-5" />
                <span>{post.comments.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="bg-gray-800 border-gray-600 text-white">
          <CardHeader>
            <CardTitle className="text-lg text-green-500">
              Comments ({post.comments.length})
            </CardTitle>
          </CardHeader>

          <CardContent>
            {/* Add Comment */}
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

            {/* Comments List */}
            <div className="space-y-4">
              {post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <div key={comment.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback className="bg-gray-600 text-white text-sm">
                          {comment.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-white">
                            {comment.author.name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {formatDistanceToNow(new Date(comment.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                        <p className="text-gray-300">{comment.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-6">
                  No comments yet. Be the first to comment!
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
