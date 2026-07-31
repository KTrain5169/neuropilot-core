import { defineConfig } from 'tsdown';

export default defineConfig(
    {
        entry: { index: 'src/index.ts', actions: 'src/common/actions.ts', bridges: 'src/bridges/index.ts' },
        outDir: 'dist/',
        publint: true,
        attw: true,
        exports: true,
    }
)
