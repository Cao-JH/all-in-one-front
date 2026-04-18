<template>
  <!-- <section id="book-content">
    <article v-for="book in bookList" :key="book.id">
      <BookCard :book="book" />
    </article>
  </section> -->

  <div class="max-w-[1200px] mx-auto">
    <DataView :value="bookList" :layout="viewMode">
      <template #list>
        <div class="flex flex-col">
          <article v-for="(book, i) in bookList" :key="i">
            <BookCard :book="book" :viewMode="viewMode" />
          </article>
        </div>
      </template>

      <template #grid>
        <div class="grid grid-cols-12 gap-2">
          <article
            v-for="(book, i) in bookList"
            :key="i"
            class="w-full max-w-[200px] col-span-12 col-span-4 sm:col-span-3 lg:col-span-2"
          >
            <BookCard :book="book" :viewMode="viewMode" />
          </article>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { BookItem } from '@/types/book'
import BookCard from './components/bookCard.vue'

const props = defineProps<{
  group?: string
  viewMode: 'grid' | 'list'
}>()

const bookList: BookItem[] = [
  {
    id: 1,
    title: '百年孤独',
    progress: '阅读进度 62%',
    palette: 'linear-gradient(160deg, #f4efe6 0%, #d7c3a5 48%, #9f7b56 100%)',
  },
  {
    id: 2,
    title: '局外人',
    progress: '阅读进度 18%',
    palette: 'linear-gradient(160deg, #e9eef5 0%, #a8b7cc 52%, #61748d 100%)',
  },
  {
    id: 3,
    title: '悉达多',
    progress: '阅读进度 84%',
    palette: 'linear-gradient(160deg, #f6e9d7 0%, #d8a96c 50%, #8a5a2f 100%)',
  },
  {
    id: 4,
    title: '月亮与六便士',
    progress: '阅读进度 41%',
    palette: 'linear-gradient(160deg, #ece9f8 0%, #b7addd 52%, #665e99 100%)',
  },
  {
    id: 5,
    title: '人类群星闪耀时',
    progress: '阅读进度 27%',
    palette: 'linear-gradient(160deg, #f2ece4 0%, #cfbea8 50%, #786351 100%)',
  },
  {
    id: 6,
    title: '挪威的森林',
    progress: '阅读进度 73%',
    palette: 'linear-gradient(160deg, #ddeee4 0%, #88b89b 54%, #365a43 100%)',
  },
  {
    id: 6,
    title: '挪威的森林',
    progress: '阅读进度 73%',
    palette: 'linear-gradient(160deg, #ddeee4 0%, #88b89b 54%, #365a43 100%)',
  },
  {
    id: 6,
    title: '挪威的森林',
    progress: '阅读进度 73%',
    palette: 'linear-gradient(160deg, #ddeee4 0%, #88b89b 54%, #365a43 100%)',
  },
  {
    id: 6,
    title: '挪威的森林',
    progress: '阅读进度 73%',
    palette: 'linear-gradient(160deg, #ddeee4 0%, #88b89b 54%, #365a43 100%)',
  },
  {
    id: 6,
    title: '挪威的森林',
    progress: '阅读进度 73%',
    palette: 'linear-gradient(160deg, #ddeee4 0%, #88b89b 54%, #365a43 100%)',
  },
  {
    id: 6,
    title: '挪威的森林',
    progress: '阅读进度 73%',
    palette: 'linear-gradient(160deg, #ddeee4 0%, #88b89b 54%, #365a43 100%)',
  },
  {
    id: 6,
    title: '挪威的森林',
    progress: '阅读进度 73%',
    palette: 'linear-gradient(160deg, #ddeee4 0%, #88b89b 54%, #365a43 100%)',
  },
  {
    id: 6,
    title: '挪威的森林',
    progress: '阅读进度 73%',
    palette: 'linear-gradient(160deg, #ddeee4 0%, #88b89b 54%, #365a43 100%)',
  },
]
</script>

<style lang="scss" scoped>
#book-content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 1rem;
  align-content: start;
  width: 100%;
  margin: 0 auto;
}
</style>
