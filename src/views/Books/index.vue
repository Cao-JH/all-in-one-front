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
              @keyup.enter="openSearchList"
            />
          </IconField>
        </div>
        <SettingWrap v-model:displayMethod="displayMethod" />
      </div>
    </nav>

    <div class="content">
      <BookCase :group="activeGroup" :displayMethod="displayMethod" />
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
        id="groupName"
        v-model="groupName"
        size="small"
        class="flex-auto"
        autocomplete="off"
        @keyup.enter="addNewGroup"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="取消"
        size="small"
        severity="secondary"
        @click="groupDialogVisible = false"
      />
      <Button size="small" type="button" label="添加" @click="addNewGroup" />
    </div>
  </Dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import SettingWrap from './components/settingWrap.vue'
import BookCase from './bookCase.vue'

const PAGE_SIZE = 8
const router = useRouter()

const bookGroup = ref([
  { label: '未分组', value: 'default' },
  { label: '常读', value: 'reading' },
  { label: '已读', value: 'done' },
  { label: '玄幻', value: 'fantasy' },
  { label: '科幻', value: 'sci-fi' },
  { label: '历史', value: 'history' },
  { label: '都市', value: 'city' },
  { label: '收藏', value: 'favorite' },
])

const activeGroup = ref('default')
const displayMethod = ref<'grid' | 'list'>('list')
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

const groupDialogVisible = ref(false)
const groupName = ref('')

const openGroupDialog = () => {
  groupDialogVisible.value = true
}

const addNewGroup = () => {
  const label = groupName.value.trim()

  if (!label) return

  const group = { label, value: Date.now().toString() }
  bookGroup.value.push(group)
  groupName.value = ''
  groupDialogVisible.value = false
  activeGroup.value = group.value
  currentPage.value = totalPages.value - 1
}

const searchKeyword = ref('')

const openSearchList = () => {
  const keyword = searchKeyword.value.trim()

  if (!keyword) return

  router.push({
    name: 'BooksSearch',
    query: {
      keyword,
    },
  })
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
    padding: 1rem 2rem 0 1rem;
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
