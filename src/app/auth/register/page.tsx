"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    languagePreference: "Eng",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      await api.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        languagePreference: formData.languagePreference,
      });

      router.push("/auth/login");
    } catch (error: unknown) {
      setError(
        "Registration failed: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-700 px-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-3xl font-bold text-green-600">
            Smart School Blog
          </h1>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">
              Create your account
            </h2>
            <p className="text-gray-50 text-sm mt-2">
              Join our community to access AI summaries and school events
            </p>
          </div>
        </div>

        <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm text-white font-medium"
              >
                Full Name
              </label>
              <input
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="appearance-none block w-full text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 bg-transparent focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm text-white font-medium"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@school.edu"
                className="appearance-none block w-full text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 bg-transparent focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm text-white font-medium"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 8 characters"
                className="appearance-none block w-full text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 bg-transparent focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm text-white font-medium"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                className="appearance-none block w-full text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 bg-transparent focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="role"
                className="block text-sm text-white font-medium"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="block w-full text-white px-3 py-2 border border-gray-300 rounded-md bg-transparent shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="languagePreference"
                className="block text-sm text-white font-medium"
              >
                Language Preference
              </label>
              <select
                id="languagePreference"
                name="languagePreference"
                value={formData.languagePreference}
                onChange={handleChange}
                className="block w-full text-white px-3 py-2 border border-gray-300 rounded-md bg-transparent shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Eng">English</option>
                <option value="Fr">French</option>
              </select>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Account
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <p className="text-white">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
