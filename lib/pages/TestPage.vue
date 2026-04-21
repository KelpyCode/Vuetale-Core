<script setup lang="ts">
import { Common } from '@/components/Common';
import { Core } from '@/components/core';
import { ref } from 'vue';
import { useData } from '../composables/useData';
console.log("WORKS!")

function clickTest() {
    console.log("CLICKED ME")
    someState.value = !someState.value
}


const someState = ref(false)
const text = ref("nothing yet")

const test = useData<string>("test")
const test2 = useData("test2")
const test3 = useData("counter")

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
                        <Label>dd {{ text }} | {{ test }} {{ test2?.a }} {{ test3 }}</Label>
                    </Group>
                    <TextField></TextField>
                    <Common.TextButton text="Example test" @activating="clickTest" :anchor="{ Height: 20, Top: 80 }">
                    </Common.TextButton>

                    <Core.TextField v-if="someState" :decoration="{ Default: {} }" v-model="text"
                        :anchor="{ Height: 120, Top: 10, Width: 200 }">
                    </Core.TextField>
                </Group>
            </template>
        </Common.Container>

    </Group>
</template>
<style>
.test {}
</style>
