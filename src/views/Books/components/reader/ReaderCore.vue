<template>
  <section class="reader-core">
    <header class="reader-core__header">
      <div class="reader-core__title">
        <slot name="title">
          <span>阅读器</span>
        </slot>
      </div>

      <div class="reader-core__actions">
        <slot name="actions" />
      </div>
    </header>

    <main class="reader-core__body">
      <slot>
        <div class="reader-core__empty">
          <p>这里是阅读正文区域。</p>
          <p>后续可以放章节内容、翻页控制、目录和字号设置。</p>
        </div>
      </slot>
    </main>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  bookId?: string | number | null
  chapterId?: string | number | null
  mode?: 'mini' | 'fullscreen' | 'page'
}>()
</script>

<style scoped lang="scss">
.reader-core {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  background: var(--p-surface-0);
}

.reader-core__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-bottom: 1px solid var(--p-surface-200);
}

.reader-core__title {
  font-size: 0.95rem;
  font-weight: 600;
}

.reader-core__actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.reader-core__body {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 1rem;
}

.reader-core__empty {
  max-width: 40rem;
  line-height: 1.8;
  color: var(--p-text-muted-color);
}
</style>
