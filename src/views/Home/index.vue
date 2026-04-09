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

const toggleDarkMode = () => {
  document.documentElement.classList.toggle('my-app-dark')
}
</script>

<template>
  <div id="home">
    <div class="sidebar">
      <Menu :model="menuItems" class="sidebar-menu">
        <template #item="{ item, props }">
          <Button
            v-bind="props.action"
            v-tooltip.right="item.label"
            class="menu-button"
            :class="{ active: activeTab === item.value }"
            severity="secondary"
            text
            @click="switchTab(item.value)"
          >
            <AppSvgIcon :name="item.icon" :size="18" />
          </Button>
        </template>
        <template #end>
          <div class="menu-footer">
            <Button
              v-tooltip.right="'Toggle Dark Mode'"
              class="menu-button"
              severity="secondary"
              text
              @click="toggleDarkMode()"
            >
              <AppSvgIcon name="menu" :size="18" />
            </Button>
          </div>
        </template>
      </Menu>
    </div>

    <div class="main-wrapper">
      <header class="main-header"></header>

      <main class="main-content">
        <component :is="currentComponent" />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#home {
  display: flex;
  width: 100%;
  height: 100vh;
  padding: 1.5rem;
  gap: 1.5rem;
  align-items: flex-start;
  background-color: var(--p-primary-background);

  .sidebar {
    width: auto;
    height: 100%;

    :deep(.p-menu) {
      width: auto;
      min-width: 0;
      height: 100%;
      padding: 1.25rem;
      border-radius: 1rem;
      border: none;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1rem;
      background-color: var(--p-surface-50);
    }

    .sidebar-menu {
      :deep(.p-menu-list) {
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      :deep(.p-menu-item) {
        width: auto;
      }

      :deep(.p-menu-item-content) {
        display: flex;
        border-radius: 0.5rem;
        justify-content: center;
      }
    }

    .menu-button {
      width: 3rem;
      height: 3rem;
      min-width: 3rem;
      padding: 0;
      border-radius: 0.5rem;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      :deep(.p-button-label) {
        display: none;
      }

      :deep(svg) {
        display: block;
      }

      &.active {
        background: var(--p-primary-active-color);
        color: var(--p-primary-color);
        border: none;
      }
    }

    .menu-footer {
      display: flex;
      justify-content: center;
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
