import { Plugin } from "vite";
import { resolve } from "node:path";
import fs from "node:fs";

export interface VuetaleManifest {
    name: string;
    version: string;
    description?: string;
    components: string[];
    pages: string[];
    huds: string[];
}

export function VuetalePlugin(): Plugin {
    const pagesDir = resolve(process.cwd(), 'lib', 'pages')
    const componentsDir = resolve(process.cwd(), 'lib', 'components')
    const hudsDir = resolve(process.cwd(), 'lib', 'huds')

    const pages = new Set<string>()
    const components = new Set<string>()
    const huds = new Set<string>()
    let targetDir: string | undefined = undefined

    function scanDir(dir: string, set: Set<string>) {
        if (!fs.existsSync(dir)) return;
        fs.readdirSync(dir)
            .filter(f => f.endsWith('.vue') || f.endsWith('.ts') || f.endsWith('.js'))
            .forEach(f => set.add(f.replace(/\.(vue|ts|js)$/, '')));
    }

    return {
        name: "vuetale-plugin",
        buildStart() {
            // Pre-populate from disk so manifest is complete even if transform() is skipped
            scanDir(pagesDir, pages);
            scanDir(componentsDir, components);
            scanDir(hudsDir, huds);
        },
        writeBundle(info) {
            targetDir = info.dir;
            if (!targetDir) return;

            // Re-read vuetale-plugin.json fresh (may have been updated)
            const configPath = resolve(process.cwd(), 'lib', 'vuetale-plugin.json');
            const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

            const manifest: VuetaleManifest = {
                name: config.name,
                version: config.version ?? '0.0.0',
                description: config.description,
                components: Array.from(components),
                pages: Array.from(pages),
                huds: Array.from(huds),
            };

            fs.writeFileSync(
                resolve(targetDir!, 'manifest.json'),
                JSON.stringify(manifest, null, 2),
                'utf-8'
            );
            console.log(`Vuetale: Wrote manifest.json for '${manifest.name}' with ${pages.size} page(s), ${huds.size} hud(s), ${components.size} component(s).`);
        },
        buildEnd(err) {
            if (err) return;
        },
        transform(code, id) {
            if (!id.endsWith('.vue') && !id.endsWith('.ts') && !id.endsWith('.js')) return code;

            const idNorm = id.replaceAll('\\', '/');
            const stripExt = (s: string) => s.replace(/\.(vue|ts|js)$/, '');

            if (idNorm.startsWith(pagesDir.replaceAll('\\', '/'))) {
                const rel = idNorm.substring(pagesDir.replaceAll('\\', '/').length + 1);
                pages.add(stripExt(rel));
            } else if (idNorm.startsWith(hudsDir.replaceAll('\\', '/'))) {
                const rel = idNorm.substring(hudsDir.replaceAll('\\', '/').length + 1);
                huds.add(stripExt(rel));
            } else if (idNorm.startsWith(componentsDir.replaceAll('\\', '/'))) {
                const rel = idNorm.substring(componentsDir.replaceAll('\\', '/').length + 1);
                components.add(stripExt(rel));
            }

            return code;
        },
    };
}
