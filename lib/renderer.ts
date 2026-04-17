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

/**
 * Set a hidden (non-enumerable) property on obj.
 * Non-enumerable properties are invisible to Javet's JavetObjectConverter,
 * which iterates via forEach/memberKeys – so _vtParent/_vtChildren never
 * trigger the "Circular structure detected" error even though they form cycles.
 */
const setHidden = (obj: any, key: string, value: any) => {
    Object.defineProperty(obj, key, { value, writable: true, enumerable: false, configurable: true })
}

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
        if (node == null) return null
        // Return the virtual parent recorded during insert()
        return node._vtParent ?? null
    },
    nextSibling: (node: any) => {
        if (node == null) return null
        const parent = node._vtParent
        if (!parent?._vtChildren) return null
        const idx = parent._vtChildren.indexOf(node)
        if (idx < 0) return null
        return parent._vtChildren[idx + 1] ?? null
    },
    insert: (child: any, parent: any, anchor?: any) => {
        // Maintain an ordered virtual-children list on the parent.
        // _vtParent and _vtChildren are non-enumerable so Javet's converter
        // never traverses them (prevents "Circular structure" errors).
        if (!parent._vtChildren) setHidden(parent, '_vtChildren', [])
        setHidden(child, '_vtParent', parent)
        // Remove from current position first in case this is a move.
        const existing = parent._vtChildren.indexOf(child)
        if (existing >= 0) parent._vtChildren.splice(existing, 1)
        if (anchor == null) {
            parent._vtChildren.push(child)
        } else {
            const anchorIdx = parent._vtChildren.indexOf(anchor)
            if (anchorIdx >= 0) {
                parent._vtChildren.splice(anchorIdx, 0, child)
            } else {
                parent._vtChildren.push(child)
            }
        }

        if (isTextNode(child)) return  // nothing to insert for text/comment sentinels
        ktBridge.insert(appId, unwrap(child), unwrap(parent))
    },
    remove: (child: any) => {
        if (child == null) return
        // Remove from virtual children list
        const parent = child._vtParent
        if (parent?._vtChildren) {
            const idx = parent._vtChildren.indexOf(child)
            if (idx >= 0) parent._vtChildren.splice(idx, 1)
        }
        if (isTextNode(child)) return  // nothing to remove for text/comment sentinels
        const kt = unwrap(child)
        if (kt == null) return
        ktBridge.remove(appId, kt)
    },
    patchProp: (el: any, key: string, prevValue: any, nextValue: any) => {
        ktBridge.patchProp(appId, unwrap(el), key, prevValue, nextValue)
    }
})
