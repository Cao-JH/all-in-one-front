<template>
  <div id="book-card">
    <div class="book-cover" :style="getCoverStyle(book)">
      <img v-if="book.cover" :src="book.cover" :alt="book.title" class="cover-image" />
      <div v-else class="cover-fallback">
        <span class="cover-tag">BOOK</span>
        <h3 class="fallback-title">{{ book.title }}</h3>
      </div>
    </div>

    <div class="book-info">
      <span class="book-title" :title="book.title">{{ book.title }}</span>
      <span class="book-progress">{{ book.progress }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { BookItem } from '@/types/book'

const props = defineProps<{
  book: BookItem
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
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 130px;
  gap: 0.625rem;
  cursor: pointer;
  padding: 0.75rem;
  transition:
    background-color 0.28s ease,
    box-shadow 0.32s cubic-bezier(0.22, 1, 0.36, 1);
  border-radius: 0.75rem;
  will-change: box-shadow;

  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
    box-shadow:
      0 12px 24px rgba(15, 23, 42, 0.08),
      0 4px 10px rgba(15, 23, 42, 0.05);

    .cover-image,
    .cover-fallback {
      transform: scale(1.05);
    }
  }

  .book-cover {
    width: 100%;
    aspect-ratio: 2 / 3;
    background-color: var(--card);
    border-radius: 0.625rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    flex-shrink: 0;
    overflow: hidden;

    .cover-image,
    .cover-fallback {
      width: 100%;
      height: 100%;
      transform-origin: center center;
      transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
      will-change: transform;
    }

    .cover-image {
      object-fit: cover;
    }

    .cover-fallback {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 1rem;
      color: rgba(255, 255, 255, 0.95);

      .cover-tag {
        align-self: flex-start;
        padding: 0.25rem 0.55rem;
        border: 1px solid rgba(255, 255, 255, 0.28);
        border-radius: 999px;
        background-color: rgba(255, 255, 255, 0.12);
        font-size: 0.7rem;
        letter-spacing: 0.14em;
      }

      .fallback-title {
        max-width: 72%;
        font-size: 1.25rem;
        line-height: 1.3;
        font-weight: 600;
      }
    }
  }

  .book-info {
    width: 100%;
    display: flex;
    min-width: 0;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    .book-title {
      display: -webkit-box;
      overflow: hidden;
      color: var(--text);
      font-size: 1rem;
      font-weight: 600;
      line-height: 1.35;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    .book-progress {
      color: var(--text-tertiary);
      font-size: 0.75rem;
      line-height: 1.2;
    }
  }
}

@media (min-width: 360px) and (max-width: 575px) {
  .book-card {
    gap: 0.5rem;
    padding: 0.55rem;
  }

  .book-card .book-info {
    .book-title {
      font-size: 0.92rem;
    }

    .book-progress {
      font-size: 0.72rem;
    }
  }
}

@media (prefers-reduced-motion: reduce) {
  .book-card,
  .book-card .book-cover .cover-image,
  .book-card .book-cover .cover-fallback {
    transition: none;
  }
}
</style>
