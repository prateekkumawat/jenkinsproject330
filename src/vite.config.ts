
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // This is needed to make sure Vite replaces import.meta.env correctly
    "import.meta.env.VITE_ASSET_MANAGEMENT_URL": JSON.stringify(process.env.VITE_ASSET_MANAGEMENT_URL),
    "import.meta.env.VITE_EMPLOYEE_MANAGEMENT_URL": JSON.stringify(process.env.VITE_EMPLOYEE_MANAGEMENT_URL),
  },
}));
