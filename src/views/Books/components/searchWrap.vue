<template>
  <div ref="searchWrapRef" id="search-wrap">
    <button class="btn search" @click="toggleSearchInput">
      <AppSvgIcon name="search" :size="16" />搜索
    </button>
    <Transition name="search-panel">
      <div v-if="showSearchInput" class="search-panel">
        <AppSvgIcon name="search" :size="16" />
        <input
          ref="searchInputRef"
          v-model="searchKeyword"
          type="text"
          class="search-input"
          placeholder="搜索书名、作者"
        />
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { nextTick, ref } from 'vue'

const showSearchInput = ref(false)
const searchKeyword = ref('')
const searchWrapRef = ref<HTMLElement | null>(null)
const searchInputRef = ref<HTMLInputElement | null>(null)

const toggleSearchInput = async () => {
  showSearchInput.value = !showSearchInput.value

  if (showSearchInput.value) {
    await nextTick()
    searchInputRef.value?.focus()
  }
}

onClickOutside(searchWrapRef, () => {
  showSearchInput.value = false
})
</script>

<style lang="scss" scoped>
#search-wrap {
  position: relative;
  width: 100%;
  height: 2rem;
  line-height: 2rem;

  .btn {
    float: right;
    display: flex;
    border: none;
    align-items: center;
    justify-content: center;
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

  .search-panel {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 2rem;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0 0.75rem;
    border-radius: 0.5rem;
    border: 1.5px solid color-mix(in srgb, var(--card-reverse) 80%, transparent);
    background: linear-gradient(180deg, #f3f4f6, #eceff3);
    color: #4b5563;
    box-shadow:
      0 12px 28px rgba(15, 23, 42, 0.1),
      0 2px 8px rgba(15, 23, 42, 0.06);
    transform-origin: right center;
    z-index: 12;

    .search-input {
      flex: 1;
      min-width: 0;
      border: none;
      outline: none;
      background: transparent;
      color: #374151;
      font-size: 0.875rem;

      &::placeholder {
        color: #9ca3af;
      }
    }
  }

  .search-panel-enter-active,
  .search-panel-leave-active {
    transition:
      opacity 0.22s ease,
      transform 0.22s ease;
  }

  .search-panel-enter-from,
  .search-panel-leave-to {
    opacity: 0;
    transform: scaleX(0.2);
  }

  .search-panel-enter-to,
  .search-panel-leave-from {
    opacity: 1;
    transform: scaleX(1);
  }
}
</style>
