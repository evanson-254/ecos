import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import netlifyReactRouter from "@netlify/vite-plugin-react-router";

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [tailwindcss(), 
    reactRouter(),
    netlifyReactRouter()
  ],
  server: {
    allowedHosts: ["87f3-102-0-31-126.ngrok-free.app"]
  }
})
