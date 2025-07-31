import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
});

// Optional: interceptors, retry logic, etc.

export default api;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
