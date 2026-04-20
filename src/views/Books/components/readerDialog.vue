<template>
  <Dialog
    v-model:visible="visibleProxy"
    modal
    class="reader-dialog"
    :dismissableMask="false"
    :draggable="false"
    :resizable="false"
    :style="{ width: 'min(980px, 96vw)', height: 'min(90vh, 860px)' }"
  >
    <ReaderCore :bookId="bookId" :chapterId="chapterId" mode="mini">
      <template #title>
        <span>小窗阅读</span>
      </template>
    </ReaderCore>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ReaderCore from './readerCore.vue'

const props = defineProps<{
  visible: boolean
  bookId?: string | number | null
  chapterId?: string | number | null
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

const visibleProxy = computed({
  get: () => props.visible,
  set: (value) => emit('update:visible', value),
})
</script>

<style scoped lang="scss">
.reader-dialog {
  overflow: hidden;
}
</style>
