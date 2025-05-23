import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import eslint from "vite-plugin-eslint";
// https://vite.dev/config/
export default defineConfig({
	server: {
		allowedHosts: ["1f3c-103-157-195-97.ngrok-free.app"],
	},
	plugins: [react(), tailwindcss()],
});
