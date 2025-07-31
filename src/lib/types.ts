export interface User {
  id: 1;
  name: string;
  email: string;
  role: "Admin" | "User";
  languagePreference: "Fr" | "Eng";
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  likes: number[];
  authorId: number;
  createdAt: string;
  author: User;
  comments: Comment[];
  aiSummary: null;
}

export interface Comment {
  id: number;
  content: string;
  authorId: number;
  postId: number;
  createdAt: string;
  author?: User; // Make author optional since it's not returned by API
}

export interface Event {
  id: number;
  title: string;
  category: string;
  description: string;
  startDate: string;
  coverImage: string;
  location: string;
  endDate: string;
  attendees: number[];
  hostId: number;
  createdAt: string;
}
