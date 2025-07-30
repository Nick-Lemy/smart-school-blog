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
import { Sparkles, Search } from "lucide-react";

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
      <header className="bg-gray-800 white sticky -top-0.25 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-green-600">Posts</h1>
            </div>
            <Button className="bg-green-600 text-black font-semibold">
              Create Post
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search posts..."
              className="pl-10 w-72 bg-gray-100 border-0"
            />
          </div>
        </div>
        <div className="space-y-6">
          {feedPosts.map((post) => (
            <Card key={post.id} className=" border-0 shadow-0">
              <CardHeader>
                <CardTitle className="text-xl cursor-pointer text-green-600 transition-colors">
                  {post.title}
                </CardTitle>
                <CardDescription className="text-white font-normal">
                  {post.excerpt}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="bg-gray-600/50 border-l-4 border-green-400 p-3 rounded">
                  <div className="flex items-start justif space-x-2">
                    <Sparkles className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-green-500 mb-1">
                        AI SUMMARY
                      </p>
                      <p className="text-sm text-gray-300 font-thin">
                        {post.aiSummary}
                      </p>
                    </div>
                  </div>
                </div>

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
                    {post.author}
                  </p>
                  <p className="text-sm text-gray-500">{post.timeAgo}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
