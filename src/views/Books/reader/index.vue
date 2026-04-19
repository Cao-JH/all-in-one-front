<template>
  <div class="reader-page">
    <ReaderCore :bookId="bookId" mode="page">
      <template #title>
        <span>独立阅读页</span>
      </template>

      <template #actions>
        <Button label="返回书架" size="small" severity="secondary" @click="goBack" />
      </template>
    </ReaderCore>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ReaderCore from '../components/reader/ReaderCore.vue'

const route = useRoute()
const router = useRouter()

const bookId = computed(() => route.params.bookId as string | undefined)

const goBack = () => {
  router.push('/')
}
</script>

<style scoped lang="scss">
.reader-page {
  width: 100vw;
  height: 100vh;
  min-height: 0;
  background: var(--p-surface-100);
}
</style>
