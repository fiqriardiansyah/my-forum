/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPath from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        tsconfigPath(),
        react({
            include: "**/*.tsx",
        }),
    ],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./src/setupTest.ts"],
    },
});
