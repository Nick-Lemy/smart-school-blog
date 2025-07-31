export interface User {
  id: 1;
  name: string;
  email: string;
  role: "Admin" | "User";
  languagePreference: "Fr" | "Eng";
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
  author: User;
}
