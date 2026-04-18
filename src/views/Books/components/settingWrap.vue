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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const displayMethodList = [
  {
    label: '排列方式',
    icon: 'pi pi-users',
    items: [
      { value: 'card', icon: 'pi pi-th-large', command: () => {} },
      { value: 'list', icon: 'pi pi-bars', command: () => {} },
    ],
  },
  {
    label: '111',
    icon: 'pi pi-users',
    command: () => {
      console.log(111)
    },
  },
  {
    label: '222',
    icon: 'pi pi-users',
    command: () => {
      console.log(222)
    },
  },
]
const method = displayMethodList[0]?.items?.find((item) => item.value === 'card')
const displayMethod = ref(method)

const op = ref()

const toggleActionPopover = (event: any) => {
  op.value.toggle(event)
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
