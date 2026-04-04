import type { NATIVE } from "@/types/global";
import { defineComponent, h, useAttrs, useSlots } from "vue";
export function createPrefabComponent<K extends keyof NATIVE, T extends NATIVE[K]>(_origin: string, name: string, type: K) {
    void type;

    return defineComponent<T>({
        name,

        // Let Vue treat incoming attrs as fallthrough while TypeScript keeps T for autocomplete.
        inheritAttrs: true,

        setup(props) {
            // Get raw attrs (includes class, style, event listeners, unknown props, etc.)
            const attrs = useAttrs();

            // Get all slots from the parent (default + named slots)
            const slots = useSlots(); // or use setupSlots

            return () => {
                // Forward everything to <Prefab>
                return h(
                    type,           // or import Prefab and use the component directly
                    {
                        ...attrs,         // spreads class, style, onClick, data-*, etc.
                        ...props,          // any explicitly passed props (if you declare them later)
                        varFrom: _origin,
                        varName: name,
                    },
                    slots               // ← This forwards ALL slots perfectly (default + named)
                );
            };
        }
    });
}