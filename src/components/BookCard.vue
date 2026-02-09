<template>
  <div class="
      group cursor-pointer
      rounded-xl bg-[var(--bg-card)]
      transition-all duration-200
      hover:-translate-y-1 hover:shadow-xl
    " :class="sizeClass">
    <!-- Cover -->
    <div class="rounded-xl overflow-hidden flex items-center justify-center" :class="coverClass">
      <img v-if="cover" :src="cover" class="w-full h-full object-cover" />
      <span v-else class="text-sm text-[var(--text-secondary)]">
        {{ placeholder }}
      </span>
    </div>

    <!-- Info -->
    <div class="mt-2 px-1">
      <div class="text-sm font-medium truncate
               text-[var(--text-primary)]">
        {{ title }}
      </div>
      <div class="text-xs mt-0.5
               text-[var(--text-secondary)]">
        Read {{ read }} / {{ total }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  cover?: string
  read: number
  total: number
  placeholder?: string
  size?: 'desktop' | 'mobile'
}>()

const sizeClass = {
  desktop: 'w-[180px]',
  mobile: 'w-[140px]'
}

const coverClass = {
  desktop: 'h-[220px]',
  mobile: 'h-[180px]'
}
</script>
