/**
 * Astro builds cloudservs as static files that GitHub Pages can host.
 * Starlight supplies the accessible documentation foundation, while the custom
 * stylesheet and components turn that foundation into the cloudservs experience.
 */
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

/** The production site lives below the repository name on GitHub Pages. */
const site = 'https://amanalip.github.io';
const base = '/cloudservs';

export default defineConfig({
  site,
  base,
  output: 'static',
  integrations: [
    starlight({
      title: 'cloudservs',
      description:
        'A visual, beginner-friendly curriculum for learning cloud concepts across AWS, Azure, and Google Cloud.',
      logo: {
        src: './src/assets/cloudservs-logo.svg',
        alt: 'cloudservs home',
        replacesTitle: false,
      },
      favicon: '/favicon.svg',
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/amanalip/cloudservs',
        },
      ],
      customCss: ['./src/styles/custom.css'],
      components: {
        Footer: './src/components/SiteFooter.astro',
        TwoColumnContent: './src/components/ResizableTwoColumnContent.astro',
      },
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Curriculum', slug: 'learn' },
            { label: 'How to learn here', slug: 'learn/how-to-use-cloudservs' },
          ],
        },
        {
          label: 'Module 1: Foundations',
          items: [
            {
              label: 'What is cloud computing?',
              slug: 'learn/foundations/what-is-cloud-computing',
            },
            { label: 'Shared responsibility', slug: 'learn/foundations/shared-responsibility' },
          ],
        },
        {
          label: 'Curriculum roadmap',
          items: [{ label: 'All modules', slug: 'learn/curriculum-roadmap' }],
        },
      ],
      expressiveCode: {
        themes: ['github-light', 'github-dark'],
        styleOverrides: {
          borderRadius: '0.9rem',
          frames: {
            shadowColor: 'transparent',
          },
        },
      },
      lastUpdated: true,
      tableOfContents: {
        minHeadingLevel: 2,
        maxHeadingLevel: 3,
      },
    }),
    preact(),
    sitemap(),
  ],
  vite: {
    build: {
      sourcemap: true,
    },
  },
});
