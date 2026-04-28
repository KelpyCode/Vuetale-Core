<script setup lang="ts">
import { Common } from '@/components/Common';
import { Core } from '@/components/core';
import { computed, ref } from 'vue';
import { useData } from '../composables/useData';
console.log("WORKS!")

const testFn = useData("testFn", () => { })
const testFn2 = useData("testFn2", (a: number, b: string) => { })


function clickTest() {
    console.log("CLICKED ME")
    someState.value = !someState.value
    testFn.value()
    console.log("Return of testFn2: ", testFn2.value(123, "hello"))
}


const someState = ref(false)
const text = ref("nothing yet")

const test = useData<string>("test")
const test2 = useData("test2")
const test3 = useData("counter")


interface TestEntry {
    name: string
    toggle: boolean
}

const testEntries = ref<TestEntry[]>([]);

function addEntry() {
    testEntries.value.push({ name: `Entry ${testEntries.value.length + 1}`, toggle: false });
}

function removeEntry(index: number) {
    testEntries.value.splice(index, 1);
}

function moveEntryUp(index: number) {
    if (index > 0) {
        const temp = testEntries.value[index]!;
        testEntries.value[index] = testEntries.value[index - 1]!;
        testEntries.value[index - 1] = temp;
    }
}

</script>
<template>
    <Group :anchor="{ Full: 1, Left: 0, Right: 0 }">
        <Common.Container :anchor="{ Height: 800, Width: 600 }" :close-button="true">
            <template #title>
                <Common.Title class="" :text="someState ? 'Title example' : 'Anotherx title'"></Common.Title>
            </template>
            <template #content>
                <Group layout-mode="Top" :flex-weight="1" :anchor="{ Full: 1 }" :background="{ Color: '#444444' }">
                    <Group>
                        <Label> {{ text }} | {{ test }} {{ test2?.a }} {{ test3 }}</Label>
                    </Group>
                    <TextField></TextField>
                    <Common.TextButton text="Example test" @activating="clickTest" :anchor="{ Height: 20, Top: 80 }">
                    </Common.TextButton>

                    <Core.TextField v-if="someState" :decoration="{ Default: {} }" v-model="text"
                        :anchor="{ Height: 120, Top: 10, Width: 200 }">
                    </Core.TextField>

                    <Group layout-mode="TopScrolling">

                        <Group v-for="(entry, index) in testEntries" :key="index" :anchor="{ Height: 200 }">
                            <Label>{{ entry.name }}</Label>
                            <Core.TextField v-model="entry.name"></Core.TextField>
                            <Common.TextButton text="Remove" @activating="() => removeEntry(index)"
                                :anchor="{ Height: 20, Top: 5, Left: 100 }"></Common.TextButton>
                            <Common.TextButton text="Up" @activating="() => moveEntryUp(index)"
                                :anchor="{ Height: 20, Top: 5, Left: 160 }"></Common.TextButton>
                        </Group>

                        <Common.TextButton text="Add Entry" @activating="addEntry" :anchor="{ Height: 20, Top: 10 }">
                        </Common.TextButton>
                    </Group>
                </Group>

            </template>
        </Common.Container>

    </Group>
</template>
<style>
.test {}
</style>
