"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";

export const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Redirect to dashboard on successful login
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-black/5">
      <div className="grid grid-cols-1 md:grid-cols-2 w-[80%] shadow-2xl overflow-hidden rounded">
        <div className="relative hidden md:block min-h-150">
          <Image
            src="/images/room6.png"
            alt="Login Image"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute bottom-10 left-10 text-white">
            <h2 className="text-3xl font-bold text-muted">Welcome Back</h2>
            <p className="text-muted text-sm mt-2">
              Experience luxury stays with us
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center p-8 md:p-12 bg-white">
          <div className="w-full max-w-md space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-gray-500 text-sm mt-2">
                Enter your credentials to continue
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full mt-2 px-4 py-3 border rounded-full outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Password</label>

                <div className="relative mt-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full px-4 py-3 pr-12 border rounded-full outline-none focus:ring-2 focus:ring-primary"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary cursor-pointer"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-6 rounded-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden shadow-md cursor-pointer"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-white/90" />

                    <span className="text-sm tracking-wide text-white/90">
                      Signing you in...
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="h-5 w-5" />
                    <span>Sign In</span>
                  </div>
                )}

                {/* premium subtle shine */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] animate-[shine_1.8s_infinite]" />
              </Button>

              <p className="text-center text-sm text-gray-500">
                Authorized personnel only.{" "}
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
