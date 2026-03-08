<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string
    size?: number | string
  }>(),
  {
    size: 18,
  }
)
</script>

<template>
  <svg class="app-svg-icon" aria-hidden="true" :style="{ width: `${size}px`, height: `${size}px` }">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<style scoped>
.app-svg-icon {
  display: inline-block;
  fill: currentColor;
  flex-shrink: 0;
  vertical-align: middle;
}
</style>
