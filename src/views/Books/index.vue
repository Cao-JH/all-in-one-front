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
        <Button icon="pi pi-plus" severity="secondary" size="small" @click="openGroupDialog" />
      </div>
      <div class="bar-right">
        <div class="w-full">
          <IconField>
            <InputIcon class="pi pi-search" />
            <InputText
              v-model="searchKeyword"
              type="text"
              size="small"
              placeholder="搜索书名、作者"
              class="h-8 w-full"
            />
          </IconField>
        </div>
        <SettingWrap />
      </div>
    </nav>

    <div class="content">
      <BookCase :group="activeGroup" :viewMode="'list'" />
    </div>
  </div>

  <Dialog
    v-model:visible="groupDialogVisible"
    modal
    header="新增分组"
    class="dialog-box"
    :style="{ width: '25rem' }"
  >
    <div class="flex items-center gap-4 mb-4">
      <InputText
        v-model="groupName"
        size="small"
        id="groupName"
        class="flex-auto"
        autocomplete="off"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="取消"
        size="small"
        severity="secondary"
        @click="groupDialogVisible = false"
      ></Button>
      <Button size="small" type="button" label="添加" @click="addNewGroup"></Button>
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import SettingWrap from './components/settingWrap.vue'
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

// tab栏新增group
const groupDialogVisible = ref(false)
const groupName = ref('')
const openGroupDialog = () => {
  groupDialogVisible.value = true
}
const addNewGroup = () => {
  const temp = { label: groupName.value, value: Date.now().toString() }
  bookGroup.value.push(temp)
  groupDialogVisible.value = false
  activeGroup.value = temp.value // tab栏选中新增的标签
  currentPage.value = totalPages.value - 1 // tab栏同步跳转到当前页
}

// 搜索
const searchKeyword = ref('')
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
