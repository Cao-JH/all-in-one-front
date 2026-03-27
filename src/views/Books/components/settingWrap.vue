<template>
  <div ref="settingWrapRef" id="setting-wrap">
    <button class="btn setting" :class="{ active: showActionPopover }" @click="toggleActionPopover">
      <AppSvgIcon name="card" :size="20" />
    </button>
    <Transition name="action-popover">
      <div v-if="showActionPopover" class="action-popover">
        <div class="list-item">
          <div class="popover-title"></div>
          <div class="popover-content display-content">
            <button
              v-for="item in displayMethodList"
              :key="item.value"
              class="display-item"
              :class="{ active: displayMethod === item.value }"
              @click="handleDisplayClick(item.value)"
            >
              <span>{{ item.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

const showActionPopover = ref(false)
const displayMethod = ref('card')
const settingWrapRef = ref<HTMLElement | null>(null)

const displayMethodList = [
  { label: '卡片视图', value: 'card' },
  { label: '紧凑模式', value: 'compact' },
]

const toggleActionPopover = () => {
  showActionPopover.value = !showActionPopover.value
}

const handleDisplayClick = (value: string) => {
  displayMethod.value = value
}

onClickOutside(settingWrapRef, () => {
  showActionPopover.value = false
})
</script>

<style lang="scss" scoped>
#setting-wrap {
  position: relative;

  .btn {
    display: flex;
    border: none;
    align-items: center;
    justify-content: center;
    height: 2rem;
    line-height: 2rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    gap: 0.25rem;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  .setting {
    width: 2rem;
    background-color: var(--card);
    color: var(--text-secondary);
    border: 1.5px solid var(--text-secondary);

    &:hover,
    &.active {
      color: var(--text);
      border: 1.5px solid var(--text);
    }
  }

  .action-popover {
    position: absolute;
    top: calc(100% + 0.625rem);
    right: 0;
    min-width: 10rem;
    padding: 0.5rem;
    border-radius: 0.5rem;
    border: 1px solid color-mix(in srgb, var(--text-secondary) 18%, transparent);
    background: linear-gradient(180deg, color-mix(in srgb, var(--card) 96%, white), var(--card));
    box-shadow:
      0 12px 32px rgba(15, 23, 42, 0.14),
      0 2px 8px rgba(15, 23, 42, 0.08);
    backdrop-filter: blur(14px);
    transform-origin: top right;
    z-index: 10;

    .list-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      font-size: 1rem;

      .popover-content {
      }

      .display-content {
        width: 100%;
        height: 3rem;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;

        .display-item {
          border: none;
          height: 2rem;
          width: 2rem;
          font-size: 0.5rem;
          background-color: burlywood;
          color: var(--text);

          &:hover,
          &.active {
            background-color: color-mix(in srgb, var(--card-reverse) 10%, transparent);
            transform: translateY(-1px);
          }
        }
      }
    }
  }

  .action-popover-enter-active,
  .action-popover-leave-active {
    transition:
      opacity 0.22s ease,
      transform 0.22s ease;
  }

  .action-popover-enter-from,
  .action-popover-leave-to {
    opacity: 0;
    transform: translateY(-8px) scale(0.96);
  }

  .action-popover-enter-to,
  .action-popover-leave-from {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
