"use client";

import { useState, useEffect } from "react";
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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Search,
  Ticket,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { Event, User } from "@/lib/types";
import api from "@/lib/utils";
import { AxiosResponse } from "axios";
import { formatDistanceToNow } from "date-fns";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [hosts, setHosts] = useState<{ [key: number]: User }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const response: AxiosResponse<Event[]> = await api.get("/event/");
      return response.data;
    } catch (error) {
      console.error("Error fetching events:", error);
      return [];
    }
  };

  const fetchHost = async (hostId: number): Promise<User | null> => {
    try {
      const response: AxiosResponse<User> = await api.get(`/users/${hostId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching host ${hostId}:`, error);
      return null;
    }
  };

  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (hosts[event.hostId]?.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  // Fetch events and their hosts on mount
  useEffect(() => {
    const loadEventsAndHosts = async () => {
      setIsLoading(true);
      const eventsData = await fetchEvents();
      setEvents(eventsData);

      // Fetch all unique hosts
      const uniqueHostIds = [
        ...new Set(eventsData.map((event) => event.hostId)),
      ];
      const hostPromises = uniqueHostIds.map((hostId) => fetchHost(hostId));
      const hostResults = await Promise.all(hostPromises);

      // Create hosts map
      const hostsMap: { [key: number]: User } = {};
      uniqueHostIds.forEach((hostId, index) => {
        if (hostResults[index]) {
          hostsMap[hostId] = hostResults[index]!;
        }
      });

      setHosts(hostsMap);
      setIsLoading(false);
    };
    loadEventsAndHosts();
  }, []);

  return (
    <main className="min-h-screen ">
      {/* Header */}
      <header className="bg-gray-800 white sticky -top-0.25 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-green-600">Events</h1>
            </div>
            <Button className="bg-green-600 text-black font-semibold">
              Create Event
            </Button>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-1 gap-8">
          <div className="flex items-center px-2 space-x-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events..."
                className="pl-10 w-full bg-gray-100 border-0"
              />
            </div>
          </div>
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="featured" className="w-full">
              <TabsContent value="featured" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredEvents.length > 0 ? (
                    filteredEvents.map((event) => (
                      <Card
                        key={event.id}
                        className="bg-gray-800 justify-between border border-gray-600 shadow-sm"
                      >
                        <CardHeader className="flex-1/2">
                          <div className="flex items-start">
                            <div className="space-y-2">
                              <div className="w-full h-32 md:h-40 overflow-hidden flex items-center justify-center">
                                <Image
                                  src={event.coverImage}
                                  alt={event.title + " Image"}
                                  className="w-full h-full object-cover rounded-md"
                                  width={400}
                                  height={160}
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <CardTitle className="text-lg cursor-pointer text-green-500 hover:text-green-700 transition-colors">
                            {event.title}
                          </CardTitle>
                          <CardDescription className="line-clamp-2 text-white">
                            {event.description}
                          </CardDescription>
                          <div className="space-y-2 text-sm text-gray-200">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-green-400" />
                              <span>
                                {new Date(event.startDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-green-400" />
                              <span>
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

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Avatar className="w-6 h-6">
                                <AvatarImage src="/placeholder.svg" />
                                <AvatarFallback className="text-xs bg-gray-700 text-white">
                                  {hosts[event.hostId]?.name
                                    ? hosts[event.hostId].name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                    : "?"}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm text-gray-400">
                                {hosts[event.hostId]?.name || "Loading..."}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {formatDistanceToNow(new Date(event.createdAt), {
                                addSuffix: true,
                              })}
                            </span>
                          </div>

                          <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
                            <Ticket className="w-4 h-4 mr-2" />
                            Register Now
                          </Button>
                        </CardContent>
                      </Card>
                    ))
                  ) : isLoading ? (
                    <div className="col-span-2 flex items-center justify-center py-8">
                      <p className="text-white font-medium">
                        <Loader2 className="animate-spin mr-2 inline-block w-4 h-4" />
                        <span>Loading Events...</span>
                      </p>
                    </div>
                  ) : (
                    <div className="col-span-2 flex items-center justify-center py-8">
                      <p className="text-white font-medium">No events found.</p>
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
