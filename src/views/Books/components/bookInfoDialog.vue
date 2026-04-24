<template>
  <Dialog v-model:visible="visible" :modal="true" :draggable="false" :style="{ width: '660px' }" :pt="dialogPt">
    <!-- 标题栏 -->
    <template #header>
      <span class="dialog-title">书籍详情</span>
    </template>

    <!-- 内容区 -->
    <div class="book-detail">
      <!-- 左侧封面 -->
      <div class="book-detail__cover">
        <img v-if="book.cover" :src="book.cover" :alt="book.title" class="cover-img" />
        <div v-else class="cover-placeholder">
          <i class="pi pi-book"></i>
        </div>
      </div>

      <!-- 右侧信息 -->
      <div class="book-detail__info">
        <h2 class="book-title">{{ book.title }}</h2>

        <!-- 标签行：类型、作者、连载状态 -->
        <div class="tag-row">
          <span v-if="book.genre" class="book-tag">{{ book.genre }}</span>
          <span v-if="book.author" class="book-tag">{{ book.author }}</span>
          <span v-if="book.status" class="book-tag">{{ book.status }}</span>
        </div>

        <!-- 元信息 -->
        <div class="meta-list">
          <div v-if="book.latestChapter" class="meta-item">
            <span class="meta-key">最新章节</span>
            <span class="meta-val">{{ book.latestChapter }}</span>
          </div>
          <div v-if="book.group" class="meta-item">
            <span class="meta-key">分组</span>
            <span class="meta-val meta-val--muted">{{ book.group }}</span>
          </div>
          <div v-if="book.chapterCount" class="meta-item">
            <span class="meta-key">目录</span>
            <span class="meta-val meta-val--muted">共 {{ book.chapterCount }} 章</span>
          </div>
        </div>

        <!-- 简介 -->
        <p v-if="book.description" class="book-desc">{{ book.description }}</p>
      </div>
    </div>

    <!-- 底部按钮 -->
    <template #footer>
      <template v-if="isAdded">
        <Button label="删除" severity="danger" outlined @click="emit('remove')" />
        <Button label="继续阅读" @click="emit('read')" />
      </template>
      <template v-else>
        <Button label="放入书架" outlined @click="emit('add')" />
        <Button label="开始阅读" @click="emit('read')" />
      </template>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'

/* ================= 类型 ================= */
export interface Book {
  id: string | number
  title: string
  cover?: string
  genre?: string
  author?: string
  status?: string
  latestChapter?: string
  group?: string
  chapterCount?: number
  description?: string
}

/* ================= Props / Emits ================= */
const props = defineProps<{
  modelValue: boolean
  book: Book
  isAdded?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'add': []
  'remove': []
  'read': []
}>()

/* ================= v-model 代理 ================= */
const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

/* ================= PrimeVue Dialog PassThrough ================= */
// 通过 pt 覆盖 Dialog 内部样式，去除默认 padding 以便自定义布局
const dialogPt = {
  root: { class: 'book-dialog' },
  header: { class: 'book-dialog__header' },
  content: { class: 'book-dialog__content' },
  footer: { class: 'book-dialog__footer' },
}
</script>

<style scoped lang="scss">
/* ===== Dialog 结构覆盖 ===== */
:deep(.book-dialog) {
  border-radius: 12px;
  overflow: hidden;
}

:deep(.book-dialog__header) {
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--p-surface-200);
}

:deep(.book-dialog__content) {
  padding: 0 !important;
}

:deep(.book-dialog__footer) {
  padding: 14px 24px;
  border-top: 1px solid var(--p-surface-200);
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* ===== 标题 ===== */
.dialog-title {
  font-size: 1rem;
  font-weight: 500;
  color: var(--p-text-color);
}

/* ===== 内容区：左右布局 ===== */
.book-detail {
  display: grid;
  grid-template-columns: 3fr 7fr;
  min-height: 300px;
}

/* ===== 左侧封面 ===== */
.book-detail__cover {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 28px 20px;

  .cover-img {
    width: 100%;
    max-width: 130px;
    aspect-ratio: 2 / 3;
    object-fit: cover;
    border-radius: 8px;
    border: 1px solid var(--p-surface-200);
    display: block;
  }

  .cover-placeholder {
    width: 130px;
    aspect-ratio: 2 / 3;
    border-radius: 8px;
    border: 1px solid var(--p-surface-200);
    background: var(--p-surface-50);
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 2rem;
      color: var(--p-surface-400);
    }
  }
}

/* ===== 右侧信息 ===== */
.book-detail__info {
  padding: 28px 24px 24px 8px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.book-title {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--p-text-color);
  line-height: 1.4;
  margin: 0;
}

/* ===== 标签 ===== */
.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.book-tag {
  display: inline-flex;
  align-items: center;
  padding: 2px 10px;
  border-radius: 99px;
  font-size: 0.75rem;
  line-height: 1.8;
  border: 1px solid var(--p-surface-300);
  color: var(--p-text-muted-color);
  background: var(--p-surface-50);
  white-space: nowrap;
}

/* ===== 元信息列表 ===== */
.meta-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.meta-item {
  display: flex;
  align-items: baseline;
  gap: 12px;
  font-size: 0.875rem;
}

.meta-key {
  color: var(--p-text-muted-color);
  font-size: 0.8125rem;
  min-width: 56px;
  flex-shrink: 0;
}

.meta-val {
  color: var(--p-text-color);
  font-size: 0.875rem;

  &--muted {
    color: var(--p-text-muted-color);
  }
}

/* ===== 简介 ===== */
.book-desc {
  font-size: 0.8125rem;
  color: var(--p-text-muted-color);
  line-height: 1.75;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>