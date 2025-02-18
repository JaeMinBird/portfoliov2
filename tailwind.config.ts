import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        'glow': '0 0 10px #fff, 0 0 20px #fff, 0 0 30px #fff',
      },
      textShadow: {
        'strong': '0 0 15px rgba(255, 255, 255, 0.8)',
      },
    },
  },
  plugins: [],
} satisfies Config;
