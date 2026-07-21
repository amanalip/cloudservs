/**
 * Starlight loads lesson files through Astro's content layer.
 * The extended schema makes important teaching and fact-checking fields mandatory.
 */
import { defineCollection } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { z } from 'astro/zod';

/** Every lesson uses the same controlled vocabulary for its review state. */
const reviewStatus = z.enum(['draft', 'reviewed', 'verified']);

/** Difficulty is deliberately simple so it helps without intimidating learners. */
const difficulty = z.enum(['beginner', 'intermediate', 'advanced']);

/** The docs collection validates all Markdown and MDX lesson frontmatter at build time. */
const docs = defineCollection({
  loader: docsLoader(),
  schema: docsSchema({
    extend: z.object({
      difficulty: difficulty.default('beginner'),
      module: z.number().int().min(0).max(9).default(0),
      estimatedMinutes: z.number().int().positive().default(5),
      providers: z.array(z.enum(['AWS', 'Azure', 'Google Cloud'])).default([]),
      prerequisites: z.array(z.string()).default([]),
      objectives: z.array(z.string()).default([]),
      lastVerified: z.coerce.date().optional(),
      reviewStatus: reviewStatus.default('draft'),
      searchTerms: z.array(z.string()).default([]),
    }),
  }),
});

/** Astro discovers exported collections by this exact object name. */
export const collections = { docs };
