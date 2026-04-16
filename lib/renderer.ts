/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRenderer } from "vue"


declare const ktBridge: any;

/**
 * Wrap a raw Kotlin element proxy in a thin plain-JS holder.
 *
 * Vue's reconciler stamps internal bookkeeping directly onto host elements
 * (e.g. `el.__vnode = n2`, `el.__vue_app__ = app`).  If `el` were the raw
 * Javet proxy those assignments would trigger Javet's proxy `set` trap, which
 * tries to deeply traverse the vnode/app value and fails with
 * "Circular structure is detected with max depth 20 reached".
 *
 * By wrapping in a plain JS object, Vue's internal writes go on the wrapper
 * harmlessly, while we unwrap back to the Kotlin proxy for every `ktBridge` call.
 */
const wrapEl = (ktEl: any) => ({ _kt: ktEl })

/**
 * Sentinel returned by createText / createComment.
 *
 * Our Hytale renderer has no concept of bare text or comment nodes.
 * Returning a non-null sentinel means Vue always gets a valid handle to
 * track (preventing NPEs in its own internal bookkeeping), while the
 * `_vtText` flag lets every bridge function silently skip these nodes
 * without forwarding anything to Kotlin.
 */
const mkTextSentinel = () => ({ _vtText: true as const })

/** True when `node` is a text/comment sentinel with no Kotlin backing. */
const isTextNode = (node: any): boolean => node?._vtText === true

/**
 * Unwrap a wrapped host element back to the raw Kotlin proxy.
 * Falls back to returning the value as-is for the Vue mount container
 * (`{_vtContainerId, …}`) and null/undefined text-node placeholders.
 */
const unwrap = (el: any): any => el?._kt ?? el

export const hytaleRenderer = (appId: string) => createRenderer({
    createElement: (tag: string) => {
        return wrapEl(ktBridge.createElement(appId, tag))
    },

    // Text / comment nodes have no Kotlin equivalent.
    // Return a sentinel so Vue has a non-null handle; all bridge functions
    // that receive a node check isTextNode and bail out early.
    createText: (_text: string) => mkTextSentinel(),
    createComment: (_text: string) => mkTextSentinel(),

    setText: (node: any, text: string) => {
        if (isTextNode(node)) return
        return ktBridge.setText(appId, unwrap(node), text)
    },
    setElementText: (el: any, text: string) => {
        if (isTextNode(el)) return
        return ktBridge.setElementText(appId, unwrap(el), text)
    },
    parentNode: (node: any) => {
        if (isTextNode(node)) return null
        return ktBridge.parentNode(appId, unwrap(node))
    },
    nextSibling: (node: any) => {
        if (isTextNode(node)) return null
        return ktBridge.nextSibling(appId, unwrap(node))
    },
    insert: (child: any, parent: any) => {
        if (isTextNode(child)) return  // nothing to insert for text/comment sentinels
        ktBridge.insert(appId, unwrap(child), unwrap(parent))
    },
    remove: (child: any) => {
        if (isTextNode(child)) return  // nothing to remove for text/comment sentinels
        ktBridge.remove(appId, unwrap(child))
    },
    patchProp: (el: any, key: string, prevValue: any, nextValue: any) => {
        ktBridge.patchProp(appId, unwrap(el), key, prevValue, nextValue)
    }
})
