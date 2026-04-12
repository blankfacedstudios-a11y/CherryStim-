import type { Metadata } from "next";
import { Cinzel, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { QueryClientProviderRoot } from "@/components/providers/QueryClientProviderRoot";
import { NavHeader } from "@/components/core/NavHeader";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
});

export const metadata: Metadata = {
  title: "Cherrystim",
  description: "Premium immersive entertainment platform"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${playfair.variable}`}>
      <body className="bg-dark-950 text-white antialiased">
        <QueryClientProviderRoot>
          <NavHeader />
          {children}
        </QueryClientProviderRoot>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
