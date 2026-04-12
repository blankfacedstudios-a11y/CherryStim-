"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/core/Logo";
import { toast } from "sonner";
import { LogIn, UserPlus } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<"client" | "dancer">("client");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    toast.success(`Welcome back!`);

    if (profile?.role === "admin") {
      router.push("/admin");
    } else if (profile?.role === "dancer") {
      router.push("/dancer/dashboard");
    } else {
      router.push("/dashboard");
    }
  }

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName, role } }
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      await supabase.from("profiles").upsert({
        id: data.user.id,
        display_name: displayName,
        role,
        tier: "Pro"
      });

      await supabase.from("coin_wallets").upsert({
        user_id: data.user.id,
        balance: 500
      });

      if (role === "dancer") {
        await supabase.from("dancer_profiles").upsert({
          user_id: data.user.id,
          bio: "",
          gear_owner: "cherrystim"
        });
      }
    }

    toast.success("Account created! Redirecting...");

    if (role === "dancer") {
      router.push("/dancer/dashboard");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="hero-bg flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-md">
        <Logo className="mb-8" />
        <h1 className="cherry-text mb-2 text-center font-display text-4xl">
          {isSignUp ? "Join Cherrystim" : "Welcome Back"}
        </h1>
        <p className="mb-8 text-center text-white/60">
          {isSignUp ? "Create your account" : "Sign in to your account"}
        </p>

        <Card className="glass p-8">
          <form onSubmit={isSignUp ? handleSignUp : handleLogin} className="space-y-5">
            {isSignUp && (
              <div>
                <label className="mb-1.5 block text-sm text-white/70">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm focus:border-cherry-500 focus:outline-none"
                  placeholder="Your name"
                  required
                />
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm text-white/70">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm focus:border-cherry-500 focus:outline-none"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm text-white/70">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-white/20 bg-black/60 px-4 py-3 text-sm focus:border-cherry-500 focus:outline-none"
                placeholder="••••••••"
                required
                minLength={6}
              />
            </div>

            {isSignUp && (
              <div>
                <label className="mb-1.5 block text-sm text-white/70">I am a...</label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setRole("client")}
                    className={`flex-1 rounded-xl border-2 p-3 text-sm transition ${
                      role === "client" ? "border-cherry-500 bg-cherry-600/20" : "border-white/10"
                    }`}
                  >
                    Client / Viewer
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("dancer")}
                    className={`flex-1 rounded-xl border-2 p-3 text-sm transition ${
                      role === "dancer" ? "border-gold-500 bg-gold-500/20" : "border-white/10"
                    }`}
                  >
                    Dancer / Performer
                  </button>
                </div>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full py-6 text-base" disabled={loading}>
              {loading ? (
                "Please wait..."
              ) : isSignUp ? (
                <>
                  <UserPlus className="mr-2" size={18} /> Create Account
                </>
              ) : (
                <>
                  <LogIn className="mr-2" size={18} /> Sign In
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-sm text-white/60 hover:text-white"
            >
              {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
            </button>
          </div>
        </Card>
      </div>
    </main>
  );
}
