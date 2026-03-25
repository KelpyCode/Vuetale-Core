/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRenderer } from "vue"


declare const ktBridge: any;

export const hytaleRenderer = (appId: string) => createRenderer({
    createElement: (tag: string) => {
        // console.log(`createElement: ${tag}`)
        return ktBridge.createElement(appId, tag)
    },
    createText: (text: string) => {
        // console.log(`createText: ${text}`)
        return ktBridge.createText(appId, text)
    },
    createComment: (text: string) => {
        // console.log(`createComment: ${text}`)
        return ktBridge.createComment(appId, text)
    },
    setText: (node: any, text: string) => {
        // console.log(`setText: ${text}`, JSON.stringify(node, null, 2))
        return ktBridge.setText(appId, node, text)
    },
    setElementText: (el: any, text: string) => {
        // console.log(`setElementText: ${text}`, JSON.stringify(el, null, 2))
        return ktBridge.setElementText(appId, el, text)
    },
    parentNode: (node: any) => {
        // console.log(`parentNode`, JSON.stringify(node, null, 2))
        return ktBridge.parentNode(appId, node)
    },
    nextSibling: (node: any) => {
        // console.log(`nextSibling`, JSON.stringify(node, null, 2))
        return ktBridge.nextSibling(appId, node)


    },
    insert: (child: any, parent: any) => {
        // console.log(`insert`, JSON.stringify(child, null, 2), JSON.stringify(parent, null, 2))
        ktBridge.insert(appId, child, parent)
    },
    remove: (child: any) => {
        // console.log(`remove`, JSON.stringify(child, null, 2))
        ktBridge.remove(appId, child)
    },
    patchProp: (el: any, key: string, prevValue: any, nextValue: any) => {
        // console.log(`patchProp: ${key}`, prevValue, nextValue)
        // console.log(`patchPropJson: ${key}`, JSON.stringify(prevValue, null, 2), JSON.stringify(nextValue, null, 2))
        ktBridge.patchProp(appId, el, key, prevValue, nextValue)
    }
})