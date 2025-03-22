#!/usr/bin/env bun
import fg from 'fast-glob'
import { build } from 'esbuild'

async function compileTsFiles() {
    const tsFiles = await fg(['**/*.ts'], {
        ignore: ['**/*types.ts', '**/*.d.ts', 'utils/**', 'modules/demo/**', 'node_modules/**']
    })

    for (const file of tsFiles) {
        const outfile = file.replace(/\.ts$/, '.js')
        try {
            await build({
                entryPoints: [file],
                outfile,
                bundle: false,
                format: 'esm',
                platform: 'node',
                sourcemap: false,
                target: 'es2020',
                minify: true
            })
        } catch (error) {
            console.error(`Error compiling ${file}:`, error)
        }
    }
}

compileTsFiles()
