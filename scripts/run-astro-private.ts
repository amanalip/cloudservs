/**
 * This repository-owned launcher runs every Astro command with CLI telemetry disabled.
 * It avoids changing a contributor's machine-wide Astro settings and works in read-only homes.
 */
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

/** Forward the requested Astro subcommand and flags to Astro's local pinned executable. */
const astroArguments = process.argv.slice(2);
if (astroArguments.length === 0) {
  console.error('Provide an Astro command, such as dev, check, build, or preview.');
  process.exitCode = 1;
} else {
  const astroExecutable = resolve('node_modules/astro/bin/astro.mjs');
  const result = spawnSync(process.execPath, [astroExecutable, ...astroArguments], {
    stdio: 'inherit',
    env: {
      ...process.env,
      ASTRO_TELEMETRY_DISABLED: '1',
    },
  });

  /** Mirror Astro's exit status so npm and CI stop when the underlying command fails. */
  process.exitCode = result.status ?? 1;
}
