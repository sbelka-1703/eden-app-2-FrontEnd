module.exports = {
  content: [
    "../../packages/ui/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F9FCF9",
        accentColor: "#74FA6D",
        darkGreen: "#071B08",
        soilOrange: "#FF7E5C",
        soilPurple: "#9B67FF",
        soilTurquoise: "#78EECB",
        soilYellow: "#FFF268",
        soilBlue: "#88A9FF",
        soilGray: "#BCBCBC",
        soilGreen: {
          50: "#FFFFFF",
          100: "#FFFFFF",
          200: "#FFFFFF",
          300: "#E5FEE3",
          400: "#BFFDBC",
          500: "#9AFB94",
          600: "#74FA6D",
          700: "#40F837",
          800: "#14EF08",
          900: "#0FB806",
        },
      },
      fontSize: {
        soilHeading1: [
          "32px",
          {
            letterSpacing: "0.02em",
          },
        ],
        soilHeading2: [
          "26px",
          {
            letterSpacing: "0.02em",
          },
        ],
        soilHeading3: [
          "20px",
          {
            letterSpacing: "0.02em",
          },
        ],
        soilBody: [
          "16px",
          {
            letterSpacing: "0em",
          },
        ],
        soilLabel: [
          "12px",
          {
            letterSpacing: "0.04em",
          },
        ],
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
      },
      boxShadow: {
        headerShadow: "0px 1px 15px 0px rgba(0, 0, 0, 0.15)",
        cardShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.15)",
        focusShadow: "0px 0px 0px 3px #74FA6D",
      },
      height: {
        "1/10": "10vh",
        "2/10": "20vh",
        "3/10": "30vh",
        "4/10": "40vh",
        "5/10": "50vh",
        "6/10": "60vh",
        "7/10": "70vh",
        "8/10": "80vh",
        "9/10": "90vh",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
