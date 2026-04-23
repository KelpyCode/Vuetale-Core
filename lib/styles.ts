/* eslint-disable @typescript-eslint/no-explicit-any */


type StyleTree = Record<string, unknown>;

declare global {
    interface Window {
        __vt_applyStyles__?: (styles: StyleTree, key?: string) => void;
        __vt_pendingStyles__?: Array<[string | undefined, StyleTree]>;
        ktBridge?: {
            registerStyles?: (key: string, styles: StyleTree) => void;
            applyStyles?: (key: string, styles: StyleTree) => void;
            registerCss?: (key: string, styles: StyleTree) => void;
        };
    }
}


const APPLIED_STYLE_KEYS = new Set<string>();

function getStyleKey(styles: StyleTree, key?: string): string {
    if (key) return key;
    return JSON.stringify(styles);
}

function pushToBridge(styleKey: string, styles: StyleTree) {
    const bridge = (globalThis as any).ktBridge;
    if (!bridge) return;

    if (typeof bridge.registerStyles === "function") {
        bridge.registerStyles(styleKey, styles);
        return;
    }
}

export function applyStyles(styles: StyleTree, key?: string) {
    const styleKey = getStyleKey(styles, key);
    console.log("Applying styles with key:", styleKey, "and styles:", styles);
    if (APPLIED_STYLE_KEYS.has(styleKey)) {
        return;
    }

    APPLIED_STYLE_KEYS.add(styleKey);
    pushToBridge(styleKey, styles);
}

export function flushPendingStyles() {
    const pending = (globalThis as any).__vt_pendingStyles__ as Array<[string | undefined, StyleTree]> | undefined;
    if (!pending || pending.length === 0) {
        return;
    }

    for (const [key, styles] of pending) {
        applyStyles(styles, key);
    }

    (globalThis as any).__vt_pendingStyles__ = [];
}

(globalThis as any).__vt_applyStyles__ = applyStyles;