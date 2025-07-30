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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Users,
  Heart,
  MessageCircle,
  Plus,
  Edit,
  Trash2,
  Clock,
  MapPin,
  LogOut,
} from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("my-posts");
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
  });

  // Enhanced dummy data
  const userPosts = [
    {
      id: 1,
      title: "My Journey Learning React in Lagos",
      excerpt:
        "Sharing my experience learning React development while studying computer science at the University of Lagos. From beginner struggles to breakthrough moments...",
      category: "Academic",
      status: "Published",
      likes: 45,
      comments: 12,
      views: 234,
      createdAt: "2 days ago",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Best Study Spots on Campus",
      excerpt:
        "A comprehensive guide to the quietest and most productive study locations around campus. Perfect for exam season preparation...",
      category: "Social",
      status: "Draft",
      likes: 0,
      comments: 0,
      views: 0,
      createdAt: "1 week ago",
      readTime: "3 min read",
    },
    {
      id: 3,
      title: "AI-Powered Study Techniques That Actually Work",
      excerpt:
        "How I used ChatGPT and other AI tools to improve my study efficiency and academic performance this semester...",
      category: "Academic",
      status: "Published",
      likes: 89,
      comments: 23,
      views: 456,
      createdAt: "1 week ago",
      readTime: "7 min read",
    },
  ];

  const userEvents = [
    {
      id: 1,
      title: "Tech Meetup: AI in Education",
      date: "March 20, 2025",
      time: "3:00 PM",
      location: "University of Lagos - Engineering Block",
      attendees: 45,
      status: "Upcoming",
      category: "Academic",
    },
    {
      id: 2,
      title: "Study Group: Data Structures & Algorithms",
      date: "March 18, 2025",
      time: "6:00 PM",
      location: "Library Room 204",
      attendees: 12,
      status: "Upcoming",
      category: "Academic",
    },
    {
      id: 3,
      title: "Campus Innovation Challenge",
      date: "March 25, 2025",
      time: "10:00 AM",
      location: "Main Auditorium",
      attendees: 120,
      status: "Upcoming",
      category: "Competition",
    },
  ];

  const handleCreatePost = () => {
    console.log("Creating post:", newPost);
    setNewPost({ title: "", content: "", category: "" });
  };

  const handleCreateEvent = () => {
    console.log("Creating event:", newEvent);
    setNewEvent({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 rounded-full w-8 h-8 flex items-center justify-center">
                <span className="text-white font-bold text-sm">SB</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>

            <Button variant="ghost" size="sm">
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Enhanced Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6 bg-white">
              <CardHeader className="text-center items-center flex flex-col pb-4">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarImage src="/placeholder.svg?height=80&width=80" />
                  <AvatarFallback className="text-lg bg-green-100 text-green-600">
                    JD
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-gray-900">John Doe</CardTitle>
                {/* <CardDescription>Computer Science Student</CardDescription> */}
                <Badge variant="secondary" className="mt-2">
                  Student
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">12</div>
                    <div className="text-xs text-gray-500">Posts Published</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">5</div>
                    <div className="text-xs text-gray-500">Events Created</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                      <Plus className="mr-2 h-4 w-4" />
                      New Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-gray-900">
                        Create New Post
                      </DialogTitle>
                      <DialogDescription>
                        Share your knowledge and experiences with the
                        SmartSchool community
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Enter an engaging post title..."
                        value={newPost.title}
                        onChange={(e) =>
                          setNewPost({ ...newPost, title: e.target.value })
                        }
                      />
                      <Select
                        onValueChange={(value) =>
                          setNewPost({ ...newPost, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="social">Social</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="career">Career</SelectItem>
                        </SelectContent>
                      </Select>
                      <Textarea
                        placeholder="Write your post content here. Share your insights, experiences, or ask questions..."
                        rows={8}
                        value={newPost.content}
                        onChange={(e) =>
                          setNewPost({ ...newPost, content: e.target.value })
                        }
                      />
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Save Draft</Button>
                        <Button
                          className="bg-green-600 text-white hover:bg-green-700"
                          onClick={handleCreatePost}
                        >
                          Publish Post
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full text-gray-900 border-gray-300"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Create Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-gray-900">
                        Create New Event
                      </DialogTitle>
                      <DialogDescription>
                        Organize study groups, meetups, or campus activities
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Input
                        placeholder="Event title (e.g., Python Study Group)"
                        value={newEvent.title}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, title: e.target.value })
                        }
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          type="date"
                          value={newEvent.date}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, date: e.target.value })
                          }
                        />
                        <Input
                          type="time"
                          value={newEvent.time}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, time: e.target.value })
                          }
                        />
                      </div>
                      <Input
                        placeholder="Location (e.g., Library Room 204)"
                        value={newEvent.location}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, location: e.target.value })
                        }
                      />
                      <Select
                        onValueChange={(value) =>
                          setNewEvent({ ...newEvent, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Event category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="academic">Academic</SelectItem>
                          <SelectItem value="social">Social</SelectItem>
                          <SelectItem value="cultural">Cultural</SelectItem>
                          <SelectItem value="sports">Sports</SelectItem>
                          <SelectItem value="competition">
                            Competition
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Textarea
                        placeholder="Describe your event, what participants can expect, requirements, etc..."
                        rows={4}
                        value={newEvent.description}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            description: e.target.value,
                          })
                        }
                      />
                      <Button
                        className="w-full bg-green-600 text-white hover:bg-green-700"
                        onClick={handleCreateEvent}
                      >
                        Create Event
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Main Content */}
          <div className="lg:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 bg-white border border-gray-200">
                <TabsTrigger
                  value="my-posts"
                  className="text-gray-700 data-[state=active]:bg-green-50 data-[state=active]:text-green-700 data-[state=active]:border-blue-200"
                >
                  My Posts ({userPosts.length})
                </TabsTrigger>
                <TabsTrigger
                  value="my-events"
                  className="text-gray-700 data-[state=active]:bg-green-50 data-[state=active]:text-green-700 data-[state=active]:border-blue-200"
                >
                  My Events ({userEvents.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="my-posts" className="space-y-6 mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">My Posts</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 text-white hover:bg-green-700">
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-gray-900">
                          Create New Post
                        </DialogTitle>
                        <DialogDescription>
                          Share your knowledge and experiences with the
                          SmartSchool community
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Enter an engaging post title..."
                          value={newPost.title}
                          onChange={(e) =>
                            setNewPost({ ...newPost, title: e.target.value })
                          }
                        />
                        <Select
                          onValueChange={(value) =>
                            setNewPost({ ...newPost, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="social">Social</SelectItem>
                            <SelectItem value="technology">
                              Technology
                            </SelectItem>
                            <SelectItem value="career">Career</SelectItem>
                          </SelectContent>
                        </Select>
                        <Textarea
                          placeholder="Write your post content here. Share your insights, experiences, or ask questions..."
                          rows={8}
                          value={newPost.content}
                          onChange={(e) =>
                            setNewPost({ ...newPost, content: e.target.value })
                          }
                        />
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Save Draft</Button>
                          <Button
                            className="bg-green-600 text-white hover:bg-green-700"
                            onClick={handleCreatePost}
                          >
                            Publish Post
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-4">
                  {userPosts.map((post) => (
                    <Card
                      key={post.id}
                      className="bg-white hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Badge
                              variant={
                                post.status === "Published"
                                  ? "default"
                                  : "secondary"
                              }
                              className={
                                post.status === "Published"
                                  ? "bg-green-100 text-green-800"
                                  : ""
                              }
                            >
                              {post.status}
                            </Badge>
                            <Badge
                              variant="outline"
                              className="text-gray-700 border-gray-300"
                            >
                              {post.category}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-700 hover:text-gray-900"
                            >
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
                        <CardTitle className="text-lg text-gray-900 hover:text-green-600 cursor-pointer">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="text-gray-600 line-clamp-2">
                          {post.excerpt}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center space-x-1 hover:text-red-500 cursor-pointer">
                              <Heart className="w-4 h-4" />
                              <span>{post.likes}</span>
                            </span>
                            <span className="flex items-center space-x-1 hover:text-green-500 cursor-pointer">
                              <MessageCircle className="w-4 h-4" />
                              <span>{post.comments}</span>
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

              <TabsContent value="my-events" className="space-y-6 mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    My Events
                  </h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-green-600 text-white hover:bg-green-700">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Event
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-gray-900">
                          Create New Event
                        </DialogTitle>
                        <DialogDescription>
                          Organize study groups, meetups, or campus activities
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <Input
                          placeholder="Event title (e.g., Python Study Group)"
                          value={newEvent.title}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, title: e.target.value })
                          }
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <Input
                            type="date"
                            value={newEvent.date}
                            onChange={(e) =>
                              setNewEvent({ ...newEvent, date: e.target.value })
                            }
                          />
                          <Input
                            type="time"
                            value={newEvent.time}
                            onChange={(e) =>
                              setNewEvent({ ...newEvent, time: e.target.value })
                            }
                          />
                        </div>
                        <Input
                          placeholder="Location (e.g., Library Room 204)"
                          value={newEvent.location}
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              location: e.target.value,
                            })
                          }
                        />
                        <Select
                          onValueChange={(value) =>
                            setNewEvent({ ...newEvent, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Event category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="academic">Academic</SelectItem>
                            <SelectItem value="social">Social</SelectItem>
                            <SelectItem value="cultural">Cultural</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="competition">
                              Competition
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <Textarea
                          placeholder="Describe your event, what participants can expect, requirements, etc..."
                          rows={4}
                          value={newEvent.description}
                          onChange={(e) =>
                            setNewEvent({
                              ...newEvent,
                              description: e.target.value,
                            })
                          }
                        />
                        <Button
                          className="w-full bg-green-600 text-white hover:bg-green-700"
                          onClick={handleCreateEvent}
                        >
                          Create Event
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="space-y-4">
                  {userEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="bg-white hover:shadow-md transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <CardTitle className="text-lg text-gray-900 hover:text-green-600 cursor-pointer">
                              {event.title}
                            </CardTitle>
                            <Badge
                              variant="outline"
                              className="text-gray-700 border-gray-300"
                            >
                              {event.category}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-700 hover:text-gray-900"
                            >
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
                        <Badge
                          variant="secondary"
                          className="self-start bg-green-100 text-green-800"
                        >
                          {event.status}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm text-gray-600 mb-4">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-green-600" />
                            <span>
                              {event.date} at {event.time}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-green-600" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-green-600" />
                            <span>{event.attendees} attendees registered</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-gray-700 border-gray-300 hover:bg-gray-50"
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            className="bg-green-600 text-white hover:bg-green-700"
                          >
                            Manage Event
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
