<script setup lang="ts">
import { themeStore } from '@/store/config.ts'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../store/modules/user.ts'
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = themeStore()
const { isDark } = storeToRefs(store)

// 正确创建userStore实例
 const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { changeTheme } = store
// 获取用户显示名称
const getUserDisplayName = () => {
  if (!userInfo.value) return '用户'
  // 优先尝试显示昵称，如果没有再显示用户名
  return userInfo.value.nickname || userInfo.value.username || '用户'
}
// 获取用户名的第一个字符作为头像
const getUserFirstChar = () => {
  const name = getUserDisplayName()
  return name.substring(0, 1)
}
// 判断用户是否已登录
const isLoggedIn = computed(() => {
  return userInfo.value && Object.keys(userInfo.value).length > 0
})
// 跳转到登录页面
const goToLogin = () => {
  router.push('/login')
}
// 退出登录
const handleLogout = async () => {
  await userStore.logout()
}
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
        theme:
      </ice-text>
      <ice-button @click="changeTheme">{{ isDark ? 'light' : 'dark' }}</ice-button>
    </ice-row>

    <div class="user-section">
      <!-- 未登录状态 -->
      <template v-if="!isLoggedIn">
        <ice-text nowrap class="login-status">
          暂未登录
        </ice-text>
        <ice-button @click="goToLogin">
          登录
        </ice-button>
      </template>

      <!-- 已登录状态 -->
      <template v-else>
        <div class="user-info-container">
          <!-- 用户头像图标 -->
          <div class="status-icon logged-in">
            <span class="user-icon">{{ getUserFirstChar() }}</span>
          </div>
          <!-- 仅显示用户名 -->
          <ice-text nowrap class="welcome-text">
            {{ getUserDisplayName() }}
          </ice-text>
        </div>
        <ice-button type="danger" @click="handleLogout" hover>
          退出
        </ice-button>
      </template>
    </div>

  </div>
</template>

<style scoped lang="less">
.index-header {
  max-width: @max-page-width;
  padding: 10px 15px;
}

.user-section {
  display: flex;
  align-items: center;
  gap: 12px;

  .user-info-container {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-right: 4px;
  }

  .status-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.1);
    color: #aaa;
    font-size: 16px;

    &.logged-in {
      background-color: rgba(64, 158, 255, 0.15);
      color: #409EFF;
    }

    .user-icon {
      font-size: 14px;
      font-weight: 500;
      text-transform: uppercase;
    }
  }

  .login-status, .welcome-text {
    margin-right: 5px;
    font-size: 14px;
    color: #bbb;
  }

  .welcome-text {
    color: #409EFF;
    font-weight: 500;
  }

  .custom-button {
    cursor: pointer;
    background: linear-gradient(45deg, #4d7fff, #2d5cff);
    color: white;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: 14px;
    transition: all 0.3s ease;
    box-shadow: 0 3px 8px rgba(45, 92, 255, 0.2);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(45, 92, 255, 0.3);
      background: linear-gradient(45deg, #5d8fff, #3d6cff);
    }

    &:active {
      transform: translateY(0);
      box-shadow: 0 2px 5px rgba(45, 92, 255, 0.3);
    }

    &.logout {
      background: linear-gradient(45deg, #ff4d4d, #ff2d2d);
      box-shadow: 0 3px 8px rgba(255, 45, 45, 0.2);

      &:hover {
        background: linear-gradient(45deg, #ff5d5d, #ff3d3d);
        box-shadow: 0 5px 15px rgba(255, 45, 45, 0.3);
      }
    }
  }
}
</style>