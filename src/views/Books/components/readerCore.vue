<template>
  <section class="reader-core">
    <div class="block sm:hidden">
      <div class="reader-core__menu">11111</div>
    </div>

    <!-- 平板 / PC -->
    <div
      class="hidden sm:block fixed bottom-40 z-50 flex-col gap-3"
      :style="{ right: rightOffset + 'px' }"
    >
      <div class="reader-core__actions">
        <div
          class="action-btn w-14 h-14"
          v-for="(button, i) in actionButtons"
          :key="i"
          @click.stop="button.command?.()"
        >
          <div>
            <i :class="`pi ${button.icon}`"></i>
          </div>
          <div>{{ button.label }}</div>
        </div>
      </div>
    </div>

    <main class="reader-core__body">
      <div
        ref="bodyRef"
        class="reader-core__body-inner px-4 sm:px-12 w-full sm:w-[min(80%,768px)] mx-auto"
      >
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
      <div
        class="contents-box fixed top-0 h-screen bg-black z-50"
        @click.stop
        :style="{ width: currentWidth + 'px', left: leftOffset + 'px' }"
      >
        这是目录
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

onMounted(() => {
  updatePosition()
  window.addEventListener('resize', updatePosition)
})

onUnmounted(() => {
  window.removeEventListener('resize', updatePosition)
})

const bodyRef = ref()
const currentWidth = ref(0)
const rightOffset = ref(16)
const leftOffset = ref(0)
const updatePosition = () => {
  const rect = bodyRef.value?.getBoundingClientRect()
  if (rect) {
    console.log(rect, 'rect222')
    rightOffset.value = window.innerWidth - rect.right - 66
    leftOffset.value = rect.left
    currentWidth.value = rect.right - rect.left

    // const viewportWidth = document.documentElement.clientWidth
    // rightOffset.value = viewportWidth - rect.right - 66
    // currentWidth.value = rect.width
  }
}

const actionButtons = ref([
  {
    icon: 'pi-arrow-left',
    label: '返回',
    command: () => {
      router.push('/')
    },
  },
  {
    icon: 'pi-list',
    label: '目录',
    command: () => {
      contentsVisible.value = !contentsVisible.value
    },
  },
  {
    icon: 'pi-book',
    label: '详情',
    command: () => {
      console.log('这是详情')
    },
  },
  {
    icon: 'pi-cog',
    label: '设置',
    command: () => {
      console.log('这是设置')
    },
  },
])

const contentsVisible = ref(false)
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

    div {
      line-height: 1.2rem;
    }

    &:hover {
      background-color: var(--p-surface-100);
      color: var(--p-surface-900);
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
}

.reader-core__body-inner {
  height: 200vh;
  line-height: 1.9;
  color: var(--p-text-color);
  min-width: 0;
  padding: 0 50px;
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

.overlay {
  position: fixed;
  inset: 0;
}

.mask {
  position: absolute;
  inset: 0;
  z-index: 1;
}
</style>
