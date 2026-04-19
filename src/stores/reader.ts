import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export type ReaderMode = 'mini' | 'fullscreen' | 'page'

export const useReaderStore = defineStore('reader', () => {
  const isOpen = ref(false)
  const readerMode = ref<ReaderMode>('mini')
  const currentBookId = ref<string | number | null>(null)
  const currentChapterId = ref<string | number | null>(null)

  const isFullscreen = computed(() => readerMode.value === 'fullscreen')

  const openReader = (bookId: string | number, mode: ReaderMode = 'mini') => {
    currentBookId.value = bookId
    readerMode.value = mode
    isOpen.value = true
  }

  const closeReader = () => {
    isOpen.value = false
    currentBookId.value = null
    currentChapterId.value = null
    readerMode.value = 'mini'
  }

  const setReaderMode = (mode: ReaderMode) => {
    readerMode.value = mode
  }

  return {
    isOpen,
    readerMode,
    currentBookId,
    currentChapterId,
    isFullscreen,
    openReader,
    closeReader,
    setReaderMode,
  }
})
