<script setup lang="ts">
interface Props {
    style: number
}

const props = defineProps<Props>()

console.log("Test component")

</script>
<template>
    <Group :anchor="{ Full: 0 }" class="example-class2">
        <Label text="abc fsdfsd123!">
        </Label>
    </Group>
</template>

<style>
@import "../assets/test.css";

.example-class {
    color: red;
    anchor-left: 12;
    anchor-right: 400;
    padding: 20px;
    my-render-target-color: 12;

}
</style>