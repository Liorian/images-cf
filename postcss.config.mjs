/**
 * PostCSS configuration for Tailwind CSS v4.
 * The new `@tailwindcss/postcss` plugin replaces the old `tailwindcss` plugin
 * used in previous versions.
 */
import tailwindcss from "@tailwindcss/postcss";
import autoprefixer from "autoprefixer";

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: [tailwindcss, autoprefixer],
};

export default config;
