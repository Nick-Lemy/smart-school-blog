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
import { Sparkles, Search, MessageCircle, ThumbsUpIcon } from "lucide-react";

export default function BlogPage() {
  // Sample data
  const feedPosts = [
    {
      id: 1,
      title: "The Future of Renewable Energy in Africa",
      excerpt: "Exploring sustainable energy solutions across the continent...",
      author: "Amina Hassan",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "Academic",
      likes: 89,
      comments: 23,
      timeAgo: "3 hours ago",
      aiSummary:
        "Africa has immense potential for renewable energy development, particularly in solar and wind power sectors.",
    },
    {
      id: 2,
      title: "Campus Food Review: Best Local Dishes",
      excerpt:
        "Rating the most delicious and affordable meals around campus...",
      author: "John Ochieng",
      avatar: "/placeholder.svg?height=40&width=40",
      category: "Social",
      likes: 156,
      comments: 34,
      timeAgo: "5 hours ago",
      aiSummary:
        "Local campus eateries offer diverse, affordable African cuisine with excellent taste and nutritional value.",
    },
  ];

  return (
    <div className="min-h-screen ">
      {/* Header with gradient */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-green-600">Posts</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search posts..."
                  className="pl-10 w-64 bg-gray-100 border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {feedPosts.map((post) => (
            <Card key={post.id} className=" border-0 shadow-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-xs text-gray-500">
                    <span className="text-black">Author:</span> {post.author}
                  </p>
                  {/* <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={post.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {post.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-gray-900">{post.author}</p>
                      <p className="text-sm text-gray-500">{post.timeAgo}</p>
                    </div>
                  </div> */}
                  {/* <Badge
                    variant="outline"
                    className="border-gray-300 text-gray-700"
                  >
                    {post.category}
                  </Badge> */}
                </div>
                <CardTitle className="text-xl cursor-pointer hover:text-green-600 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded">
                  <div className="flex items-start space-x-2">
                    <Sparkles className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-green-700 mb-1">
                        AI SUMMARY
                      </p>
                      <p className="text-sm text-green-600">{post.aiSummary}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                      <ThumbsUpIcon className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                  </div>
                  <Button variant="outline" className="">
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
