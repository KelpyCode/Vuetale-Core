import { type App, ref } from "vue";
import { hytaleRenderer } from "./renderer";
import AppComponent from './components/App.vue'
import { applyStyles, flushPendingStyles } from "./styles";

function expose<T>(name: string, value: T) {
    (globalThis as unknown as Record<string, T>)[name] = value;
}

interface VuetaleMeta {
    props: Record<string, unknown>;
}

export const USER_APPS = new Map<string, App>();
export const USER_APPS_REF = new Map<string, unknown>();
export const USER_APPS_META = new Map<string, VuetaleMeta>();
/** Reactive component-path refs keyed by app id, so navigateTo can swap without remounting. */
const USER_APP_COMPONENT_PATH = new Map<string, ReturnType<typeof ref<string | undefined>>>();

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
    }
}

export function createUserApp(id: string, componentPath?: string) {
    console.log("Creating user app", id, componentPath ?? '(no component)')
    flushPendingStyles();
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
    getRegisteredComponent,
    USER_APPS,
    USER_APPS_REF
})
