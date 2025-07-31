"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Loader2,
  User,
  Tag,
  UserPlus,
  Share,
} from "lucide-react";
import { Event, User as UserType } from "@/lib/types";
import api from "@/lib/utils";
import { AxiosResponse } from "axios";
import { formatDistanceToNow, format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import UserListModal from "@/components/UserListModal";

export default function UniqueEventPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;
  const { currentUser } = useAuth();

  const [event, setEvent] = useState<Event | null>(null);
  const [host, setHost] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        const response: AxiosResponse<Event> = await api.get(
          `/event/${eventId}`
        );
        setEvent(response.data);

        // Check if current user is registered
        if (currentUser && response.data.attendees.includes(currentUser.id)) {
          setIsRegistered(true);
        }

        // Fetch host information
        if (response.data.hostId) {
          const hostResponse: AxiosResponse<UserType> = await api.get(
            `/users/${response.data.hostId}`
          );
          setHost(hostResponse.data);
        }
      } catch (error) {
        console.error("Error fetching event:", error);
        setError("Failed to load event");
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId, currentUser]);

  const handleRegisterForEvent = async () => {
    if (!event || !currentUser) return;

    setIsRegistering(true);
    try {
      await api.post(`/event/register/${eventId}`);

      // Update local state
      setEvent((prev) =>
        prev
          ? {
              ...prev,
              attendees: [...prev.attendees, currentUser.id],
            }
          : null
      );

      setIsRegistered(true);
    } catch (error) {
      console.error("Error registering for event:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-700 flex items-center justify-center">
        <div className="flex items-center space-x-2 text-white">
          <Loader2 className="animate-spin w-6 h-6" />
          <span>Loading event...</span>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="min-h-screen bg-gray-700 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="text-gray-400 mb-6">
            {error || "The event you're looking for doesn't exist."}
          </p>
          <Button
            onClick={() => router.push("/home/events")}
            className="bg-green-600 text-black font-semibold hover:bg-green-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Events
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-700">
      {/* Header */}
      <header className="bg-gray-800 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center py-4">
            <Button
              variant="ghost"
              onClick={() => router.push("/home/events")}
              className="text-white hover:text-green-500 mr-4"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-green-600">Event Details</h1>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Event Content */}
        <div className="bg-gray-800 rounded-lg overflow-hidden mb-8">
          {/* Event Cover Image */}
          {event.coverImage && (
            <div className="w-full h-64 bg-gray-700 overflow-hidden">
              <Image
                src={event.coverImage}
                alt={event.title}
                width={800}
                height={256}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-green-500 mb-4">
                  {event.title}
                </h1>

                {/* Category Badge */}
                {event.category && (
                  <div className="flex items-center space-x-2 mb-4">
                    <Tag className="w-4 h-4 text-green-400" />
                    <span className="px-3 py-1 bg-green-600/20 text-green-400 rounded-full text-sm font-medium">
                      {event.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Attendees Count */}
              <UserListModal
                count={event.attendees.length}
                type="attendees"
                eventId={event.id.toString()}
              >
                <div className="text-right cursor-pointer hover:bg-gray-700/50 p-3 rounded-lg transition-colors">
                  <div className="flex items-center justify-end space-x-2 text-gray-400">
                    <Users className="w-5 h-5" />
                    <span className="text-lg font-semibold text-white hover:text-green-400 transition-colors">
                      {event.attendees.length}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">Attendees</p>
                </div>
              </UserListModal>
            </div>

            {/* Host Info */}
            {host && (
              <div className="flex items-center space-x-3 mb-6 p-4 bg-gray-700 rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback className="bg-gray-600 text-white">
                    {host.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white text-lg">
                    Hosted by {host.name}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <span className="flex items-center">
                      <User className="w-4 h-4 mr-1" />
                      {host.role}
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Created{" "}
                      {formatDistanceToNow(new Date(event.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Event Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Date & Time */}
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white mb-1">Start Date</p>
                    <p className="text-gray-300">
                      {format(
                        new Date(event.startDate),
                        "MMMM d, yyyy 'at' h:mm a"
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-white mb-1">End Date</p>
                    <p className="text-gray-300">
                      {format(
                        new Date(event.endDate),
                        "MMMM d, yyyy 'at' h:mm a"
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium text-white mb-1">Location</p>
                  <p className="text-gray-300">
                    {event.location || "Location TBD"}
                  </p>
                </div>
              </div>
            </div>

            {/* Event Description */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">
                About This Event
              </h3>
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
                {event.description}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-600">
              {currentUser ? (
                <Button
                  onClick={handleRegisterForEvent}
                  disabled={isRegistering || isRegistered}
                  className={`${
                    isRegistered
                      ? "bg-gray-600 text-white"
                      : "bg-green-600 text-black hover:bg-green-700"
                  } font-semibold flex-1`}
                >
                  {isRegistering ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Registering...
                    </>
                  ) : isRegistered ? (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Registered
                    </>
                  ) : (
                    <>
                      <Users className="mr-2 h-4 w-4" />
                      Join Event
                    </>
                  )}
                </Button>
              ) : (
                <Button
                  onClick={() => router.push("/auth/login")}
                  className="bg-green-600 text-black font-semibold hover:bg-green-700 flex-1"
                >
                  <Users className="mr-2 h-4 w-4" />
                  Login to Join
                </Button>
              )}
              <Button
                variant="outline"
                className="text-white border-gray-600 hover:bg-gray-700 flex-1"
              >
                <Share className="mr-2 h-4 w-4" />
                Share Event
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
