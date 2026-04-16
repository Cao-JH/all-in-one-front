<template>
  <div ref="settingWrapRef" id="setting-wrap">
    <!-- <button class="btn setting" :class="{ active: showActionPopover }" @click="toggleActionPopover">
      <AppSvgIcon name="card" :size="20" />
    </button>
    <Transition name="action-popover">
      <div v-if="showActionPopover" class="action-popover">
        <div class="list-item">
          <div class="popover-title"></div>
          <div class="popover-content display-content">
            <button
              v-for="item in displayMethodList"
              :key="item.value"
              class="display-item"
              :class="{ active: displayMethod === item.value }"
              @click="handleDisplayClick(item.value)"
            >
              <span>{{ item.label }}</span>
            </button>
          </div>
        </div>
      </div>
    </Transition> -->
    <Button
      icon="pi pi-objects-column"
      size="small"
      variant="outlined"
      class="h-8"
      @click="toggleActionPopover"
    />
    <Popover ref="op">
      <div class="flex flex-col gap-4 w-[10rem]">
        <ul class="list-none p-0 m-0 flex flex-col gap-0.5">
          <li v-for="(method, i) in displayMethodList" :key="i" class="flex items-center gap-2">
            <div v-if="method.items" class="w-full">
              <div class="text-sm">{{ method.label }}</div>
              <div class="flex flex-row justify-around items-center w-full">
                <SelectButton
                  v-model="displayMethod"
                  :options="method.items"
                  optionLabel="value"
                  dataKey="value"
                  aria-labelledby="custom"
                >
                  <template #option="slotProps">
                    <i :class="slotProps.option.icon"></i>
                  </template>
                </SelectButton>
                <!-- <div v-for="item in method.items" :key="item.label">
                  <div v-if="item.icon" >
                    <Button
                      class="method-button"
                      :class="{ active: displayFormat === item.icon }"
                      severity="secondary"
                      text
                      @click="switchFormat(item.icon)"
                    >
                      <i :class="`pi ${item.icon}`"></i>
                    </Button>
                  </div>
                  <div v-else>{{ item.label }}</div>
                </div> -->
              </div>
            </div>
            <div v-else class="text-sm">11111</div>
          </li>
        </ul>
      </div>
    </Popover>
  </div>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'

// const showActionPopover = ref(false)
// const displayMethod = ref('card')
// const settingWrapRef = ref<HTMLElement | null>(null)

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
    command: () => {},
  },
  {
    label: '222',
    icon: 'pi pi-users',
    command: () => {},
  },
]
const method = displayMethodList[0]?.items?.find(item => item.value === 'card');
const displayMethod = ref(method)

// const toggleActionPopover = () => {
//   showActionPopover.value = !showActionPopover.value
// }

// const handleDisplayClick = (value: string) => {
//   displayMethod.value = value
// }

// onClickOutside(settingWrapRef, () => {
//   showActionPopover.value = false
// })

const op = ref()

const toggleActionPopover = (event: any) => {
  op.value.toggle(event)
}
</script>

<style lang="scss" scoped>
#setting-wrap {
  // position: relative;

  // .btn {
  //   display: flex;
  //   border: none;
  //   align-items: center;
  //   justify-content: center;
  //   height: 2rem;
  //   line-height: 2rem;
  //   border-radius: 0.5rem;
  //   font-size: 1rem;
  //   gap: 0.25rem;
  //   cursor: pointer;
  //   transition: all 0.3s ease;

  //   &:hover {
  //     transform: translateY(-2px);
  //   }

  //   &:active {
  //     transform: translateY(0);
  //   }
  // }

  // .setting {
  //   width: 2rem;
  //   background-color: var(--card);
  //   color: var(--text-secondary);
  //   border: 1.5px solid var(--text-secondary);

  //   &:hover,
  //   &.active {
  //     color: var(--text);
  //     border: 1.5px solid var(--text);
  //   }
  // }

  // .action-popover {
  //   position: absolute;
  //   top: calc(100% + 0.625rem);
  //   right: 0;
  //   min-width: 10rem;
  //   padding: 0.5rem;
  //   border-radius: 0.5rem;
  //   border: 1px solid color-mix(in srgb, var(--text-secondary) 18%, transparent);
  //   background: linear-gradient(180deg, color-mix(in srgb, var(--card) 96%, white), var(--card));
  //   box-shadow:
  //     0 12px 32px rgba(15, 23, 42, 0.14),
  //     0 2px 8px rgba(15, 23, 42, 0.08);
  //   backdrop-filter: blur(14px);
  //   transform-origin: top right;
  //   z-index: 10;

  //   .list-item {
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: center;
  //     align-items: flex-start;
  //     font-size: 1rem;

  //     .popover-content {
  //     }

  //     .display-content {
  //       width: 100%;
  //       height: 3rem;
  //       display: flex;
  //       flex-direction: row;
  //       justify-content: space-around;
  //       align-items: center;

  //       .display-item {
  //         border: none;
  //         height: 2rem;
  //         width: 2rem;
  //         font-size: 0.5rem;
  //         background-color: burlywood;
  //         color: var(--text);

  //         &:hover,
  //         &.active {
  //           background-color: color-mix(in srgb, var(--card-reverse) 10%, transparent);
  //           transform: translateY(-1px);
  //         }
  //       }
  //     }
  //   }
  // }

  // .action-popover-enter-active,
  // .action-popover-leave-active {
  //   transition:
  //     opacity 0.22s ease,
  //     transform 0.22s ease;
  // }

  // .action-popover-enter-from,
  // .action-popover-leave-to {
  //   opacity: 0;
  //   transform: translateY(-8px) scale(0.96);
  // }

  // .action-popover-enter-to,
  // .action-popover-leave-from {
  //   opacity: 1;
  //   transform: translateY(0) scale(1);
  // }
}
</style>
