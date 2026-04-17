<script setup lang="ts">
import { computed, nextTick, ref, useAttrs } from 'vue';
import { Common } from '../Common';
import type { NATIVE } from '@/types/global';
import { useForwardedBindings } from '@/composables/useForwardedBindings';

defineOptions({
    inheritAttrs: false,
})

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

const { forwardedBindings } = useForwardedBindings(
    props as Record<string, unknown>,
    attrs,
    { exclude: ['modelValue', 'value'] },
)

const ignoreUpdate = ref(false)

function onValueChanged(event: string) {
    ignoreUpdate.value = true
    value.value = event
    nextTick(() => {
        ignoreUpdate.value = false
    })
}



</script>

<template>
    <Group :anchor="{ Top: 40 }">
        <Label>TEST</Label>
        <Common.TextField v-bind="forwardedBindings" @valuechanged="onValueChanged" :value="value"
            :vt-skip-update="ignoreUpdate">
        </Common.TextField>
    </Group>
</template>