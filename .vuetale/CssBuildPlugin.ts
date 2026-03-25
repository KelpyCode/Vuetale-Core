import { Plugin } from "vite";
import postcss from 'postcss'
import postcssJs from 'postcss-js'


export function CssBuildPlugin(): Plugin {

    return {
        name: "cssbuild-plugin",
        apply: "build",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        generateBundle(_, bundle: any) {
            // Phase 1: parse every CSS asset into a styles JSON string
            const cssStyles = new Map<string, string>() // cssFileName → jsonStr
            for (const fileName in bundle) {
                const chunk = bundle[fileName]
                if (chunk.type === 'asset' && fileName.endsWith('.css')) {
                    const root = postcss.parse(chunk.source.toString())
                    cssStyles.set(fileName, JSON.stringify(postcssJs.objectify(root), null, 2))
                }
            }

            // Phase 2: add `export const styles` to the name-matched entry (for manual use)
            for (const [cssFile, jsonStr] of cssStyles) {
                const jsFileName = cssFile.replace(/\.css$/, '.js')
                const jsChunk = bundle[jsFileName]
                if (jsChunk?.type === 'chunk') {
                    jsChunk.code += `\nexport const styles = ${jsonStr};\n`
                }
            }

            // Phase 3: inject auto-registration into every JS chunk that imports each CSS file.
            // Uses viteMetadata.importedCss so the injection follows the real import graph,
            // not just name-matching. This means components bundled into parent entries
            // (e.g. Test inlined into App) still register their styles when that parent loads.
            for (const fileName in bundle) {
                const chunk = bundle[fileName]
                if (chunk.type !== 'chunk') continue

                const importedCss: Set<string> = chunk.viteMetadata?.importedCss ?? new Set()
                for (const cssFile of importedCss) {
                    const jsonStr = cssStyles.get(cssFile)
                    if (!jsonStr) continue

                    const key = JSON.stringify(cssFile)
                    // IIFE keeps variables out of module scope; applyStyles deduplicates by key
                    chunk.code += `\n;(function(){var __s=${jsonStr};var __fn=globalThis.__vt_applyStyles__;if(typeof __fn==="function"){__fn(__s,${key});}else{(globalThis.__vt_pendingStyles__=globalThis.__vt_pendingStyles__||[]).push([${key},__s]);}})();\n`
                }
            }
        },
    }
}