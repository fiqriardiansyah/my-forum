/** @type {import('tailwindcss').Config} */
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
    plugins: [],
    corePlugins: {
        preflight: false,
    },
};
