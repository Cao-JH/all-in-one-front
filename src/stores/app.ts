import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const appName = ref('All In One Front')

  return {
    appName,
  }
})
