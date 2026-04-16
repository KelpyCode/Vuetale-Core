<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { Common } from '../Common';
import type { NATIVE } from '@/types/global';

type Props = NATIVE['TextField'] & {
    modelValue?: string
}

const props = defineProps<Props>()

const attrs = useAttrs()

const emit = defineEmits(['update:modelValue'])

const value = computed({
    get() {
        return props.modelValue
    },
    set(val: string) {
        emit('update:modelValue', val)
    }
})

</script>

<template>
    <Group :anchor="{ Top: 40 }">
        <Label>TEST</Label>
        <Common.TextField v-bind="{ ...attrs }" @valuechanged="value = $event"></Common.TextField>
    </Group>
</template>