<template>
  <div id="reader-page" class="w-screen h-screen mh-0 bg-(--p-surface-100)">
    <ReaderCore :bookId="bookId" mode="page" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ReaderCore from './components/readerCore.vue'

const route = useRoute()
const router = useRouter()

const bookId = computed(() => route.params.bookId as string | undefined)

const goBack = () => {
  router.push('/')
}
</script>

<style scoped lang="scss">
</style>
