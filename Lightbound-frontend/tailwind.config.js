import withMT from "@material-tailwind/react/utils/withMT";

withMT({
    content: [
        "./src/**/*.{ts,tsx}",
        ".node_modules/@material-tailwind/react/components/**/*.{ts,tsx}",
        ".node_modules/@material-tailwind/react/theme/components/**/*.{ts,tsx}",
    ],
    theme: {
        fontFamily: {
            sans: ["consolas", "sans-serif"],
        },
        extend: {
            colors: {
                udark: "#09090b",
            },
        },
    },
    plugins: [],
});
