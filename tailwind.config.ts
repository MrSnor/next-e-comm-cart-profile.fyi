import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "my-text": {
          50: "#0b0b0f",
          100: "#15151e",
          200: "#2a2a3c",
          300: "#3f3f5a",
          400: "#555577",
          500: "#6a6a95",
          600: "#8888aa",
          700: "#a5a5c0",
          800: "#c3c3d5",
          900: "#e1e1ea",
          950: "#f0f0f4",
        },
        "my-background": {
          50: "#090910",
          100: "#131320",
          200: "#252541",
          300: "#383861",
          400: "#4a4a82",
          500: "#5d5da2",
          600: "#7d7db5",
          700: "#9e9ec7",
          800: "#bebeda",
          900: "#dfdfec",
          950: "#efeff6",
          1000: "#f8f8fb",
        },
        "my-primary": {
          50: "#080812",
          100: "#101023",
          200: "#202046",
          300: "#302f6a",
          400: "#413f8d",
          500: "#514fb0",
          600: "#7472c0",
          700: "#9695d0",
          800: "#b9b9df",
          900: "#dcdcef",
          950: "#eeedf7",
        },
        "my-secondary": {
          50: "#070713",
          100: "#0e0d26",
          200: "#1b1b4b",
          300: "#292871",
          400: "#373597",
          500: "#4442bd",
          600: "#6a68ca",
          700: "#8f8ed7",
          800: "#b4b4e4",
          900: "#dad9f2",
          950: "#ececf8",
        },
        "my-accent": {
          50: "#060514",
          100: "#0b0b28",
          200: "#171650",
          300: "#222178",
          400: "#2e2ca0",
          500: "#3937c8",
          600: "#615fd3",
          700: "#8887de",
          800: "#b0afe9",
          900: "#d7d7f4",
          950: "#ebebfa",
        },
      },
      fontFamily: {
        hahmlet: ["Hahmlet", "serif"],
        notoSans: ["Noto Sans", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
