<template>
  <div class="max-w-[1200px] mx-auto">
    <ScrollPanel class="scroll-panel">
      <DataView :value="bookList" :layout="props.displayMethod">
        <template #list>
          <div class="flex flex-col">
            <article v-for="(book, i) in bookList" :key="i">
              <BookCard :book="book" :displayMethod="props.displayMethod" class="cursor-pointer"
                @click="openBookReader(book.id)" />
            </article>
          </div>
        </template>

        <template #grid>
          <div class="grid grid-cols-12 gap-2">
            <article v-for="(book, i) in bookList" :key="i"
              class="w-full max-w-[200px] col-span-4 sm:col-span-3 lg:col-span-2">
              <BookCard :book="book" :displayMethod="props.displayMethod" class="cursor-pointer"
                @click="openBookReader(book.id)" />
            </article>
          </div>
        </template>
      </DataView>
    </ScrollPanel>
  </div>
</template>

<script setup lang="ts">
import type { BookItem } from '@/types/book'
import { useRouter } from 'vue-router'
import BookCard from './components/bookCard.vue'

const props = defineProps<{
  group?: string
  displayMethod: 'grid' | 'list'
}>()

const router = useRouter()

const openBookReader = (bookId: string | number) => {
  router.push({
    name: 'BooksReader',
    params: {
      bookId: String(bookId),
    },
  })
}

const bookList: BookItem[] = []
</script>

<style lang="scss" scoped>
.scroll-panel {
  height: calc(100vh - 9rem);
}
</style>
