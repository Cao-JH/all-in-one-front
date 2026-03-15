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
        <button class="btn search">
          <AppSvgIcon name="search" :size="16" />搜索
        </button>
        <button class="btn setting">
          <AppSvgIcon name="card" :size="16" />
        </button>
      </div>
    </nav>

    <div class="content">
      <!-- 这里放书籍列表内容 -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const bookGroup = ref([
  { label: '未分组', value: 'defalut'},
  { label: '常看', value: '111'},
  { label: '看完', value: '222'},
  { label: '玄幻', value: '333'},
])
const activeGroup = ref('defalut')
</script>

<style lang="scss" scoped>
#books-index {
  
  .tab-bar {
    display: flex;
    padding: 1rem 2rem;
    background-color: transparent;
    align-items: center;
    justify-content: space-between;
    // border-bottom: 1px solid var(--border);

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
      flex: .25;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 0.625rem;

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
        transition: all 0.2s ease;
        
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
        
        &:hover {
          color: var(--text);
          border-color: var(--text-secondary);
          border: 1px solid var(--text);
        }
      }
    }

  }

  .content {
    padding: 2rem;
  }
}
</style>

