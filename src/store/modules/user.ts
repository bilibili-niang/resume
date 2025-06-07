import { defineStore } from 'pinia'
import { ref } from 'vue'

const userStore = defineStore('user', () => {
  const userInfo = ref({})
  return { userInfo }
})
export { userStore }