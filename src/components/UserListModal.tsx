"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Heart, Users } from "lucide-react";
import api from "@/lib/utils";
import { AxiosResponse } from "axios";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserListModalProps {
  type: "likes" | "attendees";
  postId?: string;
  eventId?: string;
  count: number;
  children: React.ReactNode;
}

export default function UserListModal({
  type,
  postId,
  eventId,
  count,
  children,
}: UserListModalProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!isOpen) return;

      setIsLoading(true);
      setError(null);

      try {
        let endpoint = "";
        if (type === "likes" && postId) {
          endpoint = `/posts/${postId}/likes`;
        } else if (type === "attendees" && eventId) {
          endpoint = `/event/${eventId}/attendees`;
        } else {
          throw new Error("Invalid configuration");
        }

        const response: AxiosResponse<User[]> = await api.get(endpoint);
        setUsers(response.data);
      } catch (error) {
        console.error(`Error fetching ${type}:`, error);
        setError(`Failed to load ${type}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, [isOpen, type, postId, eventId]);

  const refetchUsers = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let endpoint = "";
      if (type === "likes" && postId) {
        endpoint = `/posts/${postId}/likes`;
      } else if (type === "attendees" && eventId) {
        endpoint = `/event/${eventId}/attendees`;
      } else {
        throw new Error("Invalid configuration");
      }

      const response: AxiosResponse<User[]> = await api.get(endpoint);
      setUsers(response.data);
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);
      setError(`Failed to load ${type}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getTitle = () => {
    if (type === "likes") {
      return `People who liked this post (${count})`;
    }
    return `Event attendees (${count})`;
  };

  const getIcon = () => {
    if (type === "likes") {
      return <Heart className="w-5 h-5 text-red-500" />;
    }
    return <Users className="w-5 h-5 text-green-500" />;
  };

  const getEmptyMessage = () => {
    if (type === "likes") {
      return "No likes yet";
    }
    return "No attendees yet";
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md bg-gray-800 text-white border-gray-600 mx-4 sm:mx-0">
        <DialogHeader className="px-2 sm:px-0">
          <DialogTitle className="flex items-center space-x-2 text-white">
            {getIcon()}
            <span>{getTitle()}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="max-h-96 overflow-y-auto px-2 sm:px-0">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="animate-spin w-6 h-6 mr-2" />
              <span className="text-gray-400">Loading {type}...</span>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-400">{error}</p>
              <Button
                onClick={refetchUsers}
                variant="outline"
                size="sm"
                className="mt-2 text-white border-gray-600 hover:bg-gray-700"
              >
                Try again
              </Button>
            </div>
          ) : users.length > 0 ? (
            <div className="space-y-3">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback className="bg-gray-600 text-white text-xs sm:text-sm">
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-white text-sm sm:text-base truncate">
                      {user.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-400 truncate">
                      {user.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">{getEmptyMessage()}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
