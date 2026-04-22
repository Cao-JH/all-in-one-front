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
      <div class="contents-box fixed top-0 h-screen bg-black z-50" @click.stop
        :style="{ width: currentWidth + 'px', left: leftOffset + 'px' }">
        <Tabs value="0" scrollable>
          <TabList>
            <Tab value="contents">目录</Tab>
            <Tab value="bookmark">书签</Tab>
          </TabList>
          <TabPanels>
            <ScrollPanel>
              <TabPanel value="contents" class="h-full">111 </TabPanel>
              <TabPanel value="bookmark" class="h-full">222 </TabPanel>
            </ScrollPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

defineProps<{
  bookId?: string | number | null
  chapterId?: string | number | null
  mode?: 'mini' | 'fullscreen' | 'page'
}>()

/* ================= 状态 ================= */
const contentsVisible = ref(false)
const isShowBackTop = ref(false)

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

/* ================= 按钮 ================= */
const goBack = () => router.push('/')

const actionButtons = ref([
  { icon: 'pi-arrow-left', label: '返回', command: goBack },
  { icon: 'pi-list', label: '目录', command: toggleContents },
  { icon: 'pi-book', label: '详情', command: () => { } },
  { icon: 'pi-cog', label: '设置', command: () => { } },
])

/* ================= 生命周期 ================= */
onMounted(() => {
  updatePosition()
  scrollRef.value?.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', updatePosition)
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
  }

  :deep(.p-tablist-tab-list) {
    border: none !important;
    padding: 0 16px;
    transition: all 0.3s ease;

    .p-tab {
      font-size: 1.25rem;
      font-weight: 400;
      padding: 16px 16px 6px;
    }

    .p-tab-active::after {
      content: '';
      width: 20%;
      height: 2px;
      background: #333;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
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
