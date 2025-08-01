"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Post } from "@/lib/types";
import api from "@/lib/utils";
import { AxiosResponse } from "axios";
import { Sparkles, Search, Loader2, Plus, RefreshCw } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function BlogPage() {
  const router = useRouter();
  const [feedPosts, setFeedPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [regeneratingPostId, setRegeneratingPostId] = useState<number | null>(
    null
  );
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });

  const fetchPosts = async () => {
    try {
      const response: AxiosResponse<Post[]> = await api.get("/posts");
      return response.data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return [];
    }
  };

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content) return;

    setIsCreatingPost(true);
    try {
      const response: AxiosResponse<Post> = await api.post("/posts", {
        title: newPost.title,
        content: newPost.content,
      });

      router.push("/home/blog/" + response.data.id);
      // setFeedPosts((prev) => [response.data, ...prev]);
      setNewPost({ title: "", content: "" });
      setPostDialogOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsCreatingPost(false);
    }
  };

  const handleRegenerateAISummary = async (postId: number) => {
    setRegeneratingPostId(postId);
    try {
      const response: AxiosResponse<{ content: string }> = await api.get(
        `/posts/${postId}/summary`
      );

      // Update the specific post in the feedPosts array
      setFeedPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === postId
            ? { ...post, aiSummary: response.data.content }
            : post
        )
      );
    } catch (error) {
      console.error("Error regenerating AI summary:", error);
    } finally {
      setRegeneratingPostId(null);
    }
  };

  const filteredPosts = feedPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Fetch posts on mount
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      const posts = await fetchPosts();
      setFeedPosts(posts);
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  return (
    <main className="min-h-screen ">
      {/* Header with gradient */}
      <header className="bg-gray-800 white sticky -top-0.25 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-green-600">Posts</h1>
            </div>
            <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-green-600 text-black font-semibold flex flex-row items-center justify-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Create Post</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-gray-800 text-white border-gray-600">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Create New Post
                  </DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Share your knowledge and experiences with the SmartSchool
                    community
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Input
                    placeholder="Enter an engaging post title..."
                    value={newPost.title}
                    onChange={(e) =>
                      setNewPost({ ...newPost, title: e.target.value })
                    }
                    className="bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-green-500 focus:border-green-500"
                  />
                  <Textarea
                    placeholder="Write your post content here. Share your insights, experiences, or ask questions..."
                    rows={8}
                    value={newPost.content}
                    onChange={(e) =>
                      setNewPost({ ...newPost, content: e.target.value })
                    }
                    className="bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-green-500 focus:border-green-500"
                  />
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      className="text-white border-gray-600 hover:bg-gray-700"
                      onClick={() => setPostDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-green-600 text-black font-semibold hover:bg-green-700"
                      onClick={handleCreatePost}
                      disabled={
                        isCreatingPost || !newPost.title || !newPost.content
                      }
                    >
                      {isCreatingPost ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        "Publish Post"
                      )}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center px-2 w-full space-x-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="pl-10 w-full bg-gray-100 border-0"
            />
          </div>
        </div>
        <div className="gap-6 py-4 grid grid-cols-1 md:grid-cols-2 w-full">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <Card
                key={post.id}
                className="border rounded-lg border-gray-800/50 shadow-0"
              >
                <CardHeader>
                  <CardTitle className="text-xl cursor-pointer text-green-600 transition-colors hover:text-green-500">
                    <Link href={`/home/blog/${post.id}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-white font-normal">
                    {post.content.slice(0, 100)}...
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {post.aiSummary && (
                    <div className="bg-gray-600/50 border-l-4 border-green-400 p-3 rounded">
                      <div className="flex items-start justify-between space-x-2">
                        <div className="flex items-start space-x-2 flex-1">
                          <Sparkles className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-xs font-medium text-green-500">
                                AI SUMMARY
                              </p>
                              <button
                                onClick={() =>
                                  handleRegenerateAISummary(post.id)
                                }
                                disabled={regeneratingPostId === post.id}
                                className="flex items-center space-x-1 text-green-500 hover:text-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                title="Regenerate AI Summary"
                              >
                                {regeneratingPostId === post.id ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <RefreshCw className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                            <p className="text-sm text-gray-300 font-thin">
                              {post.aiSummary}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between w-full">
                    {/* <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-white hover:text-red-500 transition-colors">
                      <ThumbsUpIcon className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-white hover:text-green-500 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                  </div>
                  <Button className="">Read More</Button> */}
                    <p className="font-normal text-xs text-white">
                      <span className="text-green-600 font-bold">Author: </span>
                      <span className="text-white text-sm hover:text-green-500 cursor-pointer transition-colors">
                        <Link href={`/home/profile/${post.author.id}`}>
                          {post.author.name}
                        </Link>
                      </span>
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : isLoading ? (
            <div className="col-span-2 flex items-center justify-center py-8">
              <p className="text-white font-medium">
                <Loader2 className="animate-spin mr-2 inline-block w-4 h-4" />
                <span>Loading Posts...</span>
              </p>
            </div>
          ) : (
            <div className="col-span-2 flex items-center justify-center py-8">
              <p className="text-white font-medium">No Posts found.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
