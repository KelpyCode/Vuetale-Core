/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRenderer } from "vue"


declare const ktBridge: any;

export const hytaleRenderer = (appId: string) => createRenderer({
    createElement: (tag: string) => {
        console.log(`createElement: ${tag}`)
        ktBridge.createElement(appId, tag)
        return { tag }
    },
    createText: (text: string) => {
        console.log(`createText: ${text}`)
        ktBridge.createText(appId, text)
        return { text }
    },
    createComment: (text: string) => {
        console.log(`createComment: ${text}`)
        ktBridge.createComment(appId, text)
        return { text }
    },
    setText: (node: any, text: string) => {
        console.log(`setText: ${text}`, JSON.stringify(node, null, 2))
        ktBridge.setText(appId, node, text)
        node.text = text
    },
    setElementText: (el: any, text: string) => {
        console.log(`setElementText: ${text}`, JSON.stringify(el, null, 2))
        ktBridge.setElementText(appId, el, text)
        el.children = text
    },
    parentNode: (node: any) => {
        console.log(`parentNode`, JSON.stringify(node, null, 2))
        ktBridge.parentNode(appId, node)
        return node.parent
    },
    nextSibling: (node: any) => {
        console.log(`nextSibling`, JSON.stringify(node, null, 2))
        ktBridge.nextSibling(appId, node)

        return node.next
    },
    insert: (child: any, parent: any) => {
        console.log(`insert`, JSON.stringify(child, null, 2), JSON.stringify(parent, null, 2))
        ktBridge.insert(appId, child, parent)
        if (parent) parent.children = child
    },
    remove: (child: any) => {
        console.log(`remove`, JSON.stringify(child, null, 2))
        ktBridge.remove(appId, child)
        if (child.parent) delete child.parent.children
    },
    patchProp: (el: any, key: string, prevValue: any, nextValue: any) => {
        console.log(`patchProp: ${key}`, prevValue, nextValue)
        ktBridge.patchProp(appId, el, key, prevValue, nextValue)
        el[key] = nextValue
    }
})