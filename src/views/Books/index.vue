<template>
  <div id="books-index">
    <nav class="tab-bar">
      <div class="bar-left">
        <Button
          v-if="hasMultiplePages"
          icon="pi pi-angle-left"
          severity="secondary"
          size="small"
          :disabled="currentPage === 0"
          @click="prevPage"
        />
        <Transition name="page-fade" mode="out-in">
          <SelectButton
            :key="currentPage"
            v-model="activeGroup"
            :options="pagedGroups"
            optionLabel="label"
            optionValue="value"
            size="small"
          >
            <template #option="slotProps">
              <span
                v-if="slotProps.option.label.length >= 5"
                v-tooltip.bottom="slotProps.option.label"
                class="label-ellipsis"
              >
                {{ slotProps.option.label }}
              </span>
              <span v-else>{{ slotProps.option.label }}</span>
            </template>
          </SelectButton>
        </Transition>
        <Button
          v-if="hasMultiplePages"
          icon="pi pi-angle-right"
          severity="secondary"
          size="small"
          :disabled="currentPage === totalPages - 1"
          @click="nextPage"
        />
      </div>
      <div class="bar-right">
        <SearchWrap />
        <SettingWrap />
      </div>
    </nav>

    <div class="content">
      <BookCase :group="activeGroup" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SettingWrap from './components/settingWrap.vue'
import SearchWrap from './components/searchWrap.vue'
import BookCase from './bookCase.vue'

const PAGE_SIZE = 8

const bookGroup = ref([
  { label: '未分组是啥', value: 'default' },
  { label: '常啊我的娃看', value: '111' },
  { label: '看完', value: '222' },
  { label: '玄幻', value: '333' },
  { label: '玄幻', value: '444' },
  { label: '玄幻', value: '555' },
  { label: '玄幻', value: '666' },
  { label: '玄幻', value: '777' },
  { label: '玄幻', value: '888' },
  { label: '玄幻', value: '999' },
  { label: '玄幻', value: '1223' },
  { label: '玄幻', value: '121752323' },
  { label: '玄幻', value: '121287689323' },
  { label: '玄幻', value: '121287323' },
])

const activeGroup = ref('default')
const currentPage = ref(0)

const totalPages = computed(() => Math.ceil(bookGroup.value.length / PAGE_SIZE))
const hasMultiplePages = computed(() => bookGroup.value.length > PAGE_SIZE)
const pagedGroups = computed(() => {
  const start = currentPage.value * PAGE_SIZE
  return bookGroup.value.slice(start, start + PAGE_SIZE)
})
const prevPage = () => {
  if (currentPage.value > 0) currentPage.value--
}
const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) currentPage.value++
}
</script>

<style lang="scss" scoped>
#books-index {
  .tab-bar {
    display: flex;
    background-color: transparent;
    align-items: center;
    gap: 0.5rem;
    width: 100%;

    .bar-left {
      flex: 8;
      height: 2rem;
      display: flex;
      align-items: center;
      gap: 0.375rem;
      min-width: 0;

      :deep(.p-button),
      :deep(.p-togglebutton) {
        height: 2rem;
      }

      :deep(.p-togglebutton-content) {
        width: 4.5rem;
        padding: 0 0.5rem;
      }

      .label-ellipsis {
        display: inline-block;
        max-width: 4rem;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        vertical-align: bottom;
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

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.15s ease;
}
.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}
</style>
