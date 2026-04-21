<script setup lang="ts">
import { inject, shallowRef, watch, type Component, type Ref } from 'vue';
import ErrorBoundary from './ErrorBoundary.vue';

const appId = inject<string>('appId')!;
const componentPathRef = inject<Ref<string | undefined>>('componentPathRef');

const ActiveComponent = shallowRef<Component | null>(null);

function loadAndSet(path: string) {
  // JSEngine pre-loads the module via a static import wrapper and registers it
  // in _vt.COMPONENT_REGISTRY before createUserApp/navigateTo is called,
  // bypassing dynamic import() which is unsupported in Javet's Node.js runtime.
  const cached = (globalThis as any)._vt?.getRegisteredComponent?.(path);
  if (cached) {
    console.log(`[Vuetale] Loading component "${path}" from registry`);
    ActiveComponent.value = cached as Component;
  } else {
    console.error(`[Vuetale] Component "${path}" was not pre-loaded. Call JSEngine.preloadComponent() before navigating.`);
  }
}

if (componentPathRef) {
  if (componentPathRef.value) {
    loadAndSet(componentPathRef.value);
  }
  watch(componentPathRef, (path) => {
    if (path) loadAndSet(path);
    else ActiveComponent.value = null;
  });
}
</script>
<template>
  <ErrorBoundary>
    <component :is="ActiveComponent" v-if="ActiveComponent" />
  </ErrorBoundary>
</template>
<style>
.test {}
</style>
