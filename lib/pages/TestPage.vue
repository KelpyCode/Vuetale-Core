<script setup lang="ts">
import { Common } from '@/components/Common';
import { Core } from '@/components/Core';
import { ref } from 'vue';
console.log("WORKS!")

function clickTest() {
    console.log("CLICKED ME")
    someState.value = !someState.value
}


const someState = ref(false)
const text = ref("nothing yet")

</script>
<template>
    <Group :anchor="{ Full: 1, Left: 0, Right: 0 }">
        <Common.Container :anchor="{ Height: 800, Width: 600 }" :close-button="true">
            <template #title>
                <Common.Title class="" :text="someState ? 'Title example' : 'Anotherx title'"></Common.Title>
            </template>
            <template #content>
                <Group layout-mode="Top" :flex-weight="1" :anchor="{ Full: 1 }">
                    <Group>

                        <Label>abcd {{ text }}</Label>
                    </Group>
                    <Common.TextButton text="Example test" @activating="clickTest" :anchor="{ Height: 20, Top: 80 }">
                    </Common.TextButton>

                    <Core.TextField v-if="someState" v-model="text" :anchor="{ Height: 120, Top: 10, Width: 200 }">
                    </Core.TextField>
                </Group>
            </template>
        </Common.Container>

    </Group>
</template>
<style>
.test {}
</style>
