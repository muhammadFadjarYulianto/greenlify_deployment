import path from "path"
import react from "@vitejs/plugin-react"
import {defineConfig} from "vite"

export default defineConfig({
    plugins: [react()],
    base: '/greenlify/',
    build: {
        outDir: 'dist',
        sourcemap: true,
        assetsDir: 'assets'
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    }
})