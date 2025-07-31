"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminProtectedRouteProps {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({
  children,
}: AdminProtectedRouteProps) {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!currentUser || !currentUser.isVerified)) {
      router.replace("/home/dashboard");
    }
  }, [currentUser, isLoading, router]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-700">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="animate-spin mx-auto mb-4 w-8 h-8 text-green-500" />
            <p className="text-white">Verifying admin access...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!currentUser || !currentUser.isVerified) {
    return (
      <main className="min-h-screen bg-gray-700">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <AlertTriangle className="mx-auto mb-4 w-16 h-16 text-red-500" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Access Denied
            </h2>
            <p className="text-gray-400 mb-6">
              You need admin privileges to access this page.
            </p>
            <Button
              onClick={() => router.push("/home/dashboard")}
              className="bg-green-600 text-black font-semibold"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
