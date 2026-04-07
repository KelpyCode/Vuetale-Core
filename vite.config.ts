import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'node:path'
import { readdirSync } from 'node:fs'
import { VuetalePlugin } from './.vuetale/VuetalePlugin'
import { CssBuildPlugin } from './.vuetale/CssBuildPlugin'
import vuetaleConfig from './lib/vuetale-plugin.json'
import dts from 'unplugin-dts'

function getComponentEntries() {
  const componentsDir = resolve(__dirname, 'lib/components')
  return readdirSync(componentsDir)
    .filter(file => file.endsWith('.vue'))
    .reduce((entries, file) => {
      const name = file.replace('.vue', '')
      entries[name] = resolve(componentsDir, file)
      return entries
    }, {} as Record<string, string>)
}

function getScriptEntries() {
  const scriptsDir = resolve(__dirname, 'lib')
  return readdirSync(scriptsDir)
    .filter(file => file.endsWith('.ts'))
    .reduce((entries, file) => {
      const name = file.replace('.ts', '')
      entries[name] = resolve(scriptsDir, file)
      return entries
    }, {} as Record<string, string>)
}


function getPageEntries() {
  const pagesDir = resolve(__dirname, 'lib/pages')
  return readdirSync(pagesDir)
    .filter(file => file.endsWith('.vue'))
    .reduce((entries, file) => {
      const name = file.replace('.vue', '')
      entries[name] = resolve(pagesDir, file)
      return entries
    }, {} as Record<string, string>)
}

function getTypeEntries() {
  const typesDir = resolve(__dirname, 'lib/types')
  return readdirSync(typesDir)
    .filter(file => file.endsWith('.ts'))
    .reduce((entries, file) => {
      const name = file.replace('.ts', '')
      entries[name] = resolve(typesDir, file)
      return entries
    }, {} as Record<string, string>)
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    dts.vite({ tsconfigPath: './tsconfig.app.json', processor: 'vue' }),
    VuetalePlugin(),
    CssBuildPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./lib', import.meta.url))
    },
  },
  build: {
    cssCodeSplit: true,
    lib: {
      entry: {
        // you can still have a main barrel if you want
        // index: resolve(__dirname, 'src/index.ts'),
        ...getPageEntries(),   // Button, Card, Modal, ...
        ...getComponentEntries(),
        ...getScriptEntries(),
      },
      formats: ['es'],
      fileName: (_, entryName) => `${entryName}.js`
    },

    rollupOptions: {
      external: ['vue'],
      output: {
        sourcemap: "inline",
        preserveModules: true,
        entryFileNames: '[name].js',

      },
    },

    outDir: '../main/resources/vuetale/' + vuetaleConfig.name,
    emptyOutDir: true
  }
})
