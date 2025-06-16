<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" @vue:mounted="onComponentMounted" />
  </router-view>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { themeStore } from '@/store/config'

const store = themeStore()
const router = useRouter()

// 在应用挂载前初始化主题
onBeforeMount(() => {
  store.init()
})

// 在应用挂载后确保主题应用正确
onMounted(() => {
  store.applyTheme()
})

// 在组件挂载时重新应用主题，确保每次路由切换都有正确的样式
const onComponentMounted = () => {
  store.applyTheme()
}

// 监听路由变化，确保样式正确应用
router.afterEach(() => {
  // 在下一个微任务周期应用主题样式，确保DOM已经更新
  setTimeout(() => {
    store.applyTheme()
  }, 0)
})
</script>
