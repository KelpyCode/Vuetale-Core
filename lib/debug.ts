import type { App } from "vue";

declare const _vt: {
  createUserApp(id: string, componentPath?: string): App
  getUserApp(id: string): App | undefined
  USER_APPS: Map<string, App>
}

// ── Performance tracking ────────────────────────────────────────────────────
const _originalCreateUserApp = _vt.createUserApp.bind(_vt)
  ; (_vt as unknown as Record<string, unknown>).createUserApp = function (id: string, componentPath?: string): App {
    const app = _originalCreateUserApp(id, componentPath)
    app.config.performance = true
    app.config.warnHandler = (msg, instance, trace) => {
      console.warn(`[Vue warn] ${msg}\n${trace}`)
    }
    console.log(`[vtdebug] App '${id}' created with performance tracking enabled`)
    return app
  }

// ── Debug API ───────────────────────────────────────────────────────────────

const debugApi = {
  /** Dump a JSON summary of all registered app IDs. */
  dumpApps(): string {
    const ids = Array.from(_vt.USER_APPS.keys())
    return JSON.stringify({ count: ids.length, apps: ids }, null, 2)
  },

  /** List all registered app IDs. */
  appIds(): string[] {
    return Array.from(_vt.USER_APPS.keys())
  },

  /** Get the raw Vue App instance for the given ID. */
  getApp(id: string): App | undefined {
    return _vt.USER_APPS.get(id)
  },

  /** Enable performance tracking on a specific app by ID. */
  enablePerformance(id: string): void {
    const app = _vt.USER_APPS.get(id)
    if (app) {
      app.config.performance = true
      console.log(`[vtdebug] Performance tracking enabled for '${id}'`)
    } else {
      console.warn(`[vtdebug] App '${id}' not found`)
    }
  },

  /** Log a summary of all apps to the console. */
  inspect(): void {
    const ids = Array.from(_vt.USER_APPS.keys())
    console.log(`[vtdebug] ${ids.length} app(s): ${ids.join(', ') || '(none)'}`)
  },
}

  ; (globalThis as unknown as Record<string, unknown>)['__vt_debug__'] = debugApi

console.log('[vtdebug] Vuetale debug module loaded. Use globalThis.__vt_debug__ to inspect apps.')

