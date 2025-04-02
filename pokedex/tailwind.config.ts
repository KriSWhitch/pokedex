import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['var(--font-nunito)', 'sans-serif'],
        secondary: ['var(--font-press-start-2p)', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
