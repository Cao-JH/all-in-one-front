<template>
  <section class="reader-core">
    <div class="reader-core__menu"></div>
    <div class="reader-core__actions">
      <slot name="actions" />
    </div>

    <main class="reader-core__body">
      <div class="reader-core__body-inner">
        <slot>
          <div class="reader-core__empty">
            <p>这里是阅读正文区域。</p>
            <p>后续可以放章节内容、翻页控制、目录和字号设置。</p>
          </div>
        </slot>
      </div>
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
  background: var(--p-surface-50);
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
  display: flex;
  justify-content: center;
  // background: linear-gradient(180deg, var(--p-surface-100) 0%, var(--p-surface-300) 100%);

  padding: 0 3rem;
}

.reader-core__body-inner {
  line-height: 1.9;
  color: var(--p-text-color);
  min-width: 0;
  padding: 0 50px;
  width: min(100%, 90ch);
  background: var(--p-surface-300);
}

.reader-core__empty {
  color: var(--p-text-muted-color);
}

.reader-core__body-inner :deep(p) {
  margin: 0 0 1rem;
}

.reader-core__body-inner :deep(p:last-child) {
  margin-bottom: 0;
}
</style>
