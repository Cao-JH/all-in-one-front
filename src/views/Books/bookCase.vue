<template>
  <section id="book-content">
    <article v-for="book in bookList" :key="book.id" class="book-card">
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
    </article>
  </section>
</template>

<script setup lang="ts">
interface BookItem {
  id: number
  title: string
  progress: string
  cover?: string
  palette: string
}

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
]

const getCoverStyle = (book: BookItem) => {
  if (book.cover) {
    return undefined
  }

  return {
    background: book.palette,
  }
}
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

.book-card {
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

@media (min-width: 1200px) {
  #book-content {
    max-width: 1160px;
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
}

@media (min-width: 992px) and (max-width: 1199px) {
  #book-content {
    max-width: 960px;
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  #book-content {
    max-width: 760px;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

@media (min-width: 576px) and (max-width: 767px) {
  #book-content {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0.875rem;
  }

  .book-card {
    padding: 0.65rem;
  }
}

@media (min-width: 360px) and (max-width: 575px) {
  #book-content {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.75rem;
  }

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

@media (max-width: 359px) {
  #book-content {
    grid-template-columns: minmax(0, 1fr);
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
