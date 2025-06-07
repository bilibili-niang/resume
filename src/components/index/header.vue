<script setup lang="ts">
import { themeStore } from '@/store/config.ts'
import { storeToRefs } from 'pinia'
import { userStore } from '../../store/modules/user.ts'

const userStoreEle = userStore()
const store = themeStore()
const { isDark } = storeToRefs(store)
const { userInfo } = storeToRefs(userStoreEle)
const { changeTheme } = store


</script>

<template>
  <div
    class="index-header row just-content-space-between alignC"
    @click="()=>{
  console.log('userInfo')
  console.log(userInfo.value)
}"
  >
    <ice-row>
      <ice-text>
        主题切换:
      </ice-text>
      <ice-button @click="changeTheme">{{ isDark ? 'light' : 'dark' }}</ice-button>
    </ice-row>

    <div>
      <ice-text nowrap>
        暂未登录
      </ice-text>
    </div>

  </div>
</template>

<style scoped lang="less">
.index-header {
  //flex: 1;
}
</style>