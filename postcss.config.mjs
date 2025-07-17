/**
 * PostCSS configuration for Tailwind CSS v4.
 * The new `@tailwindcss/postcss` plugin replaces the old `tailwindcss` plugin
 * used in previous versions.
 */

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    autoprefixer: {},
  },
};

export default config;
