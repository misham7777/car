import { existsSync } from 'node:fs';
import { env } from 'node:process';

if (env.GITHUB_PAGES === 'true' && existsSync('src/app/api')) {
  console.error('❌ src/app/api/* is not supported with output: export (GitHub Pages). Move API to Vercel/Workers.');
  process.exit(1);
}

console.log('✅ No app/api routes found - safe for static export');
