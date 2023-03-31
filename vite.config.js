import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import purge from '@erbelion/vite-plugin-laravel-purgecss';
import viteCompression from 'vite-plugin-compression';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        purge({
            templates: ['blade','vue']
        }),
        viteCompression({
            algorithm: 'gzip'
        }),
    ],
    server: {
        hmr: {
            host: 'localhost',
        },
    }
});
