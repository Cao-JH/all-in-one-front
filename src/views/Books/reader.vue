<template>
  <div id="reader-page" class="w-screen h-screen mh-0 bg-(--p-surface-100)">
    <ReaderCore :bookId="bookId" mode="page" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ReaderCore from './components/readerCore.vue'

const route = useRoute()
const bookId = computed(() => route.params.bookId as string | undefined)

</script>

<style scoped lang="scss"></style>
