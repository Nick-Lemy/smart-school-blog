"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import api from "@/lib/utils";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const [formInfo, setFormInfo] = useState({ email: "", password: "" });
  const disable = isLoading || !formInfo.email || !formInfo.password;

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);
    api
      .post("/auth/login", formInfo)
      .then((response) => {
        login(response.data.access_token);
        // Redirect to dashboard after successful login
        router.push("/home/dashboard");
      })
      .catch((error) => {
        // Handle login error
        setError(
          error.response?.data?.message || "Login failed. Please try again."
        );
        console.error("Login failed:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-700 px-6 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-4">
        <div className="flex flex-col items-center gap-2">
          {/* Simple Logo Placeholder */}
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold text-green-600">
              Smart School Blog
            </h1>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">
              Sign in to your account
            </h2>
            <p className="text-gray-50 text-sm mt-2">
              Access AI summaries and school events
            </p>
          </div>
        </div>
        {error && (
          <div className="text-red-500 text-sm text-center">
            {error ? error : "An error occurred. Please try again."}
          </div>
        )}

        <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formInfo.email}
                onChange={(e) =>
                  setFormInfo({ ...formInfo, email: e.target.value })
                }
                required
                placeholder="name@school.edu"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="text-sm">
                  <Link
                    href="/auth/forgot-password"
                    className="font-medium text-green-600 hover:text-green-500"
                  >
                    Forgot?
                  </Link>
                </div>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formInfo.password}
                onChange={(e) =>
                  setFormInfo({ ...formInfo, password: e.target.value })
                }
                required
                placeholder="Enter your password"
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              disabled={disable}
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-black bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isLoading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>

        <div className="text-center text-sm">
          <p className="text-white">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
