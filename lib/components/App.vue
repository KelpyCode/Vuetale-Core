<script setup lang="ts">
import Test from './Test.vue';
import { Common } from './Common';


console.log("WORKS!")

function clickTest() {
    console.log("CLICKED ME")
}

</script>
<template>
    <div>
        <Test @click="clickTest"></Test>
        <Common.BackButton :anchor="{ Bottom: 123 }"></Common.BackButton>
    </div>
</template>