import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cherry: { 500: "#ff0033", 600: "#e6002e", 700: "#cc0029" },
        gold: { 400: "#f5c242", 500: "#ffd700" },
        dark: { 900: "#0a0005", 950: "#050002" }
      },
      boxShadow: {
        glass: "0 8px 40px rgba(255, 0, 51, 0.18)",
        glow: "0 0 30px rgba(255, 215, 0, 0.35)"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at 20% 20%, rgba(255,0,51,0.25), rgba(5,0,2,0.92) 52%), radial-gradient(circle at 80% 5%, rgba(255,215,0,0.14), rgba(5,0,2,0.95) 30%)"
      },
      fontFamily: {
        display: ["Cinzel", "serif"],
        serif: ["Playfair Display", "serif"]
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
