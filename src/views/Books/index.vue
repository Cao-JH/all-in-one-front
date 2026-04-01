<template>
  <div id="books-index">
    <nav class="tab-bar">
      <div class="bar-left">
        <!-- <button
          v-for="group in bookGroup"
          :key="group.value"
          class="tab-item"
          :class="{ active: activeGroup === group.value }"
          @click="activeGroup = group.value"
        >
          {{ group.label }}
        </button> -->
        <Tabs value="default" scrollable>
          <TabList>
            <Tab v-for="group in bookGroup" :key="group.value" :value="group.value">
              {{ group.label }}
            </Tab>
            <span class="tab-item icon">
              <AppSvgIcon name="add" :size="20" />
            </span>
          </TabList>
        </Tabs>
      </div>
      <div class="bar-right">
        <SearchWrap />
        <SettingWrap />
      </div>
    </nav>

    <div class="content">
      <!-- 这里放图书列表内容 -->
      <BookCase :group="activeGroup" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SettingWrap from './components/settingWrap.vue'
import SearchWrap from './components/searchWrap.vue'
import BookCase from './bookCase.vue'

// 图书分组
const bookGroup = ref([
  { label: '未分组', value: 'default' },
  { label: '常看', value: '111' },
  { label: '看完', value: '222' },
  { label: '玄幻', value: '333' },
  { label: '玄幻', value: '444' },
  { label: '玄幻', value: '555' },
  { label: '玄幻', value: '666' },
  { label: '玄幻', value: '777' },
  { label: '玄幻', value: '888' },
  { label: '玄幻', value: '999' },
  { label: '玄幻', value: '1223' },
  { label: '玄幻', value: '12223' },
  { label: '玄幻', value: '12323' },
  { label: '玄幻', value: '12423' },
  { label: '玄幻', value: '12523' },
  { label: '玄幻', value: '12523' },
  { label: '玄幻', value: '12323' },
  { label: '玄幻', value: '133223' },
  { label: '玄幻', value: '124423' },
  { label: '玄幻', value: '125523' },
  { label: '玄幻', value: '123323' },
  { label: '玄幻', value: '124423' },
  { label: '玄幻', value: '12444523' },
  { label: '玄幻', value: '12121232323' },
  { label: '玄幻', value: '1221312323' },
  { label: '玄幻', value: '121123324212323' },
  { label: '玄幻', value: '12121432142323' },
  { label: '玄幻', value: '1212131323' },
  { label: '玄幻', value: '1212122323' },
  { label: '玄幻', value: '12134322323' },
  { label: '玄幻', value: '12123546723' },
  { label: '玄幻', value: '121752323' },
  { label: '玄幻', value: '121287689323' },
  { label: '玄幻', value: '121287323' },
  { label: '玄幻', value: '121290323' },
  { label: '玄幻', value: '121238023' },
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
    gap: 1rem;
    width: 100%;

    .bar-left {
      flex: 8;
      min-width: 0;
      display: flex;
      align-items: center;

      :deep(.p-tabs) {
        width: 100%;
        min-width: 0;
      }

      :deep(.p-tablist) {
        width: 100%;
      }

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
      flex: 2;
      min-width: 0;
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
