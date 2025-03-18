#!/usr/bin/env bun
import fg from 'fast-glob'
import { promises as fs } from 'fs'

async function cleanJsFiles() {
    const jsFiles = await fg(['**/*.js'], {
        ignore: ['**/*.d.ts', 'node_modules/**', 'modules/demo/**']
    })

    for (const file of jsFiles) {
        try {
            await fs.unlink(file)
        } catch (error) {
            console.error(`Error removing ${file}:`, error)
        }
    }
}

cleanJsFiles()
