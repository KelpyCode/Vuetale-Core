/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRenderer } from "vue"

export const hytaleRenderer = createRenderer({
    createElement: (tag: string) => ({ tag }),
    createText: (text: string) => ({ text }),
    createComment: (text: string) => ({ text }),
    setText: (node: any, text: string) => {
        node.text = text
    },
    setElementText: (el: any, text: string) => {
        el.children = text
    },
    parentNode: (node: any) => node.parent,
    nextSibling: (node: any) => node.next,
    insert: (child: any, parent: any) => {
        if (parent) parent.children = child
    },
    remove: (child: any) => {
        if (child.parent) delete child.parent.children
    },
    patchProp: (el: any, key: string, prevValue: any, nextValue: any) => {
        el[key] = nextValue
    }
})