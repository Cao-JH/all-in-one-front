<template>
  <section id="book-search-list" class="h-full flex flex-col gap-4">
    <header class="search-header">
      <Button icon="pi pi-angle-left" severity="secondary" size="small" @click="goBack" />
      <IconField class="flex-1 min-w-0">
        <InputIcon class="pi pi-search" />
        <InputText
          v-model="searchKeyword"
          type="text"
          size="small"
          placeholder="搜索书名、作者"
          class="h-8 w-full"
          @keyup.enter="startSearch"
        />
      </IconField>
      <Button
        icon="pi pi-search"
        label="搜索"
        size="small"
        :loading="isSearching"
        :disabled="!trimmedKeyword"
        @click="startSearch"
      />
    </header>

    <div class="result-summary">
      <div>
        <h2 class="text-lg font-semibold leading-6">搜索结果</h2>
        <p class="text-sm text-(--p-text-muted-color) leading-5">
          {{ summaryText }}
        </p>
      </div>
      <ProgressSpinner
        v-if="isSearching"
        class="search-spinner"
        strokeWidth="4"
        animationDuration=".8s"
      />
    </div>

    <ScrollPanel class="result-scroll">
      <TransitionGroup name="result-list" tag="div" class="flex flex-col gap-2">
        <article v-for="book in bookList" :key="book.id" class="result-item">
          <BookCard :book="book" displayMethod="list" @click="openBook(book)" />
        </article>
      </TransitionGroup>

      <div v-if="!isSearching && bookList.length === 0" class="empty-state">
        <i class="pi pi-search text-2xl text-(--p-text-muted-color)"></i>
        <span>{{ emptyText }}</span>
      </div>
    </ScrollPanel>
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { streamSearchBooks } from '@/api/book'
import type { BookItem } from '@/types/book'
import BookCard from './components/bookCard.vue'

const route = useRoute()
const router = useRouter()

const searchKeyword = ref(getRouteKeyword())
const bookList = ref<BookItem[]>([])
const isSearching = ref(false)
const errorMessage = ref('')
const activeController = ref<AbortController | null>(null)
const seenKeys = new Set<string>()

const trimmedKeyword = computed(() => searchKeyword.value.trim())
const summaryText = computed(() => {
  if (errorMessage.value) return errorMessage.value
  if (!trimmedKeyword.value) return '请输入关键词开始搜索'
  if (isSearching.value) return `正在搜索 "${trimmedKeyword.value}"，新结果会自动显示在顶部`
  return `共找到 ${bookList.value.length} 条结果`
})
const emptyText = computed(() => (trimmedKeyword.value ? '暂无搜索结果' : '输入关键词后开始搜索'))

watch(
  () => route.query.keyword,
  () => {
    searchKeyword.value = getRouteKeyword()
    if (trimmedKeyword.value) {
      search()
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => {
  stopSearch()
})

function getRouteKeyword() {
  const keyword = route.query.keyword
  return typeof keyword === 'string' ? keyword : ''
}

function startSearch() {
  if (!trimmedKeyword.value) return

  router.replace({
    name: 'BooksSearch',
    query: {
      keyword: trimmedKeyword.value,
    },
  })

  if (route.query.keyword === trimmedKeyword.value) {
    search()
  }
}

async function search() {
  stopSearch()
  resetResults()

  if (!trimmedKeyword.value) return

  const controller = new AbortController()
  activeController.value = controller
  isSearching.value = true

  try {
    await streamSearchBooks(
      { keyword: trimmedKeyword.value },
      (items) => {
        appendIncomingBooks(items)
      },
      controller.signal,
    )
  } catch (error) {
    if (!controller.signal.aborted) {
      errorMessage.value = error instanceof Error ? error.message : 'Search failed'
    }
  } finally {
    if (activeController.value === controller) {
      isSearching.value = false
      activeController.value = null
    }
  }
}

function stopSearch() {
  activeController.value?.abort()
  activeController.value = null
}

function resetResults() {
  bookList.value = []
  errorMessage.value = ''
  seenKeys.clear()
}

function appendIncomingBooks(items: BookItem[]) {
  const incoming = items.filter((book) => {
    const key = getBookKey(book)

    if (seenKeys.has(key)) {
      return false
    }

    seenKeys.add(key)
    return true
  })

  if (incoming.length > 0) {
    bookList.value.unshift(...incoming.reverse())
  }
}

function stringify(value: unknown) {
  return typeof value === 'string' ? value : undefined
}

function getBookKey(book: BookItem) {
  return String(book.bookUrl)
}

function openBook(book: BookItem) {
  if (book.id) {
    router.push({
      name: 'BooksReader',
      params: {
        bookId: String(book.id),
      },
    })
    return
  }

  if (book.bookUrl) {
    window.open(book.bookUrl, '_blank', 'noopener,noreferrer')
  }
}

function goBack() {
  router.back()
}
</script>

<style lang="scss" scoped>
#book-search-list {
  .search-header {
    display: flex;
    align-items: center;
    gap: 0.625rem;
  }

  .result-summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 0.25rem 0.125rem;
  }

  .search-spinner {
    width: 1.5rem;
    height: 1.5rem;
  }

  .result-scroll {
    height: calc(100vh - 12rem);
  }

  .result-item {
    border-radius: 0.5rem;
    background: var(--p-surface-0);
  }

  .empty-state {
    min-height: 16rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    color: var(--p-text-muted-color);
  }
}

.result-list-enter-active,
.result-list-leave-active,
.result-list-move {
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.result-list-enter-from {
  opacity: 0;
  transform: translateY(-12px);
}

.result-list-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
