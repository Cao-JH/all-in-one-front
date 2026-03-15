<script setup lang="ts">
import { ref, shallowRef, defineAsyncComponent } from 'vue'
import type { Component } from 'vue'

const isCollapsed = ref(false)
const activeTab = ref('Books')

const menuItems = [
  { value: 'Books', label: '小说', icon: 'book' },
  { value: 'Videos', label: '电影', icon: 'video' },
  { value: 'Settings', label: '设置', icon: 'menu' },
]

// 动态组件映射
const componentMap: Record<string, Component> = {
  Books: defineAsyncComponent(() => import('@/views/Books/index.vue')),
  Videos: defineAsyncComponent(() => import('@/views/Videos/index.vue')),
  Settings: defineAsyncComponent(() => import('@/views/Settings/index.vue')),
}

// 当前激活的组件
const currentComponent = shallowRef<Component>(componentMap[activeTab.value]!)

// 切换标签页
const switchTab = (value: string) => {
  activeTab.value = value
  const component = componentMap[value]
  if (component) {
    currentComponent.value = component
  }
}
</script>

<template>
  <div id="home">
    <aside class="aside-sidebar" :class="{ collapsed: isCollapsed }">
      <div class="sidebar-header">
        <span class="sidebar-title" v-if="!isCollapsed">AIO</span>
        <button class="collapse-btn" @click="isCollapsed = !isCollapsed">
          <AppSvgIcon name="menu" :size="16" />
        </button>
      </div>

      <nav class="sidebar-nav">
        <button
          v-for="item in menuItems"
          :key="item.value"
          class="nav-item"
          :class="{ active: activeTab === item.value }"
          @click="switchTab(item.value)"
        >
          <span class="icon-wrapper">
            <AppSvgIcon :name="item.icon" :size="14" />
          </span>
          <span class="item-text" v-if="!isCollapsed">{{ item.label }}</span>
        </button>
      </nav>
    </aside>

    <div class="main-wrapper">
      <header class="main-header">
      </header>

      <main class="main-content">
        <component :is="currentComponent" />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#home {
  display: flex;
  min-height: 100vh;

  .aside-sidebar {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    height: 100vh;
    border-right: 1px solid var(--border);
    background-color: var(--card);
    transition: all 300ms ease;

    &.collapsed {
      width: 4rem;
    }
    &:not(.collapsed) {
      width: 16rem;
    }

    // 侧边栏头部（标题+折叠按钮）
    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);
      padding: 1rem;
      font-size: 0.875rem;

      .sidebar-title {
        font-weight: 600;
        letter-spacing: 0.05em;
      }

      // 折叠按钮
      .collapse-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.25rem;
        height: 2.25rem;
        border: 1px solid var(--border);
        border-radius: 0.375rem;
        font-size: 0.875rem;
        transition: color background-color 300ms ease;

        &:hover {
          background-color: var(--muted);
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        svg {
          width: 1rem;
          height: 1rem;
        }
      }
    }

    // 侧边栏导航区域
    .sidebar-nav {
      flex: 1;
      padding: 0.75rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;

      // 导航菜单项
      .nav-item {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 0.75rem;
        padding: 0.5rem 0.75rem;
        border-radius: 0.375rem;
        text-align: left;
        font-size: 0.875rem;
        transition: background-color 300ms ease;
        cursor: pointer;
        border: none;
        background: transparent;
        color: var(--text);

        &:hover {
          background-color: var(--muted);
        }

        &.active {
          background-color: var(--primary);
          color: white;

          .icon-wrapper {
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
          }
        }

        // 折叠状态下的菜单项样式
        .aside-sidebar.collapsed & {
          justify-content: center;
          padding-left: 0;
          padding-right: 0;
        }

        // 菜单图标容器
        .icon-wrapper {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 1.5rem;
          height: 1.5rem;
          border-radius: 0.25rem;
          background-color: var(--muted);
          color: var(--foreground);

          svg {
            width: 0.875rem;
            height: 0.875rem;
          }
        }

        // 菜单文字
        .item-text {
          // 折叠时隐藏文字（对应 v-if="!isCollapsed"）
          .aside-sidebar.collapsed & {
            display: none;
          }
        }
      }
    }
  }

  .main-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    .main-header {
      height: 4rem;
      border-bottom: 1px solid var(--border);
      background-color: var(--card);
      display: flex;
      align-items: center;
      padding: 0 2rem;
    }

    .main-content {
      flex: 1;
      overflow-y: auto;
    }
  }
}
</style>
