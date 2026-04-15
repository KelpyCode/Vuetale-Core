<script setup lang="ts">
import Test from './Test.vue';
import { Common } from './Common';


console.log("WORKS!")

function clickTest() {
    console.log("CLICKED ME")
}

</script>
<template>
    <Group :anchor="{ Full: 1, Left: 0, Right: 0 }">
        <Test @click="clickTest"></Test>
        <TextField :placeholder-style="{}"></TextField>
        <Common.PageOverlay>
        </Common.PageOverlay>
        <!-- <Common.BackButton :anchor="{ Bottom: 123 }"></Common.BackButton> -->
    </Group>
</template>
<style>
.test {}
</style>