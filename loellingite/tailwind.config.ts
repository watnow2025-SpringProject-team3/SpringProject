import { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stone: {
          50: 'hsl(var(--color-stone-50))',
          100: 'hsl(var(--color-stone-100))',
          200: 'hsl(var(--color-stone-200))',
          300: 'hsl(var(--color-stone-300))',
          700: 'hsl(var(--color-stone-700))',
          800: 'hsl(var(--color-stone-800))',
        },
      },
    },
  },
  plugins: [],
};

export default config;
