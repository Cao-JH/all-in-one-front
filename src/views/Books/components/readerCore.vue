<template>
  <section class="reader-core">
    <div class="block sm:hidden">
      <div class="reader-core__menu">11111</div>
    </div>

    <!-- 平板 / PC -->
    <div class="hidden sm:block fixed bottom-40 z-50 flex-col gap-3" :style="{ right: rightOffset + 'px' }">
      <div class="reader-core__actions">
        <div class="action-btn w-14 h-14" v-for="(button, i) in actionButtons" :key="i"
          @click.stop="button.command?.()">
          <div>
            <i :class="`pi ${button.icon}`"></i>
          </div>
          <div>{{ button.label }}</div>
        </div>

        <div v-if="isShowBackTop" class="action-btn w-14 h-14" @click.stop="backToTop">
          <i class="pi pi-arrow-up text-xl"></i>
        </div>
      </div>
    </div>

    <main class="reader-core__body" ref="scrollRef">
      <div ref="bodyRef" class="reader-core__body-inner px-4 sm:px-12 w-full sm:w-[min(80%,768px)] mx-auto">
        <div class="reader-core__empty">
          <p>这里是阅读正文区域。</p>
          <p>后续可以放章节内容、翻页控制、目录和字号设置。</p>
        </div>
      </div>
    </main>
  </section>

  <transition name="slide-up">
    <div v-if="contentsVisible" class="overlay">
      <div class="mask" @click="contentsVisible = false"></div>
      <div class="contents-box fixed top-0 h-screen z-50" @click.stop
        :style="{ width: currentWidth + 'px', left: leftOffset + 'px' }">
        <Tabs v-model:value="activeTab" scrollable>
          <div class="contents-header">
            <div class="contents-header__left">
              <TabList>
                <Tab value="contents">
                  <span>目录</span>
                  <span class="chapter-count">连载中 · 共{{ chapters.length }}章</span>
                </Tab>
                <Tab value="bookmark">书签</Tab>
              </TabList>
            </div>
            <div class="contents-header__right">
              <template v-if="activeTab === 'contents'">
                <button class="header-action-btn" @click="toggleOrder">
                  <i class="pi pi-sort-alt"></i>
                  <span>{{ isReverse ? '正序' : '倒序' }}</span>
                </button>
              </template>
              <button class="close-btn" @click="contentsVisible = false">
                <i class="pi pi-times"></i>
              </button>
            </div>
          </div>

          <TabPanels>
            <TabPanel value="contents">
              <ScrollPanel class="contents-scroll">
                <div class="chapter-grid">
                  <div v-for="chapter in displayedChapters" :key="chapter.id" class="chapter-item" :class="{
                    'chapter-item--active': chapter.id === currentChapterId,
                    'chapter-item--reading': chapter.id === readingChapterId,
                  }" @click="goToChapter(chapter)">
                    <span class="chapter-item__title">{{ chapter.title }}</span>
                  </div>
                </div>
              </ScrollPanel>
            </TabPanel>

            <TabPanel value="bookmark">
              <ScrollPanel class="contents-scroll">
                <div class="bookmark-empty">
                  <i class="pi pi-bookmark"></i>
                  <p>暂无书签</p>
                </div>
              </ScrollPanel>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  </transition>

  <BookInfoDialog v-model="dialogVisible" :book="currentBook" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { fetchBook } from '@/api/book';
import BookInfoDialog from './bookInfoDialog.vue'

const router = useRouter()

const props = defineProps<{
  bookId?: string | number | null
  chapterId?: string | number | null
  mode?: 'mini' | 'fullscreen' | 'page'
}>()

/* ================= 状态 ================= */
const contentsVisible = ref(false)
const isShowBackTop = ref(false)
const activeTab = ref('contents')
const isReverse = ref(false)
const dialogVisible = ref(false)
const currentBook = ref({
  id: 1,
  title: '雪中悍刀行',
  cover: '',
  genre: '玄幻武侠',
  author: '烽火戏诸侯',
  status: '连载中',
  latestChapter: '第179章 终章',
  group: '默认分组',
  chapterCount: 179,
  description: '西北有座城...'
})

// 当前阅读章节 id（高亮红色）
const currentChapterId = ref(1)
// 正在阅读章节 id（灰色背景，通常与 currentChapterId 相同，或是上次读到的位置）
const readingChapterId = ref(14)

// 模拟章节数据（实际使用时从 props/API 获取）
const chapters = ref(
  Array.from({ length: 179 }, (_, i) => ({
    id: i + 1,
    title: `第${i + 1}章 章节${i + 1}`,
  }))
)

const displayedChapters = computed(() =>
  isReverse.value ? [...chapters.value].reverse() : chapters.value
)

const toggleOrder = () => {
  isReverse.value = !isReverse.value
}

const goToChapter = (chapter: { id: number; title: string }) => {
  currentChapterId.value = chapter.id
  contentsVisible.value = false
}

const scrollRef = ref()
const bodyRef = ref()

const currentWidth = ref(0)
const rightOffset = ref(16)
const leftOffset = ref(0)

/* ================= 方法 ================= */
// 目录控制
const toggleContents = () => {
  contentsVisible.value = !contentsVisible.value
}

// 查看小说信息
const handleGetBookInfo = () => {
  dialogVisible.value = !dialogVisible.value
}

// 返回顶部
const backToTop = () => {
  scrollRef.value?.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

// 滚动监听
const handleScroll = () => {
  const scrollTop = scrollRef.value?.scrollTop || 0
  isShowBackTop.value = scrollTop >= 600
}

// 位置计算
const updatePosition = () => {
  const rect = bodyRef.value?.getBoundingClientRect()
  if (!rect) return
  rightOffset.value = window.innerWidth - rect.right - 66
  leftOffset.value = rect.left
  currentWidth.value = rect.right - rect.left
}

// 获取小说内容
const handleFetchBook = async () => {
  const res = await fetchBook();
}

/* ================= 按钮 ================= */
const goBack = () => router.push('/')

const actionButtons = ref([
  { icon: 'pi-arrow-left', label: '返回', command: goBack },
  { icon: 'pi-list', label: '目录', command: toggleContents },
  { icon: 'pi-book', label: '详情', command: handleGetBookInfo },
  { icon: 'pi-cog', label: '设置', command: () => { } },
])

/* ================= 生命周期 ================= */
onMounted(async () => {
  updatePosition()
  scrollRef.value?.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', updatePosition)
  await handleFetchBook()
})

onUnmounted(() => {
  scrollRef.value?.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updatePosition)
})
</script>

<style scoped lang="scss">
.reader-core {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 0;
  background: var(--p-surface-50);

  .reader-core__actions {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    flex-direction: column;

    .action-btn {
      border-radius: 0.5rem;
      border: 1px solid var(--p-surface-300);
      color: var(--p-surface-700);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      font-size: 0.875rem;
      cursor: pointer;
      z-index: 50;

      div {
        line-height: 1.2rem;
      }

      &:hover {
        background-color: var(--p-surface-100);
        color: var(--p-surface-900);
      }
    }
  }
}

.reader-core__body {
  flex: 1;
  min-height: 0;
  overflow: auto;
  display: flex;
  justify-content: center;
  // background: linear-gradient(180deg, var(--p-surface-100) 0%, var(--p-surface-300) 100%);

  .reader-core__body-inner {
    height: 200vh;
    line-height: 1.9;
    color: var(--p-text-color);
    min-width: 0;
    padding: 0 50px;
    background: var(--p-surface-300);

    &:deep(p) {
      margin: 0 0 1rem;
    }

    &:deep(p:last-child) {
      margin-bottom: 0;
    }

    .reader-core__empty {
      color: var(--p-text-muted-color);
    }
  }
}

.overlay {
  position: fixed;
  inset: 0;
  z-index: 40;

  .mask {
    position: absolute;
    inset: 0;
    // background: rgba(0, 0, 0, 0.3);
  }
}

.contents-box {
  background: var(--p-surface-0);
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.12);

  :deep(.p-tabs) {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: transparent;
  }

  :deep(.p-tabpanels) {
    flex: 1;
    min-height: 0;
    padding: 0;
    background: transparent;
  }

  :deep(.p-tabpanel) {
    height: 100%;
    padding: 0;
  }

  // 隐藏默认的 TabList，我们用自定义 header
  :deep(.p-tablist) {
    display: none;
  }

  .contents-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16px 0;
    flex-shrink: 0;

    &__left {
      display: flex;
      align-items: center;
      gap: 4px;

      // 让内置 TabList 显示在这里
      :deep(.p-tablist) {
        display: flex !important;
        border: none !important;
        background: transparent;
      }

      :deep(.p-tablist-tab-list) {
        border: none !important;
        background: transparent;
        gap: 0;
      }

      :deep(.p-tab) {
        font-size: 1.2rem;
        font-weight: 500;
        padding: 16px 16px 6px;
        color: var(--p-text-muted-color);
        border: none;
        background: transparent;
        position: relative;

        &.p-tab-active {
          color: var(--p-text-color);
          font-weight: 600;

          &::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 25px;
            width: 20px;
            height: 3px;
            background: #e53935;
          }
        }
      }

      :deep(.p-tablist-active-bar) {
        display: none !important;
      }
    }

    &__right {
      display: flex;
      align-items: center;
    }

    .chapter-count {
      font-size: 0.78rem;
      color: var(--p-text-muted-color);
      margin-left: 16px;
      white-space: nowrap;
      font-weight: 400;
    }

    .header-action-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 6px 10px;
      border: none;
      background: transparent;
      color: var(--p-text-muted-color);
      font-size: 0.82rem;
      cursor: pointer;
      border-radius: 6px;
      transition: all 0.15s, color 0.15s;

      i {
        font-size: 0.85rem;
      }

      &:hover {
        background: var(--p-surface-100);
        color: var(--p-text-color);
      }
    }

    .close-btn {
      width: 32px;
      height: 32px;
      color: var(--p-text-muted-color);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      i {
        font-size: 1.25rem;
      }

      &:hover {
        color: var(--p-text-color);
      }
    }
  }

  .contents-scroll {
    height: calc(100vh - 57px);

    :deep(.p-scrollpanel-content) {
      padding: 0;
      width: 100%;
    }

    .chapter-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;

      .chapter-item {
        margin: 0 16px;
        font-size: 0.92rem;
        border-radius: 8px;
        color: var(--p-text-color);
        cursor: pointer;
        transition: all 0.15s;
        display: flex;
        align-items: center;

        &:nth-child(odd) {
          margin-right: 0;
        }

        &:nth-child(even) {
          margin-left: 0;
        }

        &:hover {
          background: var(--p-surface-50);
        }

        // 当前章节 - 红色文字
        &--active {
          .chapter-item__title {
            color: #e53935;
            font-weight: 500;
          }
        }

        // 正在阅读章节 - 灰色背景
        &--reading {
          background: var(--p-surface-100);
        }

        &__title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .chapter-item__title {
          width: 100%;
          padding: 14px 0;
          margin: 0 16px;
          border-bottom: 1px solid var(--p-surface-200);
        }
      }
    }

    .bookmark-empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 200px;
      gap: 12px;
      color: var(--p-text-muted-color);

      i {
        font-size: 2rem;
      }

      p {
        font-size: 0.9rem;
        margin: 0;
      }
    }
  }
}

/* 进入前 */
.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    opacity 0.3s ease;
}

.slide-up-enter-to {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-leave-from {
  transform: translateY(0);
  opacity: 1;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>