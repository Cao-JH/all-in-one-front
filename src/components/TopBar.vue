<template>
  <div class="flex items-center justify-between mb-6">
    <div>
      <h1 class="text-2xl font-semibold text-[var(--text-primary)]">
        My Bookshelf
      </h1>
      <p class="text-sm text-[var(--text-secondary)]">
        You have {{ count }} books in your library
      </p>
    </div>

    <button class="
        px-4 py-2 rounded-lg
        bg-black text-white text-sm
        hover:opacity-90
      ">
      + Import Book
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps<{ count: number }>()
</script>
