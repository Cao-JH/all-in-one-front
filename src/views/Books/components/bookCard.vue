<template>
  <div id="book-card">
    <div v-if="props.displayMethod === 'grid'" class="hover:bg-(--p-surface-100) rounded-md cursor-pointer p-2">
      <div class="book-cover aspect-2/3">
        <img v-if="book.cover" :src="book.cover" :alt="book.bookName" class="w-full h-full object-cover rounded-md" />
        <div v-else class="no-cover w-full h-full object-cover bg-(--p-surface-200) relative rounded-md">
          <h3
            class="vertical-text absolute bottom-2 left-2 max-w-7/10 text-xl text-(--p-surface-800) leading-6 font-semibold text-end">
            {{ book.bookName }}
          </h3>
        </div>
      </div>
      <div class="book-info flex flex-col mt-2 px-2">
        <div class="book-bookName text-sm leading-5 line-clamp-1">{{ book.bookName }}</div>
        <div class="book-progress text-xs leading-4 mt-1 text-(--p-text-muted-color)">
          {{ book.progress || book.author || book.bookSourceName || 'No progress' }}
        </div>
      </div>
    </div>

    <div v-else class="flex flex-row xl:items-start p-2 gap-4 hover:bg-(--p-surface-100) rounded-md cursor-pointer">
      <div class="w-[72px] sm:w-[88px] lg:w-[94px] aspect-2/3 bg-(--p-surface-700) mx-auto rounded-md">
        <img v-if="book.cover" :src="book.cover" :alt="book.bookName" class="w-full h-full object-cover rounded-md" />
        <div v-else class="no-cover w-full h-full object-cover bg-(--p-surface-200) relative rounded-md">
          <h3
            class="vertical-text absolute bottom-2 left-2 max-w-7/10 text-xl text-(--p-surface-800) leading-6 font-semibold text-end">
            {{ book.bookName }}
          </h3>
        </div>
      </div>
      <div class="flex flex-row justify-between items-center xl:items-start flex-1 gap-6">
        <div class="flex flex-col items-center sm:items-start py-2 gap-2">
          <div class="font-semibold leading-5 line-clamp-1">
            {{ book.bookName }}
          </div>
          <div class="text-sm text-(--p-text-muted-color) leading-4 line-clamp-1">
            {{ book.author || '-' }}
          </div>
          <div v-if="book.bookSourceName" class="text-sm leading-4 text-(--p-text-muted-color) line-clamp-1">
            {{ book.bookSourceName }}
          </div>
          <div v-if="book.currentChapter" class="text-sm leading-4 text-(--p-text-muted-color) line-clamp-1">
            当前: {{ book.currentChapter }}
          </div>
          <div v-if="book.lastChapter" class="text-sm leading-4 text-(--p-text-muted-color) line-clamp-1">
            最新: {{ book.lastChapter }}
          </div>
          <div v-if="book.intro || book.progress"
            class="text-xs leading-4 text-(--p-text-muted-color) mt-1 line-clamp-2">
            {{ book.intro || book.progress }}
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
