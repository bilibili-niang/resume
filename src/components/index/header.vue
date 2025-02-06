<script setup lang="ts">
import { themeStore } from '@/store/config.ts'
import { storeToRefs } from 'pinia'


const store = themeStore()
const { isDark } = storeToRefs(store)
const { changeTheme } = store

</script>

<template>
  <div class="index-header">
    <ice-row>
      <ice-text>
        主题切换:
      </ice-text>
      <ice-button @click="changeTheme">{{ isDark ? 'light' : 'dark' }}</ice-button>
    </ice-row>
  </div>
</template>

<style scoped>

</style>