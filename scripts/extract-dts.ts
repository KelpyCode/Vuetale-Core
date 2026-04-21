/**
 * extract-dts.ts
 *
 * Dev-time script that:
 *  1. Scans a list of source locations (JAR files or local resource directories).
 *  2. Finds `vuetale/<alias>/` resource trees inside each, extracting:
 *       - All `.d.ts` files
 *       - The `manifest.json` describing the mod's components/pages/huds
 *  3. Writes everything into `node_modules/@<alias>/` so TypeScript and Vite's
 *     `resolve.alias` can satisfy `import ... from 'vt:@core/components/Foo'`.
 *  4. Generates a `tsconfig.paths.json` snippet that can be merged into
 *     `tsconfig.app.json` via the `extends` array or a reference include.
 *
 * ### Configuration
 * Create a `vuetale.sources.json` file at the root of your Vite project:
 * ```json
 * {
 *   "sources": [
 *     "../../../build/libs/Vuetale-1.0-SNAPSHOT-all.jar",
 *     "../../main/resources"
 *   ]
 * }
 * ```
 * Each entry is relative to the script's working directory (the `src/vuetale` folder).
 * Local resource directories are useful in watch-mode development.
 *
 * ### Run
 * ```bash
 * cd src/vuetale
 * npx tsx scripts/extract-dts.ts
 * # or add to package.json:  "extract-dts": "tsx scripts/extract-dts.ts"
 * ```
 */

import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

// ---------------------------------------------------------------------------
// Optional JSZip – only used when a JAR source is listed.
// Install with: pnpm add -D jszip
// ---------------------------------------------------------------------------
let JSZip: typeof import('jszip') | undefined;
try {
    const req = createRequire(import.meta.url);
    JSZip = req('jszip');
} catch {
    // JSZip unavailable – JAR extraction will be skipped with a warning.
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const ROOT = process.cwd(); // src/vuetale

function resolveSrc(p: string) {
    return path.resolve(ROOT, p);
}

function ensureDir(dir: string) {
    fs.mkdirSync(dir, { recursive: true });
}

function writeFile(dest: string, content: string | Buffer) {
    ensureDir(path.dirname(dest));
    fs.writeFileSync(dest, content);
}

interface VuetaleManifest {
    name: string;
    version: string;
    description?: string;
    components: string[];
    pages: string[];
    huds: string[];
}

interface ExtractedModule {
    alias: string;
    manifest?: VuetaleManifest;
    dtsFiles: Array<{ relativePath: string; content: string }>;
}

// ---------------------------------------------------------------------------
// Source: local resource directory
// ---------------------------------------------------------------------------
function extractFromDir(resourceRoot: string): ExtractedModule[] {
    const vtDir = path.join(resourceRoot, 'vuetale');
    if (!fs.existsSync(vtDir)) return [];

    const results: ExtractedModule[] = [];

    for (const alias of fs.readdirSync(vtDir)) {
        const aliasDir = path.join(vtDir, alias);
        if (!fs.statSync(aliasDir).isDirectory()) continue;

        const mod: ExtractedModule = { alias, dtsFiles: [] };

        // manifest.json
        const manifestPath = path.join(aliasDir, 'manifest.json');
        if (fs.existsSync(manifestPath)) {
            mod.manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
        }

        // Walk for .d.ts files
        walkDir(aliasDir, (filePath) => {
            if (!filePath.endsWith('.d.ts')) return;
            const relative = path.relative(aliasDir, filePath).replaceAll('\\', '/');
            mod.dtsFiles.push({ relativePath: relative, content: fs.readFileSync(filePath, 'utf-8') });
        });

        results.push(mod);
    }

    return results;
}

function walkDir(dir: string, cb: (filePath: string) => void) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) walkDir(full, cb);
        else cb(full);
    }
}

// ---------------------------------------------------------------------------
// Source: JAR file
// ---------------------------------------------------------------------------
async function extractFromJar(jarPath: string): Promise<ExtractedModule[]> {
    if (!JSZip) {
        console.warn(`[extract-dts] JSZip not found – skipping JAR: ${jarPath}`);
        console.warn(`               Install it with: pnpm add -D jszip`);
        return [];
    }

    if (!fs.existsSync(jarPath)) {
        console.warn(`[extract-dts] JAR not found, skipping: ${jarPath}`);
        return [];
    }

    const zipData = fs.readFileSync(jarPath);
    const zip = await (JSZip as any).loadAsync(zipData);

    const byAlias = new Map<string, ExtractedModule>();

    for (const [name, file] of Object.entries(zip.files) as [string, any][]) {
        if (file.dir) continue;

        const match = name.match(/^vuetale\/([^/]+)\/(.+)$/);
        if (!match) continue;

        const [, alias, relPath] = match;

        if (!byAlias.has(alias)) byAlias.set(alias, { alias, dtsFiles: [] });
        const mod = byAlias.get(alias)!;

        if (relPath === 'manifest.json') {
            const text = await file.async('string');
            mod.manifest = JSON.parse(text);
        } else if (relPath.endsWith('.d.ts')) {
            const text = await file.async('string');
            mod.dtsFiles.push({ relativePath: relPath, content: text });
        }
    }

    return Array.from(byAlias.values());
}

// ---------------------------------------------------------------------------
// Write extracted module into node_modules/@<alias>
// ---------------------------------------------------------------------------
function writeModulePackage(mod: ExtractedModule) {
    const pkgDir = path.join(ROOT, 'node_modules', `@${mod.alias}`);
    ensureDir(pkgDir);

    // package.json
    const pkg = {
        name: `@${mod.alias}`,
        version: mod.manifest?.version ?? '0.0.0',
        description: mod.manifest?.description ?? `Vuetale module: ${mod.alias}`,
        types: 'index.d.ts',
    };
    writeFile(path.join(pkgDir, 'package.json'), JSON.stringify(pkg, null, 2));

    // .d.ts files
    for (const { relativePath, content } of mod.dtsFiles) {
        writeFile(path.join(pkgDir, relativePath), content);
    }

    // Barrel index.d.ts if none extracted
    const indexDts = path.join(pkgDir, 'index.d.ts');
    if (!fs.existsSync(indexDts)) {
        const exports = (mod.manifest?.components ?? [])
            .concat(mod.manifest?.pages ?? [])
            .concat(mod.manifest?.huds ?? []);
        const lines = exports.map(e => `export * from './${e}';`).join('\n');
        writeFile(indexDts, lines || '// no exports\n');
    }

    console.log(`[extract-dts] Wrote @${mod.alias} (${mod.dtsFiles.length} .d.ts files)`);
}

// ---------------------------------------------------------------------------
// Generate tsconfig.paths.json
// ---------------------------------------------------------------------------
function writeTsconfigPaths(modules: ExtractedModule[]) {
    const paths: Record<string, string[]> = {};

    for (const mod of modules) {
        // vt:@alias  →  node_modules/@alias/index.d.ts
        paths[`vt:@${mod.alias}`] = [`./node_modules/@${mod.alias}/index.d.ts`];
        // vt:@alias/*  →  node_modules/@alias/*
        paths[`vt:@${mod.alias}/*`] = [`./node_modules/@${mod.alias}/*`];
    }

    const out = {
        compilerOptions: { paths },
    };

    const dest = path.join(ROOT, 'tsconfig.paths.json');
    writeFile(dest, JSON.stringify(out, null, 2));
    console.log(`[extract-dts] Wrote tsconfig.paths.json`);
}

// ---------------------------------------------------------------------------
// Generate vite-aliases.ts (to be imported in vite.config.ts)
// ---------------------------------------------------------------------------
function writeViteAliases(modules: ExtractedModule[]) {
    const lines = [
        `// Auto-generated by extract-dts.ts – do not edit manually`,
        `import { resolve } from 'node:path';`,
        ``,
        `export const vuetaleAliases: Record<string, string> = {`,
    ];

    const jsonAliases: Record<string, string> = {};

    for (const mod of modules) {
        lines.push(`  'vt:@${mod.alias}': resolve(__dirname, '../node_modules/@${mod.alias}'),`);
        jsonAliases[`vt:@${mod.alias}`] = `./node_modules/@${mod.alias}`;
    }

    lines.push(`};`);

    const dest = path.join(ROOT, '.vuetale', 'vuetale-aliases.ts');
    writeFile(dest, lines.join('\n') + '\n');
    console.log(`[extract-dts] Wrote .vuetale/vuetale-aliases.ts`);

    // Also write aliases.json consumed by vite.config.ts at build time
    const jsonDest = path.join(ROOT, '.vuetale', 'aliases.json');
    writeFile(jsonDest, JSON.stringify(jsonAliases, null, 2));
    console.log(`[extract-dts] Wrote .vuetale/aliases.json`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
    // Load source config
    const configPath = path.join(ROOT, 'vuetale.sources.json');
    let sources: string[] = [];

    if (fs.existsSync(configPath)) {
        const cfg = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        sources = cfg.sources ?? [];
    } else {
        // Sensible default: local resources dir next to src/vuetale
        sources = ['../main/resources'];
        console.log(`[extract-dts] No vuetale.sources.json found – using default: ${sources[0]}`);
    }

    const allModules: ExtractedModule[] = [];

    for (const src of sources) {
        const abs = resolveSrc(src);
        const isJar = src.endsWith('.jar');
        console.log(`[extract-dts] Scanning ${isJar ? 'JAR' : 'dir'}: ${abs}`);

        const mods = isJar
            ? await extractFromJar(abs)
            : extractFromDir(abs);

        allModules.push(...mods);
    }

    if (allModules.length === 0) {
        console.log(`[extract-dts] No Vuetale modules found. Check your vuetale.sources.json.`);
        return;
    }

    for (const mod of allModules) {
        writeModulePackage(mod);
    }

    writeTsconfigPaths(allModules);
    writeViteAliases(allModules);

    console.log(`[extract-dts] Done. ${allModules.length} module(s) processed.`);
}

main().catch(err => {
    console.error('[extract-dts] Fatal error:', err);
    process.exit(1);
});





