interface VuetaleBridge {
    sendMessage(id: string, message: string): void
}

declare const bridge: VuetaleBridge
declare let USER_APPS: Map<string, import("vue").App>
declare function removeUserApp(id: string): void