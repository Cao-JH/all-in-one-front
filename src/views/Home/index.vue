<script setup lang="ts">
import { ref } from 'vue'

const isCollapsed = ref(false)

const menuItems = [
  { name: 'Home', icon: 'book' },
  { name: 'Projects', icon: 'card' },
  { name: 'Messages', icon: 'video' },
  { name: 'Settings', icon: 'menu' },
]
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
          :key="item.name"
          class="nav-item"
        >
          <span class="icon-wrapper">
            <AppSvgIcon :name="item.icon" :size="14" />
          </span>
          <span class="item-text" v-if="!isCollapsed">{{ item.name }}</span>
        </button>
      </nav>
    </aside>

    <!-- <section class="flex min-h-screen flex-1 flex-col">
      <header
        class="hidden md:flex items-center justify-between px-8 py-6 border-b border-border sticky top-0 bg-background/95 backdrop-blur z-20"
      >
        <h1 class="text-xl font-semibold">Home</h1>
        <button class="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          <AppSvgIcon name="qiapianxingshi" :size="14" />
          Create
        </button>
      </header>

      <main class="flex-1 p-4 md:p-8 animate-in fade-in duration-500">
        <div class="rounded-xl border border-border bg-card p-6 shadow-sm">
          <h2 class="text-lg font-medium">Home content</h2>
          <p class="mt-2 text-sm text-muted-foreground">
            This is the main content area and can be expanded with modules later.
          </p>
        </div>
      </main>
    </section> -->
  </div>
</template>


<style lang="scss" scoped>
#home {

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
      width: 4rem; // w-20 (20px=5rem，1rem=4px 是 Tailwind 默认基准)
    }
    &:not(.collapsed) {
      width: 16rem; // w-64 (64px=16rem)
    }
  
    // 侧边栏头部（标题+折叠按钮）
    .sidebar-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid var(--border);
      padding: 1rem; // px-4 py-4
      font-size: 0.875rem; // text-sm
  
      .sidebar-title {
        font-weight: 600; // font-semibold
        letter-spacing: 0.05em; // tracking-wide
      }
  
      // 折叠按钮
      .collapse-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 2.25rem; // w-9
        height: 2.25rem; // h-9
        border: 1px solid var(--border);
        border-radius: 0.375rem; // rounded-md
        font-size: 0.875rem; // text-sm
        transition: color background-color 300ms ease; // transition-colors
  
        &:hover {
          background-color: var(--muted); // hover:bg-muted
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
          width: 1rem; // size=16
          height: 1rem;
        }
      }
    }
  
    // 侧边栏导航区域
    .sidebar-nav {
      flex: 1;
      padding: 0.75rem; // p-3
      margin-top: 0.5rem; // space-y-2 拆分为子元素 margin
      margin-bottom: 0.5rem;
  
      // 导航菜单项
      .nav-item {
        display: flex;
        align-items: center;
        width: 100%;
        gap: 0.75rem; // gap-3
        padding: 0.5rem 0.75rem; // px-3 py-2
        border-radius: 0.375rem; // rounded-md
        text-align: left;
        font-size: 0.875rem; // text-sm
        transition: background-color 300ms ease; // transition-colors
  
        &:hover {
          background-color: var(--muted); // hover:bg-muted
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
          width: 1.5rem; // w-6
          height: 1.5rem; // h-6
          border-radius: 0.25rem; // rounded
          background-color: var(--muted); // bg-muted
          color: var(--foreground); // text-foreground
  
          svg {
            width: 0.875rem; // size=14
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
}
</style>