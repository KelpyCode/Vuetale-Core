import { type App } from "vue";
import { hytaleRenderer } from "./renderer";
import AppComponent from './components/App.vue'
import { applyStyles, flushPendingStyles } from "./styles";

function expose<T>(name: string, value: T) {
    (globalThis as unknown as Record<string, T>)[name] = value;
}

export const USER_APPS = new Map<string, App>();
export const USER_APPS_REF = new Map<string, unknown>();

export function removeUserApp(id: string) {
    const app = USER_APPS.get(id);
    if (app) {
        app.unmount();
        USER_APPS.delete(id);
        USER_APPS_REF.delete(id);
    }
}

export function createUserApp(id: string) {
    console.log("Creating user app", id)
    flushPendingStyles();
    const app = hytaleRenderer(id).createApp(AppComponent);
    app.provide("appId", id);
    USER_APPS.set(id, app);

    return app
}

export function getUserApp(id: string) {
    return USER_APPS.get(id);
}

export function getUserAppRef(id: string) {
    return USER_APPS_REF.get(id);
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
    Object.defineProperty(container, '_vnode',      { value: null, writable: true, enumerable: false, configurable: true });
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
    USER_APPS,
    USER_APPS_REF
})
