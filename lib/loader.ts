import { type App } from "vue";
import { hytaleRenderer } from "./renderer";
import AppComponent from './components/App.vue'

function expose<T>(name: string, value: T) {
    (globalThis as unknown as Record<string, T>)[name] = value;
}

export const USER_APPS = new Map<string, App>();

export function removeUserApp(id: string) {
    const app = USER_APPS.get(id);
    if (app) {
        app.unmount();
        USER_APPS.delete(id);
    }
}

export function createUserApp(id: string) {
    console.log("Creating user app", id)
    const app = hytaleRenderer(id).createApp(AppComponent);
    USER_APPS.set(id, app);
    app.mount({});

    return app;
}

expose("USER_APPS", USER_APPS);
expose("removeUserApp", removeUserApp);
expose("createUserApp", createUserApp);
