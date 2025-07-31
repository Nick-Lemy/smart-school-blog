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
import { Calendar, MapPin, Users, Clock, Search, Ticket } from "lucide-react";
import Image from "next/image";

export default function EventsPage() {
  // const [selectedCategory] = useState("career");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const filteredEvents = allEvents;

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
                placeholder="Search posts..."
                className="pl-10 w-full bg-gray-100 border-0"
              />
            </div>
          </div>
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="featured" className="w-full">
              <TabsContent value="featured" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {filteredEvents.map((event) => (
                    <Card
                      key={event.id}
                      className="bg-gray-800 justify-between border border-gray-600 shadow-sm"
                    >
                      <CardHeader className="flex-1/2">
                        <div className="flex items-start">
                          <div className="space-y-2">
                            <div className="md:w-1/2">
                              <Image
                                width={50}
                                height={50}
                                src={"/placeholder.svg"}
                                alt={event.title + " Image"}
                                className="w-full h-48 md:h-full object-cover rounded-md"
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
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-green-400" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-green-400" />
                            <span>{event.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-green-400" />
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
                              <AvatarFallback className="text-xs bg-gray-700 text-white">
                                {event.organizer
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-gray-400">
                              {event.organizer}
                            </span>
                          </div>
                        </div>

                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold">
                          <Ticket className="w-4 h-4 mr-2" />
                          Register Now
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
}
