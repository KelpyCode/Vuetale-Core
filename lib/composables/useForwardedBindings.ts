import { computed, getCurrentInstance, type ComputedRef } from 'vue'

type ForwardedOptions = {
    exclude?: string[]
}

const toKebabCase = (propName: string) => propName.replace(/([A-Z])/g, '-$1').toLowerCase()

const hasExplicitProp = (propName: string, rawProps: Record<string, unknown>) => {
    return Object.prototype.hasOwnProperty.call(rawProps, propName)
        || Object.prototype.hasOwnProperty.call(rawProps, toKebabCase(propName))
}

export const useForwardedBindings = <T extends Record<string, unknown>>(
    props: T,
    attrs: Record<string, unknown>,
    options?: ForwardedOptions,
) => {
    const instance = getCurrentInstance()
    const excludedPropNames = new Set(options?.exclude ?? [])

    const forwardedProps = computed(() => {
        const rawProps = (instance?.vnode.props ?? {}) as Record<string, unknown>

        return Object.fromEntries(
            Object.entries(props).filter(([propName, propValue]) => {
                if (excludedPropNames.has(propName)) {
                    return false
                }

                if (!hasExplicitProp(propName, rawProps)) {
                    return false
                }

                if (propValue == null) {
                    return false
                }

                if (typeof propValue !== 'object' || Array.isArray(propValue)) {
                    return true
                }

                return Object.keys(propValue).length > 0
            }),
        ) as Partial<T>
    })

    const forwardedBindings = computed(() => ({
        ...forwardedProps.value,
        ...attrs,
    })) as ComputedRef<Record<string, unknown>>

    return {
        forwardedProps,
        forwardedBindings,
    }
}