/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
import scrollbar from "tailwind-scrollbar";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    maxWidth: {
      container: "1440px",
    },
    letterSpacing: {
      '-tight': '-0.1px', // Define a custom key for your value
    },
    fontSize: {
      xs: ["12px", "16px"],
      sm: ["14px", "20px"],
      base: ["16px", "19.5px"],
      lg: ["18px", "21.94px"],
      xl: ["20px", "24.38px"],
      "2xl": ["24px", "29.26px"],
      "3xl": ["28px", "50px"],
      "4xl": ["48px", "58px"],
      "8xl": ["96px", "106px"],
    },
    extend: {
      fontFamily: {
        Roobert: ['Roobert'],
        Metrisch: ['Metrisch'],
        RoobertBold: ['Roobert-Bold'],
        MetrischBold: ['Metrisch-Bold']
      },
      colors: {
        "slate-gray": "#42f545",
        "white-400": "#cb19d1",
        "hover-300": "#cc1f0c",
        primeColor: "#001219",
        lightText: "#011c12",
        darkGreen: "#132A13",
        forestGreen: "#31572C",
        oliveGreen: "#4F772D",
        sageGreen: "#90A955",
        lightYellow: "#ECF39E",
        midnightBlue: "#0c2f4a",
        limeGreen: "#6ebe4a"
      },
      boxShadow: {
        "3xl": "0 10px 40px rgba(0, 0, 0, 0.1)",
        testShadow: "0px 0px 54px -13px rgba(0,0,0,0.7)",
      },
      backgroundImage: {},
      screens: {
        xs: "320px",
        sms: "375px",
        sm: "500px",
        mds: "667px",
        md: "768px",
        lgs: "960px",
        lg: "1024px",
        xls: "1280px",
        xl: "1440px",
      },
    },
  },
  plugins: [scrollbar],
};
