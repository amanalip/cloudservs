/**
 * Prettier keeps Markdown, Astro, TypeScript, and CSS formatting consistent.
 * The Astro plugin teaches Prettier how to understand `.astro` component files.
 */
export default {
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: { parser: 'astro' },
    },
  ],
  printWidth: 100,
  singleQuote: true,
  trailingComma: 'all',
};
