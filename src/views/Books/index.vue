<template>
  <div id="books-index">
    <nav class="tab-bar">
      <div class="bar-left">
        <button
          v-for="group in bookGroup"
          :key="group.value"
          class="tab-item"
          :class="{ active: activeGroup === group.value }"
          @click="activeGroup = group.value"
        >
          {{ group.label }}
        </button>
        <span class="tab-item icon">
          <AppSvgIcon name="add" :size="20" />
        </span>
      </div>
      <div class="bar-right">
        <button class="btn search"><AppSvgIcon name="search" :size="16" />搜索</button>
        <div ref="settingWrapRef" class="setting-wrap">
          <button
            class="btn setting"
            :class="{ active: showActionPopover }"
            @click="toggleActionPopover"
          >
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
      </div>
    </nav>

    <div class="content">
      <!-- 这里放图书列表内容 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

// 图书分组
const bookGroup = ref([
  { label: '未分组', value: 'default' },
  { label: '常看', value: '111' },
  { label: '看完', value: '222' },
  { label: '玄幻', value: '333' },
])
const activeGroup = ref('default')

// 设置操作列表
const showActionPopover = ref(false)
const displayMethod = ref('card') // 展示方式
const settingWrapRef = ref<HTMLElement | null>(null)

const displayMethodList = [
  { label: '卡片视图', value: 'card' },
  { label: '紧凑模式', value: 'compact' },
]

const toggleActionPopover = () => {
  //  打开设置列表弹出框
  showActionPopover.value = !showActionPopover.value
}

const handleDisplayClick = (value: string) => {
  // 切换展示方式
  displayMethod.value = value
}

onClickOutside(settingWrapRef, () => {
  // 点击其他地方关闭弹出框
  showActionPopover.value = false
})
</script>

<style lang="scss" scoped>
#books-index {
  .tab-bar {
    display: flex;
    padding: 1rem 2rem;
    background-color: transparent;
    align-items: center;
    justify-content: space-between;

    .bar-left {
      flex: 1;
      display: flex;
      align-items: center;

      .tab-item {
        border: none;
        background: transparent;
        cursor: pointer;
        transition: all 0.2s ease;
        color: var(--text-secondary);
        font-size: 1rem;
        font-weight: 400;
        margin: auto 0.5rem;
        line-height: 2rem;
        height: 2rem;

        &:hover {
          color: var(--text);
        }

        &.active {
          color: var(--text);
          font-weight: 600;
          transform: scale(1.25);
        }
      }

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .bar-right {
      flex: 0.25;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.625rem;

      .setting-wrap {
        position: relative;
      }

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

      .search {
        padding: 0 0.75rem;
        background-color: var(--card-reverse);
        color: var(--text-reverse);
      }

      .setting {
        width: 2rem;
        background-color: var(--card);
        color: var(--text-secondary);
        border: 1px solid var(--text-secondary);

        &:hover,
        &.active {
          color: var(--text);
          border: 1px solid var(--text);
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
        background: linear-gradient(
          180deg,
          color-mix(in srgb, var(--card) 96%, white),
          var(--card)
        );
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
  }

  .content {
    padding: 2rem;
  }
}
</style>
