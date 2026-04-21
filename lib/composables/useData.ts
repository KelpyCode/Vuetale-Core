import { computed, inject, type ComputedRef } from 'vue'
import { USER_APPS_DATA } from '../loader'

/**
 * Access a reactive data value pushed from the Kotlin/JVM side via
 * `playerUi.setData("key", value)` (or `app.setData("key", value)`).
 *
 * The returned `ComputedRef` updates automatically whenever Kotlin pushes a new
 * value for the same key. If no value has been set yet, `defaultValue` is returned.
 *
 * @example
 * ```vue
 * <script setup lang="ts">
 * import { useData } from '@core/composables/useData'
 *
 * const health = useData<number>('playerHealth', 0)
 * </script>
 *
 * <template>
 *   <label :text="`Health: ${health}`" />
 * </template>
 * ```
 */
export function useData<T>(key: string, defaultValue?: T): ComputedRef<T> {
    const appId = inject<string>('appId')
    if (!appId) {
        console.warn(`[useData] Could not find injected 'appId'. Are you inside a Vuetale app?`)
    }

    return computed<T>(() => {
        if (!appId) return defaultValue as T
        const store = USER_APPS_DATA.get(appId)
        if (!store) return defaultValue as T
        // Accessing store[key] on a shallowReactive object is tracked by Vue,
        // so this computed re-runs whenever setAppData writes to that key.
        return (key in store ? store[key] : defaultValue) as T
    })
}


