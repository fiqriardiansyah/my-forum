/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
const lineClamp = require("@tailwindcss/line-clamp");

module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#1DA1F2",
            },
            fontFamily: {
                roboto: ["Roboto", "sans-serif"],
                "twitter-chirp": ["TwitterChirp", "sans-serif"],
                "twitter-chirp-extended": ["TwitterChirpExtendedHeavy", "sans-serif"],
            },
        },
    },
    plugins: [lineClamp],
    corePlugins: {
        preflight: false,
    },
};
