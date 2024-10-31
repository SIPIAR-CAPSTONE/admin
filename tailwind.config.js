/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx,js,jsx}", "./index.html"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        primary: {
          50: "#fef2f3",
          100: "#fee2e3",
          200: "#fecacc",
          300: "#fca5a9",
          400: "#f87177",
          500: "#ee4048",
          600: "#db272f",
          700: "#b81d24",
          800: "#991b21",
          900: "#7f1d22",
          950: "#450a0d",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
