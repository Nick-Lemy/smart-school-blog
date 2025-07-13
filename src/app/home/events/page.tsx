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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  Search,
  Plus,
  Ticket,
} from "lucide-react";
import Image from "next/image";

export default function EventsPage() {
  const [selectedCategory] = useState("career");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredEvents = [
    {
      id: 1,
      title: "African Leadership Summit 2025",
      description:
        "Join leaders from across Africa to discuss the future of education, technology, and sustainable development.",
      date: "March 15, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Kigali Convention Centre, Rwanda",
      organizer: "African Leadership University",
      organizerAvatar: "/placeholder.svg?height=40&width=40",
      attendees: 1250,
      maxAttendees: 1500,
      category: "academic",
      price: "Free",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Leadership", "Networking", "Innovation"],
      featured: true,
    },
    {
      id: 2,
      title: "Inter-University Debate Championship",
      description:
        "The biggest debate competition bringing together the brightest minds from universities across Africa.",
      date: "March 22, 2025",
      time: "2:00 PM - 8:00 PM",
      location: "University of Cape Town, South Africa",
      organizer: "Pan-African Debate Society",
      organizerAvatar: "/placeholder.svg?height=40&width=40",
      attendees: 180,
      maxAttendees: 300,
      category: "academic",
      price: "Free",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Debate", "Competition", "Public Speaking"],
      featured: true,
    },
    {
      id: 3,
      title: "Cultural Night: Celebrating African Heritage",
      description:
        "An evening of music, dance, food, and storytelling celebrating the rich cultural diversity of Africa.",
      date: "March 28, 2025",
      time: "6:00 PM - 11:00 PM",
      location: "Makerere University, Uganda",
      organizer: "Cultural Affairs Committee",
      organizerAvatar: "/placeholder.svg?height=40&width=40",
      attendees: 320,
      maxAttendees: 500,
      category: "cultural",
      price: "Free",
      image: "/placeholder.svg?height=200&width=400",
      tags: ["Culture", "Music", "Dance", "Food"],
      featured: true,
    },
  ];

  const upcomingEvents = [
    {
      id: 4,
      title: "Tech Innovation Workshop",
      description:
        "Learn about the latest technologies shaping Africa's digital future.",
      date: "April 5, 2025",
      time: "10:00 AM - 4:00 PM",
      location: "University of Lagos, Nigeria",
      organizer: "Tech Society",
      organizerAvatar: "/placeholder.svg?height=40&width=40",
      attendees: 85,
      maxAttendees: 100,
      category: "academic",
      price: "Free",
      tags: ["Technology", "Innovation", "Workshop"],
    },
    {
      id: 5,
      title: "Football Tournament Finals",
      description: "The ultimate showdown between the top university teams.",
      date: "April 12, 2025",
      time: "3:00 PM - 6:00 PM",
      location: "National Stadium, Ghana",
      organizer: "University Sports League",
      organizerAvatar: "/placeholder.svg?height=40&width=40",
      attendees: 2500,
      maxAttendees: 5000,
      category: "sports",
      price: "$5",
      tags: ["Football", "Sports", "Competition"],
    },
    {
      id: 6,
      title: "Career Fair 2025",
      description:
        "Connect with top employers and explore career opportunities across Africa.",
      date: "April 18, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "Cairo University, Egypt",
      organizer: "Career Services",
      organizerAvatar: "/placeholder.svg?height=40&width=40",
      attendees: 450,
      maxAttendees: 800,
      category: "career",
      price: "Free",
      tags: ["Career", "Jobs", "Networking"],
    },
  ];

  const allEvents = [...featuredEvents, ...upcomingEvents];

  const filteredEvents = allEvents.filter((event) => {
    const matchesCategory =
      selectedCategory === "all" || event.category === selectedCategory;
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Campus Events</h1>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
              <div className="relative w-full max-w-md">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-white/70" />
                <Input
                  placeholder="Search events..."
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-white/70"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="bg-white text-black hover:bg-gray-100">
                <Plus />
                Create Event
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-1 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="featured" className="w-full">
              <TabsContent value="featured" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="hover:shadow-lg transition-shadow"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="space-y-2">
                            <div className="md:w-1/2">
                              <Image
                                width={50}
                                height={50}
                                src={"/placeholder.svg"}
                                alt={event.title + " Image"}
                                className="w-full h-48 md:h-full object-cover"
                              />
                            </div>
                            <CardTitle className="text-lg  cursor-pointer">
                              {event.title}
                            </CardTitle>
                          </div>
                        </div>
                        <CardDescription className="line-clamp-2">
                          {event.description}
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4" />
                            <span>{event.time}</span>
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

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarImage
                                src={
                                  event.organizerAvatar || "/placeholder.svg"
                                }
                              />
                              <AvatarFallback className="text-xs">
                                {event.organizer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-600">
                              {event.organizer}
                            </span>
                          </div>
                        </div>

                        <Button className="w-full">
                          <Ticket className="w-4 h-4 mr-2" />
                          Register Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* <TabsContent value="my-events" className="space-y-6">
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Events Yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You haven&apos;t registered for any events or created any
                    events yet.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-gradient-to-r from-orange-500 to-green-500 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Event
                    </Button>
                    <Button variant="outline">
                      <Search className="w-4 h-4 mr-2" />
                      Browse Events
                    </Button>
                  </div>
                </div>
              </TabsContent> */}
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
