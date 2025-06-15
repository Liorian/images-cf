/**
 * PostCSS configuration for Tailwind CSS v4.
 * Use the `@tailwindcss/postcss` plugin in place of the older
 * `tailwindcss` package.
 */

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};

export default config;
