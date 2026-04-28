import { type App, ref, type Ref, shallowReactive } from "vue";
import { hytaleRenderer } from "./renderer";
import AppComponent from './components/App.vue'
import { applyStyles, flushPendingStyles } from "./styles";

function expose<T>(name: string, value: T) {
    (globalThis as unknown as Record<string, T>)[name] = value;
}

interface VuetaleMeta {
    props: Record<string, unknown>;
}

declare const ktBridge: Record<string, unknown>;

export const USER_APPS = new Map<string, App>();
export const USER_APPS_REF = new Map<string, unknown>();
export const USER_APPS_META = new Map<string, VuetaleMeta>();
/** Reactive component-path refs keyed by app id, so navigateTo can swap without remounting. */
const USER_APP_COMPONENT_PATH = new Map<string, ReturnType<typeof ref<string | undefined>>>();
/**
 * Per-app reactive data store.
 * Each entry is a shallowReactive plain object so Vue's computed/watch can
 * track individual key additions and mutations directly.
 */
export const USER_APPS_DATA = new Map<string, Record<string, unknown>>();

/**
 * Set (or create) a reactive data value for an app.
 * Called from the Kotlin side via JSEngine / loaderCtx.invoke.
 */
export function setAppData(id: string, key: string, value: unknown): void {
    let store = USER_APPS_DATA.get(id);
    if (!store) {
        store = shallowReactive<Record<string, unknown>>({});
        USER_APPS_DATA.set(id, store);
    }
    // Convert host-callback markers into real JS functions that call ktBridge.invokeHostCallback
    let finalValue = value;
    try {
        if (value && typeof value === 'object' && '_vtHostFnId' in (value as any)) {
            const hostId = (value as any)['_vtHostFnId'];
            finalValue = function (...args: any[]) {
                try {
                    // Synchronous call into Kotlin via ktBridge. The Kotlin side may
                    // dispatch work to server threads as needed; any return value is
                    // returned synchronously to JS if provided.
                    return (ktBridge as any).invokeHostCallback(hostId, ...args);
                } catch (e) {
                    console.error('invokeHostCallback failed for', hostId, e);
                    throw e;
                }
            }
        }
    } catch (e) {
        console.error('setAppData: failed to convert host callback marker', e);
    }
    // Assigning a property on a shallowReactive object is tracked by Vue.
    store[key] = finalValue;
}


/** Pre-loaded component registry – populated by JSEngine before createUserApp/navigateTo. */
const COMPONENT_REGISTRY = new Map<string, unknown>();
export function registerComponent(path: string, component: unknown): void {
    COMPONENT_REGISTRY.set(path, component);
}
export function getRegisteredComponent(path: string): unknown | undefined {
    return COMPONENT_REGISTRY.get(path);
}

export function removeUserApp(id: string) {
    const app = USER_APPS.get(id);
    if (app) {
        app.unmount();
        USER_APPS.delete(id);
        USER_APPS_REF.delete(id);
        USER_APPS_META.delete(id);
        USER_APPS_DATA.delete(id);
    }
}

export function createUserApp(id: string, componentPath?: string) {
    console.log("Creating user app", id, componentPath ?? '(no component)')
    flushPendingStyles();
    // Pre-create the reactive data store so useData()'s computed always finds
    // a shallowReactive object before the first render, enabling proper tracking.
    if (!USER_APPS_DATA.has(id)) {
        USER_APPS_DATA.set(id, shallowReactive<Record<string, unknown>>({}));
    }
    const pathRef = ref<string | undefined>(componentPath);
    USER_APP_COMPONENT_PATH.set(id, pathRef);
    const app = hytaleRenderer(id).createApp(AppComponent);
    app.provide("appId", id);
    app.provide("componentPathRef", pathRef);
    USER_APPS.set(id, app);

    return app
}

export function navigateTo(id: string, componentPath: string) {
    const pathRef = USER_APP_COMPONENT_PATH.get(id);
    if (pathRef) {
        pathRef.value = componentPath;
        console.log("navigateTo", id, componentPath);
    } else {
        console.warn("navigateTo: no app found with id", id);
    }
}

export function getUserApp(id: string) {
    return USER_APPS.get(id);
}

export function getUserAppRef(id: string) {
    return USER_APPS_REF.get(id);
}

export function getUserAppMeta(id: string) {
    return USER_APPS_META.get(id);
}

export function registerUserAppRef(id: string, ref: unknown) {
    const container: Record<string, unknown> = {
        _vtContainerId: id,
        getRoot: () => (ref as any).root
    };
    // Vue's reconciler writes _vnode and __vue_app__ onto the container.
    // __vue_app__ is deeply circular (contains the full app context tree).
    // Pre-defining them as non-enumerable means Javet's JavetObjectConverter
    // never traverses them, preventing "Circular structure" errors when the
    // container is passed to ktBridge.insert as the parent argument.
    Object.defineProperty(container, '_vnode', { value: null, writable: true, enumerable: false, configurable: true });
    Object.defineProperty(container, '__vue_app__', { value: null, writable: true, enumerable: false, configurable: true });
    USER_APPS_REF.set(id, container);
}

expose("_vt", {
    applyStyles,
    createUserApp,
    getUserApp,
    getUserAppRef,
    registerUserAppRef,
    removeUserApp,
    navigateTo,
    registerComponent,
    setAppData,
    getRegisteredComponent,
    USER_APPS_REF,
    USER_APPS_DATA,
})
