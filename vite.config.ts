import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import { resolve } from 'node:path'
import { readdirSync } from 'node:fs'
import { VuetalePlugin } from './.vuetale/VuetalePlugin'
import { CssBuildPlugin } from './.vuetale/CssBuildPlugin'
import { HmrIdsPlugin } from './.vuetale/HmrIdsPlugin'
import vuetaleConfig from './lib/vuetale-plugin.json'
import dts from 'unplugin-dts'

const NATIVE_UI_TAGS = new Set(["ActionButton", "AssetImage", "BackButton", "BlockSelector", "Button", "CharacterPreviewComponent", "CheckBox", "CheckBoxContainer", "CircularProgressBar", "CodeEditor", "ColorOptionGrid", "ColorPickerDropdownBox", "CompactTextField", "DropdownBox", "DropdownEntry", "DynamicPane", "DynamicPaneContainer", "FloatSlider", "FloatSliderNumberField", "Group", "HotkeyLabel", "ItemGrid", "ItemIcon", "ItemPreviewComponent", "ItemSlot", "ItemSlotButton", "Label", "LabeledCheckBox", "MenuItem", "MultilineTextField", "NumberField", "Panel", "ProgressBar", "ReorderableList", "ReorderableListGrip", "SceneBlur", "Slider", "SliderNumberField", "Sprite", "TabButton", "TabNavigation", "TextButton", "TextField", "TimerLabel", "ToggleButton"])

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

function getScriptEntries(mode: string) {
  const scriptsDir = resolve(__dirname, 'lib')
  return readdirSync(scriptsDir)
    .filter(file => file.endsWith('.ts'))
    // debug.ts is only useful in dev mode – skip it in production builds
    .filter(file => mode === 'development' || file !== 'debug.ts')
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
export default defineConfig(({ mode }) => ({
  plugins: [
    tailwindcss({}),
    vue({
      template: {
        compilerOptions: {
          // Treat custom renderer tags as native elements instead of Vue components.
          isCustomElement: (tag) => NATIVE_UI_TAGS.has(tag),
        },
      },
    }),
    vueJsx(),
    vueDevTools(),
    dts.vite({ tsconfigPath: './tsconfig.app.json', processor: 'vue' }),
    VuetalePlugin(),
    CssBuildPlugin(),
    HmrIdsPlugin(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./lib', import.meta.url))
    },
  },
  build: {
    cssCodeSplit: true,
    sourcemap: 'inline',
    lib: {
      entry: {
        // you can still have a main barrel if you want
        // index: resolve(__dirname, 'src/index.ts'),
        ...getPageEntries(),   // Button, Card, Modal, ...
        ...getComponentEntries(),
        ...getScriptEntries(mode),
      },
      formats: ['es'],
      fileName: (_, entryName) => `${entryName}.js`
    },


    rollupOptions: {
      external: ['vue'],
      output: {
        preserveModules: true,
        entryFileNames: '[name].js',

      },
    },

    outDir: '../main/resources/vuetale/' + vuetaleConfig.name,
    emptyOutDir: true
  }
}))
