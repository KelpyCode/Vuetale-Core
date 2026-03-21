import { Plugin } from "vite";
import { resolve } from "node:path";
import fs from "node:fs";

export function VuetalePlugin(): Plugin {
    const basePath = resolve(process.cwd(), 'lib', 'pages')

    const pages = new Set<string>()
    let targetDir: string | undefined = undefined

    return {
        name: "vuetale-plugin",
        writeBundle(info) {
            targetDir = info.dir

            if (targetDir) {
                fs.writeFileSync(resolve(targetDir!, 'pages.json'), JSON.stringify(Array.from(pages)), 'utf-8')
                console.log("Vuetale: Wrote pages.json with entries:", Array.from(pages))
            }
        },
        buildEnd(err) {
            if (err) return

        },
        transform(code, id, options) {
            if (!id.endsWith('.vue')) return code

            const idNormalized = id.replaceAll('\\', '/')
            const basePathNormalized = basePath.replaceAll('\\', '/')
            const isAbsolutePath = idNormalized.startsWith(basePathNormalized)

            if (!isAbsolutePath) return code

            const relative = idNormalized.substring(basePathNormalized.length + 1)
            console.log(`Transforming ${relative} with options:`, options);

            pages.add(relative.replace('.vue', ''))

            return code
        },
    }
}