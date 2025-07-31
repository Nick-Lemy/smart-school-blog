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
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Search,
  Ticket,
  Loader2,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { Event, User } from "@/lib/types";
import api from "@/lib/utils";
import { AxiosResponse } from "axios";
import { formatDistanceToNow } from "date-fns";

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [hosts, setHosts] = useState<{ [key: number]: User }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "",
    location: "",
    coverImage: "",
    description: "",
    startDate: "",
    endDate: "",
  });

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

      setEvents((prev) => [response.data, ...prev]);
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
              <Dialog open={eventDialogOpen} onOpenChange={setEventDialogOpen}>
                <DialogTrigger asChild>
                  <span>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Event
                  </span>
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
                        setNewEvent({ ...newEvent, coverImage: e.target.value })
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
                        <SelectItem value="Competition">Competition</SelectItem>
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
                        <CardHeader className="flex-1/2 w-full">
                          <div className="flex items-start">
                            <div className="space-y-2 w-full">
                              <div className="w-full overflow-hidden flex items-center justify-center">
                                <Image
                                  src={event.coverImage}
                                  alt={event.title + " Image"}
                                  className="w-full h-full object-contain rounded-md"
                                  width={400}
                                  height={160}
                                  style={{ objectFit: "cover" }}
                                />
                              </div>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                          <CardTitle
                            className="text-lg cursor-pointer text-green-500 hover:text-green-700 transition-colors"
                            onClick={() =>
                              router.push(`/home/events/${event.id}`)
                            }
                          >
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
