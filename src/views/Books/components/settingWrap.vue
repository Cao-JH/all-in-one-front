<template>
  <div ref="settingWrapRef" id="setting-wrap">
    <Button
      icon="pi pi-objects-column"
      size="small"
      variant="outlined"
      class="h-8"
      @click="toggleActionPopover"
    />
    <Popover ref="op">
      <div class="flex flex-col gap-4 w-40">
        <ul class="list-none p-0 m-0 flex flex-col gap-2">
          <li v-for="(method, i) in displayMethodList" :key="i" class="flex items-center">
            <div v-if="method.items" class="w-full">
              <div class="op-list-title">
                {{ method.label }}
              </div>
              <div class="flex flex-row justify-around items-center w-full mt-2">
                <SelectButton
                  v-model="displayMethod"
                  :options="method.items"
                  optionLabel="value"
                  optionValue="value"
                  :allowEmpty="false"
                  dataKey="value"
                  aria-labelledby="custom"
                  fluid
                >
                  <template #option="slotProps">
                    <i :class="slotProps.option.icon"></i>
                  </template>
                </SelectButton>
              </div>
            </div>
            <div v-else class="op-list-title cursor-pointer hover:text-primary transition-colors" @click="method.command?.()">
              {{ method.label }}
            </div>
          </li>
        </ul>
      </div>
    </Popover>
    <input
      ref="fileInputRef"
      type="file"
      accept=".txt"
      class="hidden"
      @change="onFileSelected"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { uploadLocalBook } from '@/api/book'

const props = defineProps<{
  displayMethod: 'grid' | 'list'
}>()

const displayMethodList = [
  {
    label: '排列方式',
    icon: 'pi pi-users',
    items: [
      { value: 'grid', icon: 'pi pi-th-large' },
      { value: 'list', icon: 'pi pi-bars' },
    ],
  },
  {
    label: '本地上传',
    icon: 'pi pi-upload',
    command: triggerUpload,
  },
  {
    label: '222',
    icon: 'pi pi-users',
    command: () => {
      console.log(222)
    },
  },
]

const emit = defineEmits<{
  (e: 'update:displayMethod', value: 'grid' | 'list'): void
}>()

const displayMethod = computed<'grid' | 'list' | null>({
  get: () => props.displayMethod || 'grid',
  set: (value) => emit('update:displayMethod', value ?? 'grid'),
})

const op = ref()
const fileInputRef = ref<HTMLInputElement>()
const toast = useToast()

const toggleActionPopover = (event: any) => {
  op.value.toggle(event)
}

function triggerUpload() {
  op.value.hide()
  fileInputRef.value?.click()
}

async function onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  try {
    toast.add({ severity: 'info', summary: '上传中', detail: `正在上传《${file.name}》...`, life: 3000 })
    await uploadLocalBook({ file })
    toast.add({ severity: 'success', summary: '上传成功', detail: `《${file.name}》上传并解析完成`, life: 4000 })
  } catch {
    toast.add({ severity: 'error', summary: '上传失败', detail: `《${file.name}》上传失败，请重试`, life: 4000 })
  } finally {
    input.value = ''
  }
}
</script>

<style lang="scss" scoped>
#setting-wrap {
}

.op-list-title {
  width: 100%;
  line-height: 1rem;
  cursor: pointer;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  background-color: transparent;
  padding: 0.25rem 0.5rem;

  &:hover {
    background-color: var(--p-surface-100);
  }

  &:active {
    background-color: var(--p-surface-200);
  }
}
</style>
