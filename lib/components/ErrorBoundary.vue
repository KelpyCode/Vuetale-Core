<template>
    <slot v-if="!error" /> <!-- Normal content: your risky component -->

    <Group v-else> <!-- Fallback UI when error occurs -->
        <Label>Something went wrong in this section.</Label>
        <Label v-if="error">{{ error.message }}</Label>
        <Common.TextButton @activating="reset" text="Try again"></Common.TextButton>
    </Group>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onErrorCaptured, ref } from 'vue'
import { Common } from './Common'

const error = ref<Error | null>(null)

// Prevent onErrorCaptured from firing a reactive re-render while the component
// tree is being torn down.  During app unmount, custom-renderer operations can
// throw, which would cause ErrorBoundary to try to mount its fallback <Group>
// in the middle of the destroy pass – creating stale elements and corrupting state.
let isUnmounting = false
onBeforeUnmount(() => { isUnmounting = true })

const reset = () => {
    error.value = null
}

onErrorCaptured((err) => {
    if (isUnmounting) return false  // Silent drop – don't re-render during teardown
    error.value = err
    console.error('Component error caught by boundary:', err)
    return false
})
</script>
