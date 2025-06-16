<template>
  <div class="login-container">
    <div class="login-box">
      <div class="login-header">
        <h2>系统登录</h2>
      </div>
      <div class="login-form">
        <div class="form-item">
          <div class="input-label">用户名</div>
          <ice-input v-model="loginForm.userName" placeholder="请输入用户名"/>
          <div class="error-message" v-if="errors.userName">{{ errors.userName }}</div>
        </div>
        <div class="form-item">
          <div class="input-label">密码</div>
          <ice-input v-model="loginForm.password" type="password" placeholder="请输入密码"/>
          <div class="error-message" v-if="errors.password">{{ errors.password }}</div>
        </div>
        <div class="form-actions">
          <ice-button @click="handleLogin" :loading="loading" type="shadow-r-t" hover>
            {{ loading ? '登录中...' : '登 录' }}
          </ice-button>
          <ice-button @click="goBack" hover>
            返回首页
          </ice-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { userStore } from '@/store/modules/user'
import { iceMessage } from 'icepro'

const router = useRouter()
const loading = ref(false)
// 表单数据
const loginForm = reactive({
  userName: '',
  password: ''
})
// 错误信息
const errors = reactive({
  userName: '',
  password: ''
})
// 验证表单
const validateForm = () => {
  // 重置错误
  errors.userName = ''
  errors.password = ''
  let isValid = true
  // 验证用户名
  if (!loginForm.userName.trim()) {
    errors.userName = '请输入用户名'
    isValid = false
  }
  // 验证密码
  if (!loginForm.password) {
    errors.password = '请输入密码'
    isValid = false
  } else if (loginForm.password.length < 6) {
    errors.password = '密码长度不能少于6位'
    isValid = false
  }
  return isValid
}
// 处理登录
const handleLogin = async () => {
  if (!validateForm()) return
  try {
    loading.value = true
    await userStore.login(loginForm)
    // 使用icepro提示
    iceMessage({
      message: '登录成功',
      type: 'success'
    })
    // 登录成功后跳转到首页
    router.push('/')
  } catch (error: any) {
    iceMessage({
      message: error.message || '登录失败',
      type: 'danger'
    })
  } finally {
    loading.value = false
  }
}
// 返回首页
const goBack = () => {
  router.push('/')
}
</script>

<style scoped lang="less">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--bac) 0%, var(--bac-bleak) 100%);
  padding: 20px;
}

.login-box {
  width: 380px;
  background-color: var(--bac);
  border-radius: 12px;
  box-shadow: 0 4px 20px @fontColor-bleak-bleak;
  padding: 30px;
  position: relative;
  transition: all @time-n ease;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: -10px;
    left: -10px;
    width: 20px;
    height: 20px;
    background: linear-gradient(45deg, @themeColor, @themeColor-bleak);
    border-radius: 50%;
    opacity: 0.1;
    transform: scale(8);
    z-index: 0;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px @fontColor-bleak-bleak;
  }
}

.login-header {
  text-align: center;
  margin-bottom: 25px;
  position: relative;
  z-index: 1;

  h2 {
    font-size: 24px;
    color: var(--color);
    margin-bottom: 10px;
    font-weight: @fontWeight-l;
  }

  p {
    color: var(--color-bleak);
    font-size: @fontSize-l;
  }
}

.login-form {
  position: relative;
  z-index: 1;

  .form-item {
    margin-bottom: 20px;
  }

  .input-label {
    display: block;
    margin-bottom: 8px;
    font-size: @fontSize-l;
    color: var(--color);
    font-weight: @fontWeight-n;
  }

  .error-message {
    color: @dangerColor;
    font-size: @fontSize-s-su;
    margin-top: 5px;
    min-height: 18px;
    transition: all @time-s ease;
  }
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;

  .submit-btn {
    width: 48%;
    height: 40px;
    color: @themeColorReversal;
    background: linear-gradient(90deg, @themeColor, @themeColor-bleak);
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: all 0.6s ease;
    }

    &:hover:before {
      left: 100%;
    }
  }

  .back-btn {
    width: 48%;
    height: 40px;
    color: var(--color-bleak);
    background: var(--bac-bleak);
    border: 1px solid @fontColor-bleak-bleak;
    border-radius: 20px;
    transition: all @time-n ease;

    &:hover {
      background: @fontColor-bleak-bleak;
      color: var(--color);
    }
  }
}
</style>
