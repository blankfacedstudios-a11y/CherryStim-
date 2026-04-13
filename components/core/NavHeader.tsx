"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Home, Users, LayoutDashboard, Shield, Crown, Scale, DollarSign } from "lucide-react";
import type { User } from "@supabase/supabase-js";

export function NavHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      if (data.user) {
        supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single()
          .then(({ data: profile }) => setRole(profile?.role || null));
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single()
          .then(({ data: profile }) => setRole(profile?.role || null));
      } else {
        setRole(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (pathname === "/login") return null;

  return (
    <nav className="glass sticky top-0 z-[60] border-b border-white/10 px-6 py-3">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-6">
          <button onClick={() => router.push("/")} className="flex items-center gap-2 text-white/90 hover:text-white">
            <Home size={18} />
            <span className="hidden text-sm font-medium sm:inline">Cherrystim</span>
          </button>

          {user && (
            <>
              <button
                onClick={() => router.push("/browse")}
                className={`flex items-center gap-1.5 text-sm ${pathname === "/browse" ? "text-cherry-500" : "text-white/60 hover:text-white"}`}
              >
                <Users size={15} /> Browse
              </button>

              <button
                onClick={() => router.push("/cherry-competition")}
                className={`flex items-center gap-1.5 text-sm ${pathname === "/cherry-competition" ? "text-cherry-500" : "text-white/60 hover:text-white"}`}
              >
                <Crown size={15} /> Rankings
              </button>

              <button
                onClick={() => router.push("/cherry-rewards")}
                className={`hidden items-center gap-1.5 text-sm md:flex ${pathname === "/cherry-rewards" ? "text-cherry-500" : "text-white/60 hover:text-white"}`}
              >
                🎁 Rewards
              </button>

              <button
                onClick={() => router.push("/jukebox")}
                className={`hidden items-center gap-1.5 text-sm md:flex ${pathname === "/jukebox" ? "text-cherry-500" : "text-white/60 hover:text-white"}`}
              >
                🎵 Jukebox
              </button>

              <button
                onClick={() => router.push("/shop")}
                className={`hidden items-center gap-1.5 text-sm md:flex ${pathname === "/shop" ? "text-cherry-500" : "text-white/60 hover:text-white"}`}
              >
                🛒 Shop
              </button>

              {(role === "client" || role === "admin") && (
                <button
                  onClick={() => router.push("/dashboard")}
                  className={`flex items-center gap-1.5 text-sm ${pathname === "/dashboard" ? "text-cherry-500" : "text-white/60 hover:text-white"}`}
                >
                  <LayoutDashboard size={15} /> Dashboard
                </button>
              )}

              {(role === "dancer" || role === "admin") && (
                <button
                  onClick={() => router.push("/dancer/dashboard")}
                  className={`flex items-center gap-1.5 text-sm ${pathname.startsWith("/dancer") ? "text-cherry-500" : "text-white/60 hover:text-white"}`}
                >
                  <LayoutDashboard size={15} /> Dancer Hub
                </button>
              )}

              {role === "admin" && (
                <>
                  <button
                    onClick={() => router.push("/admin")}
                    className={`flex items-center gap-1.5 text-sm ${pathname === "/admin" ? "text-gold-500" : "text-white/60 hover:text-white"}`}
                  >
                    <Shield size={15} /> Admin
                  </button>
                  <button
                    onClick={() => router.push("/admin/executive")}
                    className={`hidden items-center gap-1.5 text-sm md:flex ${pathname === "/admin/executive" ? "text-gold-500" : "text-white/60 hover:text-white"}`}
                  >
                    <Crown size={15} /> Executive
                  </button>
                  <button
                    onClick={() => router.push("/admin/payroll")}
                    className={`hidden items-center gap-1.5 text-sm md:flex ${pathname === "/admin/payroll" ? "text-gold-500" : "text-white/60 hover:text-white"}`}
                  >
                    <DollarSign size={15} /> Payroll
                  </button>
                  <button
                    onClick={() => router.push("/admin/compliance")}
                    className={`hidden items-center gap-1.5 text-sm md:flex ${pathname === "/admin/compliance" ? "text-gold-500" : "text-white/60 hover:text-white"}`}
                  >
                    <Scale size={15} /> Compliance
                  </button>
                  <button
                    onClick={() => router.push("/admin/music")}
                    className={`hidden items-center gap-1.5 text-sm md:flex ${pathname === "/admin/music" ? "text-gold-500" : "text-white/60 hover:text-white"}`}
                  >
                    🎵 Music
                  </button>
                </>
              )}
            </>
          )}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden text-xs text-white/50 md:inline">{user.email}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.push("/login");
                }}
              >
                <LogOut size={16} />
              </Button>
            </>
          ) : (
            <Button size="sm" onClick={() => router.push("/login")}>
              <LogIn className="mr-1.5" size={15} /> Sign In
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
