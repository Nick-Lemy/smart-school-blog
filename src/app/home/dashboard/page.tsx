"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Trash2,
  Clock,
  MapPin,
  LogOut,
  Loader2,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/utils";
import { Post, Event } from "@/lib/types";
import { AxiosResponse } from "axios";
import { formatDistanceToNow } from "date-fns";

export default function DashboardPage() {
  const router = useRouter();
  const { currentUser, logout } = useAuth();
  const [activeTab, setActiveTab] = useState("my-posts");
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);

  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });
  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "",
    location: "",
    coverImage: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  // Load user data on mount
  useEffect(() => {
    // Fetch user's posts
    const fetchUserPosts = async () => {
      if (!currentUser) return;
      try {
        const response: AxiosResponse<Post[]> = await api.get(
          `/posts/user/${currentUser.id}`
        );
        setUserPosts(response.data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    // Fetch user's events
    const fetchUserEvents = async () => {
      if (!currentUser) return;
      try {
        const response: AxiosResponse<Event[]> = await api.get(
          `/event/user/${currentUser.id}`
        );
        setUserEvents(response.data);
      } catch (error) {
        console.error("Error fetching user events:", error);
      }
    };

    const loadUserData = async () => {
      if (currentUser) {
        setIsLoading(true);
        await Promise.all([fetchUserPosts(), fetchUserEvents()]);
        setIsLoading(false);
      }
    };
    loadUserData();
  }, [currentUser]);

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content) return;

    setIsCreatingPost(true);
    try {
      const response: AxiosResponse<Post> = await api.post("/posts", {
        title: newPost.title,
        content: newPost.content,
      });

      setUserPosts((prev) => [response.data, ...prev]);
      setNewPost({ title: "", content: "" });
      setPostDialogOpen(false);
    } catch (error) {
      console.error("Error creating post:", error);
    } finally {
      setIsCreatingPost(false);
    }
  };

  const handleCreateEvent = async () => {
    if (
      !newEvent.title ||
      !newEvent.description ||
      !newEvent.startDate ||
      !newEvent.endDate
    )
      return;

    setIsCreatingEvent(true);
    try {
      // Convert datetime-local format to ISO-8601 format
      const startDateISO = new Date(newEvent.startDate).toISOString();
      const endDateISO = new Date(newEvent.endDate).toISOString();

      const response: AxiosResponse<Event> = await api.post("/event", {
        title: newEvent.title,
        category: newEvent.category,
        location: newEvent.location,
        coverImage: newEvent.coverImage,
        description: newEvent.description,
        startDate: startDateISO,
        endDate: endDateISO,
      });

      setUserEvents((prev) => [response.data, ...prev]);
      setNewEvent({
        title: "",
        category: "",
        location: "",
        coverImage: "",
        description: "",
        startDate: "",
        endDate: "",
      });
      setEventDialogOpen(false);
    } catch (error) {
      console.error("Error creating event:", error);
    } finally {
      setIsCreatingEvent(false);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await api.delete(`/posts/${postId}`);
      setUserPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    try {
      await api.delete(`/event/${eventId}`);
      setUserEvents((prev) => prev.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-700">
      {/* Header with dark theme */}
      <header className="bg-gray-800 sticky -top-0.25 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-green-600">Dashboard</h1>
            </div>
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="text-white hover:text-green-500"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between">
          <h1 className="text-xl font-medium text-white">
            Hello,{" "}
            <span className="text-green-600 font-bold">
              {currentUser?.name}!
            </span>
          </h1>
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=80&width=80" />
            <AvatarFallback className="text-sm bg-gray-800 text-white">
              JD
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="grid gap-8">
          <div className="grid grid-cols-2 gap-4 pt-5 text-center">
            <Card className="bg-gray-800 border-gray-600 text-white">
              <div className="text-2xl font-bold text-white">
                {userPosts.length}
              </div>
              <div className="text-xs text-gray-400">Posts Published</div>
            </Card>
            <Card className="bg-gray-800 border-gray-600 text-white">
              <div className="text-2xl font-bold text-white">
                {userEvents.length}
              </div>
              <div className="text-xs text-gray-400">Events Created</div>
            </Card>
          </div>
          {/* Sidebar */}
          <div className="">
            <Card className="bg-gray-800 border-gray-600 text-white">
              <CardHeader>
                <CardTitle className="text-lg text-white">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog open={postDialogOpen} onOpenChange={setPostDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-green-600 text-black font-semibold hover:bg-green-700">
                      <Plus className="mr-2 h-4 w-4" />
                      New Post
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-gray-800 text-white border-gray-600">
                    <DialogHeader>
                      <DialogTitle className="text-white">
                        Create New Post
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
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

                <Dialog
                  open={eventDialogOpen}
                  onOpenChange={setEventDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full text-black border-gray-600 hover:bg-gray-700"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Create Event
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-gray-800 text-white border-gray-600">
                    <DialogHeader>
                      <DialogTitle className="text-white">
                        Create New Event
                      </DialogTitle>
                      <DialogDescription className="text-gray-400">
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
                        className="bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-green-500 focus:border-green-500"
                      />
                      <Input
                        placeholder="Cover Image URL (optional)"
                        value={newEvent.coverImage}
                        onChange={(e) =>
                          setNewEvent({
                            ...newEvent,
                            coverImage: e.target.value,
                          })
                        }
                        className="bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-green-500 focus:border-green-500"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Start Date & Time
                          </label>
                          <Input
                            type="datetime-local"
                            value={newEvent.startDate}
                            onChange={(e) =>
                              setNewEvent({
                                ...newEvent,
                                startDate: e.target.value,
                              })
                            }
                            className="bg-gray-700 text-white border-gray-600 focus:ring-green-500 focus:border-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            End Date & Time
                          </label>
                          <Input
                            type="datetime-local"
                            value={newEvent.endDate}
                            onChange={(e) =>
                              setNewEvent({
                                ...newEvent,
                                endDate: e.target.value,
                              })
                            }
                            className="bg-gray-700 text-white border-gray-600 focus:ring-green-500 focus:border-green-500"
                          />
                        </div>
                      </div>
                      <Input
                        placeholder="Location (e.g., Library Room 204)"
                        value={newEvent.location}
                        onChange={(e) =>
                          setNewEvent({ ...newEvent, location: e.target.value })
                        }
                        className="bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-green-500 focus:border-green-500"
                      />
                      <Select
                        onValueChange={(value) =>
                          setNewEvent({ ...newEvent, category: value })
                        }
                      >
                        <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                          <SelectValue placeholder="Event category" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-700 text-white border-gray-600">
                          <SelectItem value="Academic">Academic</SelectItem>
                          <SelectItem value="Social">Social</SelectItem>
                          <SelectItem value="Cultural">Cultural</SelectItem>
                          <SelectItem value="Sports">Sports</SelectItem>
                          <SelectItem value="Competition">
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
                        className="bg-gray-700 text-white border-gray-600 placeholder-gray-400 focus:ring-green-500 focus:border-green-500"
                      />
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="outline"
                          className="text-white border-gray-600 hover:bg-gray-700"
                          onClick={() => setEventDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          className="bg-green-600 text-black font-semibold hover:bg-green-700"
                          onClick={handleCreateEvent}
                          disabled={
                            isCreatingEvent ||
                            !newEvent.title ||
                            !newEvent.description ||
                            !newEvent.startDate ||
                            !newEvent.endDate
                          }
                        >
                          {isCreatingEvent ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Creating...
                            </>
                          ) : (
                            "Create Event"
                          )}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-2 bg-gray-700 border border-gray-600">
                <TabsTrigger
                  value="my-posts"
                  className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-black font-semibold"
                >
                  My Posts ({userPosts.length})
                </TabsTrigger>
                <TabsTrigger
                  value="my-events"
                  className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-black font-semibold"
                >
                  My Events ({userEvents.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="my-posts" className="space-y-6 mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">My Posts</h2>
                </div>

                <div className="space-y-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="animate-spin mr-2 w-4 h-4" />
                      <span className="text-white">Loading posts...</span>
                    </div>
                  ) : userPosts.length > 0 ? (
                    userPosts.map((post) => (
                      <Card
                        key={post.id}
                        className="bg-gray-800  text-white hover:shadow-md transition-shadow"
                      >
                        <CardHeader>
                          <div className="flex relative items-center justify-between">
                            <div className="flex absolute  rounded-full w-fit -top-2 -right-3 py-0.5 bg-red-500/20 ">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500  px-4 hover:text-red-700"
                                onClick={() => handleDeletePost(post.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <CardTitle
                            className="text-lg text-green-500 hover:text-green-400 cursor-pointer"
                            onClick={() => router.push(`/home/blog/${post.id}`)}
                          >
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-gray-400 line-clamp-2">
                            {post.content.slice(0, 150)}...
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center justify-between text-sm text-gray-400">
                            <div className="flex items-center space-x-4">
                              <span className="flex items-center space-x-1 hover:text-red-500 cursor-pointer">
                                <Heart className="w-4 h-4" />
                                <span>{post.likes.length}</span>
                              </span>
                              <span className="flex items-center space-x-1 hover:text-green-500 cursor-pointer">
                                <MessageCircle className="w-4 h-4" />
                                <span>{post.comments.length}</span>
                              </span>
                            </div>
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                {formatDistanceToNow(new Date(post.createdAt), {
                                  addSuffix: true,
                                })}
                              </span>
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">
                        No posts yet. Create your first post!
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="my-events" className="space-y-6 mt-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">My Events</h2>
                </div>

                <div className="space-y-4">
                  {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="animate-spin mr-2 w-4 h-4" />
                      <span className="text-white">Loading events...</span>
                    </div>
                  ) : userEvents.length > 0 ? (
                    userEvents.map((event) => (
                      <Card
                        key={event.id}
                        className="bg-gray-800 border-gray-600 text-white hover:shadow-md transition-shadow"
                      >
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <CardTitle
                                className="text-lg text-green-500 hover:text-green-400 cursor-pointer"
                                onClick={() =>
                                  router.push(`/home/events/${event.id}`)
                                }
                              >
                                {event.title}
                              </CardTitle>
                            </div>
                            <div className="flex relative items-center justify-between">
                              <div className="flex absolute  rounded-full w-fit  -right-3 py-0.5 bg-red-500/20 ">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500  px-4 hover:text-red-700"
                                  onClick={() => handleDeleteEvent(event.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm text-gray-400 mb-4">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-green-400" />
                              <span>
                                {new Date(event.startDate).toLocaleDateString()}{" "}
                                - {new Date(event.endDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-green-400" />
                              <span>{event.location}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-green-400" />
                              <span>
                                {event.attendees.length} attendees registered
                              </span>
                            </div>
                          </div>
                          <div className="flex w-full items-center space-x-2">
                            <Button
                              variant="outline"
                              className="text-black w-full"
                            >
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-400">
                        No events yet. Create your first event!
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
