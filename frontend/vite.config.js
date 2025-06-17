import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        host: '0.0.0.0', // This is what makes it work with k6
        port: 5173 // Optional: to fix the port
    }
});
