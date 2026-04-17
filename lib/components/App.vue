<script setup lang="ts">
import ErrorBoundary from './ErrorBoundary.vue';
import TestPage from '@/pages/TestPage.vue';


</script>
<template>
    <ErrorBoundary>
        <Group>
            <Label>Hi</Label>
        </Group>
        <TestPage />
    </ErrorBoundary>
</template>
<style>
.test {}
</style>