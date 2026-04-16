<script setup lang="ts">
import { Common } from './Common';
import { ref } from 'vue';
import { Core } from './Core';

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
        <Common.Container :anchor="{ Height: 800, Width: 600 }" close-button>
            <template #title>
                <Common.Title :text="someState ? 'Title example' : 'Another title'"></Common.Title>
            </template>
            <template #content>
                <Group layout-mode="Top" :flex-weight="1" :anchor="{ Full: 1 }">
                    <Label>You can also write inside tags {{ text }}</Label>
                    <Common.TextButton text="Example test" @activating="clickTest" :anchor="{ Height: 20, Top: 80 }">
                    </Common.TextButton>

                    <Core.TextField v-model="text" :anchor="{ Height: 30, Top: 50 }">
                    </Core.TextField>
                </Group>
            </template>
        </Common.Container>

    </Group>
</template>
<style>
.test {}
</style>