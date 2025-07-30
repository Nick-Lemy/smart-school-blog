"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    router.push("/home/dashboard");
  };

  return (
    <div className="min-h-dvh flex items-center justify-center bg-gray-700 px-6 sm:px-6 lg:px-8">
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
              Create your account
            </h2>
            <p className="text-gray-50 text-sm mt-2">
              Join our community to access AI summaries and school events
            </p>
          </div>
        </div>

        <form className="mt-4 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm text-white font-medium "
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="name@school.edu"
                className="appearance-none block w-full text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-white text-sm font-medium "
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="At least 8 characters"
                className="appearance-none block w-full text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-white text-sm font-medium "
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                placeholder="Re-enter your password"
                className="appearance-none block w-full text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

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
