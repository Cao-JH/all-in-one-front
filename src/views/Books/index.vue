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
        <SearchWrap />
        <SettingWrap />
      </div>
    </nav>

    <div class="content">
      <!-- 这里放图书列表内容 -->
      <BookContent />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SettingWrap from './components/settingWrap.vue'
import SearchWrap from './components/searchWrap.vue'
import BookContent from './bookContent.vue'

// 图书分组
const bookGroup = ref([
  { label: '未分组', value: 'default' },
  { label: '常看', value: '111' },
  { label: '看完', value: '222' },
  { label: '玄幻', value: '333' },
])
const activeGroup = ref('default')
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
    }
  }

  .content {
    padding: 1rem 2rem;
    min-height: calc(100vh - 8rem);
  }
}
</style>
