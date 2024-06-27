import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'screen',
          }
        }
      },
      screens: {
        'xs': '300px',
      },
      maxWidth: {
        '100' : '28rem',
        '106' : '34rem',
        '112' : '40rem',
        '130' : '60rem',
        '148' : '80rem',
        '164' : '100rem',
      },
      height: {
        '100' : '28rem',
        '106' : '34rem',
        '112' : '40rem',
        '124' : '50rem',
        '130' : '60rem',
        '148' : '80rem',
        '164' : '100rem',
      },
      width: {
        '100' : '28rem',
        '106' : '38rem',
        '112' : '40rem',
        '120' : '45rem',
        '130' : '60rem',
        '148' : '80rem',
        '164' : '100rem',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require("daisyui"),
    require("@tailwindcss/typography"),
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#597e52", 
          "secondary": "#f5aa27",
          "secondary-200": "#c38924",
          "accent": "#f4d548",
          "accent-300": "#d4b940",
          "neutral": "#2B3C28",
          "base-100": "#ffffff",
          "info": "#587FE4",
          "success": "#58E498",
          "warning": "#c57500",
          "error": "#E45858",
        },
      },
    ],
  },
};
export default config;
