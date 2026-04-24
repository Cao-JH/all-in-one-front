<template>
  <div id="book-card">
    <div v-if="props.displayMethod === 'grid'" class="hover:bg-(--p-surface-100) rounded-md cursor-pointer p-2">
      <div class="book-cover aspect-2/3">
        <img v-if="book.cover" :src="book.cover" :alt="book.title" class="w-full h-full object-cover rounded-md" />
        <div v-else class="no-cover w-full h-full object-cover bg-(--p-surface-200) relative rounded-md">
          <h3
            class="vertical-text absolute bottom-2 left-2 max-w-7/10 text-xl text-(--p-surface-800) leading-6 font-semibold text-end">
            {{ book.title }}
          </h3>
        </div>
      </div>
      <div class="book-info flex flex-col mt-2 px-2">
        <div class="book-title text-sm leading-5">{{ book.title }}</div>
        <div class="book-progress text-xs leading-4 mt-1 text-(--p-text-muted-color)">
          {{ book.progress }}
        </div>
      </div>
    </div>

    <div v-else class="flex flex-row xl:items-start p-2 gap-4 hover:bg-(--p-surface-100) rounded-md cursor-pointer">
      <div class="w-[72px] sm:w-[88px] lg:w-[94px] aspect-2/3 bg-(--p-surface-700) mx-auto rounded-md" />
      <div class="flex flex-row justify-between items-center xl:items-start flex-1 gap-6">
        <div class="flex flex-col items-center sm:items-start py-2 gap-2">
          <div class="font-semibold leading-5 line-clamp-1">
            {{ book.title }}
          </div>
          <div class="text-sm text-(--p-text-muted-color) leading-2">111</div>
          <div class="text-sm leading-4 text-(--p-text-muted-color)">
            <span>当前：</span>
          </div>
          <div class="text-sm leading-4 text-(--p-text-muted-color)">
            <span>最新：</span>
          </div>
          <div class="text-xs leading-4 text-(--p-text-muted-color) mt-1">
            {{ book.progress }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BookItem } from '@/types/book'

const props = defineProps<{
  book: BookItem
  displayMethod: 'grid' | 'list'
}>()

const getCoverStyle = (book: BookItem) => {
  if (book.cover) return undefined

  return {
    background: book.palette,
  }
}
</script>

<style scoped lang="scss">
#book-card {
  .vertical-text {
    writing-mode: vertical-rl;
    text-orientation: upright;
    letter-spacing: 4px;
  }

  .no-cover::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.25), transparent);
    border-radius: 6px;
  }
}
</style>
