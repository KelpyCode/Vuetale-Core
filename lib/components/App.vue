<script setup lang="ts">
import Test from './Test.vue';


console.log("WORKS!")

function clickTest() {
    console.log("CLICKED ME")
}
</script>
<template>
    <div>
        <Test @click="clickTest"></Test>
    </div>
</template>