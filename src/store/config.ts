import { defineStore } from 'pinia'
import { ref } from 'vue'

const themeStore = defineStore('config', () => {
  const isDark = ref(false)

  const changeTheme = () => {
    isDark.value = !isDark.value
    applyTheme()
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  }

  // 应用主题样式到HTML元素
  const applyTheme = () => {
    if (!document) return // 在SSR环境或document不可用时不执行
    
    // 先移除所有主题类
    document.documentElement.classList.remove('light', 'dark')
    
    // 添加当前主题类
    document.documentElement.classList.add(isDark.value ? 'dark' : 'light')
  }

  // 初始化主题
  const init = () => {
    try {
      // 从本地存储中读取主题设置
      const savedTheme = localStorage.getItem('theme')
      isDark.value = savedTheme === 'dark'
      
      // 应用主题
      applyTheme()
    } catch (e) {
      console.error('初始化主题失败', e)
    }
  }

  return {
    isDark,
    changeTheme,
    init,     // 导出初始化函数，允许在合适的时机调用
    applyTheme // 导出应用主题函数，可以在需要时重新应用主题
  }
})

export { themeStore }