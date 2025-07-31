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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  Users,
  Heart,
  MessageCircle,
  Clock,
  MapPin,
  Trash2,
  Loader2,
  Shield,
  CheckCircle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import AdminProtectedRoute from "@/components/AdminProtectedRoute";
import api from "@/lib/utils";
import { Post, Event, User } from "@/lib/types";
import { AxiosResponse } from "axios";
import { formatDistanceToNow } from "date-fns";

function AdminDashboardContent() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");
  const [deletingItem, setDeletingItem] = useState<number | null>(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      setIsLoading(true);
      try {
        // Fetch all posts
        const postsResponse: AxiosResponse<Post[]> = await api.get("/posts");
        setPosts(postsResponse.data);

        // Fetch all events
        const eventsResponse: AxiosResponse<Event[]> = await api.get("/event/");
        setEvents(eventsResponse.data);

        // Fetch all users
        const usersResponse: AxiosResponse<User[]> = await api.get("/users");
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleDeletePost = async (postId: number) => {
    setDeletingItem(postId);
    try {
      await api.delete(`/posts/${postId}`);
      setPosts((prev) => prev.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setDeletingItem(null);
    }
  };

  const handleDeleteEvent = async (eventId: number) => {
    setDeletingItem(eventId);
    try {
      await api.delete(`/event/${eventId}`);
      setEvents((prev) => prev.filter((event) => event.id !== eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    } finally {
      setDeletingItem(null);
    }
  };

  const handleDeleteUser = async (userId: number) => {
    setDeletingItem(userId);
    try {
      await api.delete(`/users/${userId}`);
      setUsers((prev) => prev.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      setDeletingItem(null);
    }
  };

  // Show loading if user verification is being checked
  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-700">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="animate-spin mx-auto mb-4 w-8 h-8 text-green-500" />
            <p className="text-white">Loading admin data...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-700">
      {/* Header */}
      <header className="bg-gray-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-4">
              <Shield className="w-6 h-6 text-green-500" />
              <h1 className="text-xl font-bold text-green-600">
                Admin Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <span className="text-sm text-white">Verified Admin</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {posts.length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {events.length}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">
                Total Users
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {users.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Content Management Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 bg-gray-700 border border-gray-600">
            <TabsTrigger
              value="posts"
              className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-black font-semibold"
            >
              Posts ({posts.length})
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-black font-semibold"
            >
              Events ({events.length})
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-black font-semibold"
            >
              Users ({users.length})
            </TabsTrigger>
          </TabsList>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Manage Posts</h2>
            </div>
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="animate-spin mr-2 w-4 h-4" />
                  <span className="text-white">Loading posts...</span>
                </div>
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <Card
                    key={post.id}
                    className="bg-gray-800 border-gray-600 text-white"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <CardTitle
                            className="text-lg text-green-500 hover:text-green-400 cursor-pointer"
                            onClick={() => router.push(`/home/blog/${post.id}`)}
                          >
                            {post.title}
                          </CardTitle>
                          <CardDescription className="text-gray-400 line-clamp-2 mt-2">
                            {post.content.slice(0, 150)}...
                          </CardDescription>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-500/10"
                              disabled={deletingItem === post.id}
                            >
                              {deletingItem === post.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-gray-800 border-gray-600">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">
                                Delete Post
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-400">
                                Are you sure you want to delete &quot;
                                {post.title}&quot;? This action cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="text-white border-gray-600 hover:bg-gray-700">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 text-white hover:bg-red-700"
                                onClick={() => handleDeletePost(post.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center space-x-4">
                          <span>Author: {post.author.name}</span>
                          <span className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{post.likes.length}</span>
                          </span>
                          <span className="flex items-center space-x-1">
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
                  <p className="text-gray-400">No posts found.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Manage Events</h2>
            </div>
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="animate-spin mr-2 w-4 h-4" />
                  <span className="text-white">Loading events...</span>
                </div>
              ) : events.length > 0 ? (
                events.map((event) => (
                  <Card
                    key={event.id}
                    className="bg-gray-800 border-gray-600 text-white"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <CardTitle
                            className="text-lg text-green-500 hover:text-green-400 cursor-pointer"
                            onClick={() =>
                              router.push(`/home/events/${event.id}`)
                            }
                          >
                            {event.title}
                          </CardTitle>
                          <CardDescription className="text-gray-400 line-clamp-2 mt-2">
                            {event.description}
                          </CardDescription>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-500/10"
                              disabled={deletingItem === event.id}
                            >
                              {deletingItem === event.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-gray-800 border-gray-600">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">
                                Delete Event
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-400">
                                Are you sure you want to delete &quot;
                                {event.title}&quot;? This action cannot be
                                undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="text-white border-gray-600 hover:bg-gray-700">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 text-white hover:bg-red-700"
                                onClick={() => handleDeleteEvent(event.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm text-gray-400 mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-green-400" />
                          <span>
                            {new Date(event.startDate).toLocaleDateString()} -{" "}
                            {new Date(event.endDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-green-400" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4 text-green-400" />
                          <span>{event.attendees.length} attendees</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>Host ID: {event.hostId}</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            {formatDistanceToNow(new Date(event.createdAt), {
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
                  <p className="text-gray-400">No events found.</p>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6 mt-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Manage Users</h2>
            </div>
            <div className="space-y-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="animate-spin mr-2 w-4 h-4" />
                  <span className="text-white">Loading users...</span>
                </div>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <Card
                    key={user.id}
                    className="bg-gray-800 border-gray-600 text-white"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback className="bg-gray-700 text-white">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-white text-lg">
                              {user.name}
                            </p>
                            <p className="text-sm text-gray-400">
                              {user.email}
                            </p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-xs text-gray-500">
                                Role: {user.role}
                              </span>
                              <span className="text-xs text-gray-500">
                                Language: {user.languagePreference}
                              </span>
                              {user.isVerified && (
                                <span className="text-xs text-green-500 font-medium">
                                  ✓ Verified
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-500/10"
                              disabled={deletingItem === user.id}
                            >
                              {deletingItem === user.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <Trash2 className="w-4 h-4" />
                              )}
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-gray-800 border-gray-600">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-white">
                                Delete User
                              </AlertDialogTitle>
                              <AlertDialogDescription className="text-gray-400">
                                Are you sure you want to delete &quot;
                                {user.name}&quot;? This action cannot be undone
                                and will remove all their posts and comments.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="text-white border-gray-600 hover:bg-gray-700">
                                Cancel
                              </AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 text-white hover:bg-red-700"
                                onClick={() => handleDeleteUser(user.id)}
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>User ID: {user.id}</span>
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            Joined{" "}
                            {formatDistanceToNow(new Date(user.createdAt), {
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
                  <p className="text-gray-400">No users found.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}

export default function AdminDashboard() {
  return (
    <AdminProtectedRoute>
      <AdminDashboardContent />
    </AdminProtectedRoute>
  );
}
