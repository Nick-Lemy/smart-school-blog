"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
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
  ArrowLeft,
  Loader2,
  Mail,
  User,
} from "lucide-react";

import api from "@/lib/utils";
import { Post, Event, User as UserType } from "@/lib/types";
import { AxiosResponse } from "axios";
import { formatDistanceToNow } from "date-fns";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.userId as string;

  const [user, setUser] = useState<UserType | null>(null);
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [userEvents, setUserEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return;

      setIsLoading(true);
      try {
        // Fetch user info
        const userResponse: AxiosResponse<UserType> = await api.get(
          `/users/${userId}`
        );
        setUser(userResponse.data);

        // Fetch user's posts
        const postsResponse: AxiosResponse<Post[]> = await api.get(
          `/posts/user/${userId}`
        );
        setUserPosts(postsResponse.data);

        // Fetch user's events
        const eventsResponse: AxiosResponse<Event[]> = await api.get(
          `/event/user/${userId}`
        );
        setUserEvents(eventsResponse.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-700">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="animate-spin mx-auto mb-4 w-8 h-8 text-green-500" />
            <p className="text-white">Loading profile...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-700">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-white">User not found</p>
            <Button
              onClick={() => router.back()}
              className="mt-4 bg-green-600 text-black font-semibold"
            >
              Go Back
            </Button>
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="text-white hover:text-green-500"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back
              </Button>
              <h1 className="text-xl font-bold text-green-600">Profile</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="bg-gray-800 border-gray-600 text-white mb-8">
          <CardHeader>
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-xl bg-gray-700 text-white">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                <div className="flex items-center space-x-4 text-gray-400 mt-2">
                  <div className="flex items-center space-x-1">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span className="text-sm">
                      Joined{" "}
                      {formatDistanceToNow(new Date(user.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-green-500">
                  {userPosts.length}
                </div>
                <div className="text-sm text-gray-400">Posts Published</div>
              </div>
              <div className="text-center p-4 bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-green-500">
                  {userEvents.length}
                </div>
                <div className="text-sm text-gray-400">Events Created</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 bg-gray-700 border border-gray-600">
            <TabsTrigger
              value="posts"
              className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-black font-semibold"
            >
              Posts ({userPosts.length})
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="text-white data-[state=active]:bg-green-600 data-[state=active]:text-black font-semibold"
            >
              Events ({userEvents.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6 mt-6">
            <div className="space-y-4">
              {userPosts.length > 0 ? (
                userPosts.map((post) => (
                  <Card
                    key={post.id}
                    className="bg-gray-800 border-gray-600 text-white hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
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
                  <p className="text-gray-400">No posts published yet.</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="events" className="space-y-6 mt-6">
            <div className="space-y-4">
              {userEvents.length > 0 ? (
                userEvents.map((event) => (
                  <Card
                    key={event.id}
                    className="bg-gray-800 border-gray-600 text-white hover:shadow-md transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle
                        className="text-lg text-green-500 hover:text-green-400 cursor-pointer"
                        onClick={() => router.push(`/home/events/${event.id}`)}
                      >
                        {event.title}
                      </CardTitle>
                      <CardDescription className="text-gray-400 line-clamp-2">
                        {event.description}
                      </CardDescription>
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
                          <span>
                            {event.attendees.length} attendees registered
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <span className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>
                            Created{" "}
                            {formatDistanceToNow(new Date(event.createdAt), {
                              addSuffix: true,
                            })}
                          </span>
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            router.push(`/home/events/${event.id}`)
                          }
                          className="text-black"
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-400">No events created yet.</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
