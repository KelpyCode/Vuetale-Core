import { type App } from "vue";
import { hytaleRenderer } from "./renderer";
import AppComponent from './components/App.vue'

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
    USER_APPS_REF.set(id, ref);
}

expose("_vt", {
    createUserApp,
    getUserApp,
    getUserAppRef,
    removeUserApp,
    USER_APPS,
    USER_APPS_REF
})
