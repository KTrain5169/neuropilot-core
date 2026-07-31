import path from 'node:path';

import { defineConfig } from 'rolldown';
import { globSync } from 'tinyglobby';

export default defineConfig([
    {
        input: 'src/index.ts',
        output: {
            file: 'dist/in/index.js',
            format: 'cjs',
            codeSplitting: false,
        },
        external: ['vscode'],
        tsconfig: './tsconfig.lib.json'
    },
    {
        input: Object.fromEntries(
            globSync('ui/**/*.tsx').map((file) => [
                // This removes `src/` as well as the file extension from each
                // file, so e.g. src/nested/foo.js becomes nested/foo, and
                // normalizes Windows backslashes to forward slashes.
                path
                    .relative('ui', file.slice(0, file.length - path.extname(file).length))
                    .split(path.sep)
                    .join('/'),
                // This expands the relative paths to absolute paths, so e.g.
                // src/nested/foo.js becomes /project/src/nested/foo.js
                path.resolve(file),
            ]),
        ),
        output: {
            dir: 'dist/views',
            format: 'cjs',
        },
        tsconfig: './tsconfig.web.json'
    }
])
