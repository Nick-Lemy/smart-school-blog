"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Calendar,
  Users,
  Sparkles,
  Search,
  Heart,
  MessageCircle,
  Plus,
  TrendingUp,
  Edit,
  Trash2,
  Eye,
  Clock,
  MapPin,
  ThumbsUpIcon,
} from "lucide-react";

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState("feed");

  const userPosts = [
    {
      id: 1,
      title: "My Journey Learning React in Lagos",
      excerpt:
        "Sharing my experience learning React development while studying computer science...",
      category: "Academic",
      status: "Published",
      likes: 45,
      comments: 12,
      views: 234,
      createdAt: "2 days ago",
    },
    {
      id: 2,
      title: "Best Study Spots on Campus",
      excerpt:
        "A comprehensive guide to the quietest and most productive study locations...",
      category: "Social",
      status: "Draft",
      likes: 0,
      comments: 0,
      views: 0,
      createdAt: "1 week ago",
    },
  ];

  const userEvents = [
    {
      id: 1,
      title: "Tech Meetup: AI in Education",
      date: "March 20, 2025",
      time: "3:00 PM",
      location: "University of Lagos",
      attendees: 45,
      status: "Upcoming",
    },
    {
      id: 2,
      title: "Study Group: Data Structures",
      date: "March 18, 2025",
      time: "6:00 PM",
      location: "Library Room 204",
      attendees: 12,
      status: "Upcoming",
    },
  ];

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

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Campus Blog</h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <div className="relative w-full max-w-md">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
                <Input
                  placeholder="Search posts..."
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="bg-white text-black hover:bg-gray-100">
                <Plus />
                Create Post
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-1 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsContent value="feed" className="space-y-6">
                <div className="space-y-6">
                  {feedPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage
                                src={post.avatar || "/placeholder.svg"}
                              />
                              <AvatarFallback>
                                {post.author
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">
                                {post.author}
                              </p>
                              <p className="text-sm text-gray-500">
                                {post.timeAgo}
                              </p>
                            </div>
                          </div>
                        </div>
                        <CardTitle className="text-xl cursor-pointer transition-colors">
                          {post.title}
                        </CardTitle>
                        <CardDescription>{post.excerpt}</CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="bg-blue-50 border-l-4 border-black-400 p-3 rounded">
                          <div className="flex items-start space-x-2">
                            <Sparkles className="w-4 h-4 text-black-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-xs font-medium text-black-700 mb-1">
                                AI Summary
                              </p>
                              <p className="text-sm text-black-600">
                                {post.aiSummary}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6">
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
                              <ThumbsUpIcon className="w-4 h-4" />
                              <span className="text-sm">{post.likes}</span>
                            </button>
                            <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
                              <MessageCircle className="w-4 h-4" />
                              <span className="text-sm">{post.comments}</span>
                            </button>
                          </div>
                          <Button variant="ghost" size="sm">
                            Read More
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="my-posts" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">My Posts</h2>
                  <Button className="bg-gradient-to-r from-orange-500 to-green-500 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    New Post
                  </Button>
                </div>

                <div className="space-y-4">
                  {userPosts.map((post) => (
                    <Card key={post.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Badge
                              variant={
                                post.category === "Academic"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {post.category}
                            </Badge>
                            <Badge
                              variant={
                                post.status === "Published"
                                  ? "default"
                                  : "secondary"
                              }
                            >
                              {post.status}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{post.title}</CardTitle>
                        <CardDescription>{post.excerpt}</CardDescription>
                      </CardHeader>

                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Eye className="w-4 h-4" />
                              <span>{post.views}</span>
                            </span>
                          </div>
                          <span className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{post.createdAt}</span>
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="my-events" className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    My Events
                  </h2>
                  <Button className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Event
                  </Button>
                </div>

                <div className="space-y-4">
                  {userEvents.map((event) => (
                    <Card key={event.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">
                            {event.title}
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge variant="default">{event.status}</Badge>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>

                      <CardContent>
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {event.date} at {event.time}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4" />
                            <span>{event.attendees} attendees</span>
                          </div>
                        </div>

                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Analytics</h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Views
                      </CardTitle>
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1,234</div>
                      <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Total Likes
                      </CardTitle>
                      <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">456</div>
                      <p className="text-xs text-muted-foreground">
                        +15.3% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Comments
                      </CardTitle>
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">89</div>
                      <p className="text-xs text-muted-foreground">
                        +8.2% from last month
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        Event Attendees
                      </CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">67</div>
                      <p className="text-xs text-muted-foreground">
                        +12.5% from last month
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Engagement Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64 flex items-center justify-center text-gray-500">
                      <TrendingUp className="w-8 h-8 mr-2" />
                      <span>Analytics chart would be displayed here</span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
