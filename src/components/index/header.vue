<script setup lang="ts">

const dark: Ref<boolean> = ref(false)

/**
 * 改变html元素的类名
 */
const changeMode: Function = (): void => {
  dark.value = Boolean(localStorage.getItem('mode') == 'false' ? false : true || null)
  if (dark.value) {
    (document.querySelector('html') as HTMLElement).classList.add('dark');
    (document.querySelector('html') as HTMLElement).classList.remove('light')
  } else {
    (document.querySelector('html') as HTMLElement).classList.add('light');
    (document.querySelector('html') as HTMLElement).classList.remove('dark')
    localStorage.setItem('mode', 'true')
  }
  localStorage.setItem('mode', (!dark.value).toString())
}
const init: Function = (): void => {
  const themeMode: string | null = localStorage.getItem('mode')
  if (!themeMode) {
    return void 0
  } else {
    if (themeMode) {
      (document.querySelector('html') as HTMLElement).classList.add('dark');
      (document.querySelector('html') as HTMLElement).classList.remove('light')
    } else {
      (document.querySelector('html') as HTMLElement).classList.add('light');
      (document.querySelector('html') as HTMLElement).classList.remove('dark')
      localStorage.setItem('mode', 'true')
    }
  }
}
init()
</script>

<template>
  <div class="index-header">
    <ice-row>
      <ice-text>
        主题切换:
      </ice-text>
      <ice-button @click="changeMode">{{ dark ? 'light' : 'dark' }}</ice-button>
    </ice-row>
  </div>
</template>

<style scoped>

</style>