<template>
  <div class="login-container" v-show="pageVisible" :class="{loaded: pageLoaded}">
    <!-- 动态背景效果 -->
    <div class="bg-pattern"></div>
    <div class="bg-circles">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
      <div class="circle circle-4"></div>
      <div class="circle circle-5"></div>
      <div class="glow glow-1"></div>
      <div class="glow glow-2"></div>
    </div>
    <div class="animated-squares">
      <div class="square" v-for="i in 10" :key="i"></div>
    </div>
    
    <!-- 返回首页按钮 -->
    <div class="back-button">
      <ice-button @click="goBack" size="small" type="text" class="back-btn-custom" icon="arrow-left">
        返回首页
      </ice-button>
    </div>
    
    <!-- 登录盒子 -->
    <div class="login-box">
      <div class="login-box-shine"></div>
      <div class="login-header">
        <div class="logo-wrapper">
          <div class="logo-icon">
            <span>简</span>
            <div class="logo-glow"></div>
          </div>
        </div>
        <h2>欢迎登录</h2>
        <p>简历管理系统</p>
      </div>
      
      <div class="login-form">
        <div class="form-item">
          <div class="input-group">
            <div class="input-icon">
              <span class="icon-placeholder">用</span>
            </div>
            <ice-input 
              v-model="loginForm.userName" 
              placeholder="请输入用户名" 
              class="styled-input"
            />
          </div>
          <div class="error-message" v-if="errors.userName">{{ errors.userName }}</div>
        </div>
        
        <div class="form-item">
          <div class="input-group">
            <div class="input-icon">
              <span class="icon-placeholder">密</span>
            </div>
            <ice-input 
              v-model="loginForm.password" 
              type="password" 
              placeholder="请输入密码" 
              class="styled-input"
            />
          </div>
          <div class="error-message" v-if="errors.password">{{ errors.password }}</div>
        </div>
        
        <div class="form-actions">
          <ice-button 
            @click="handleLogin" 
            :loading="loading" 
            type="primary" 
            class="login-button" 
            hover>
            {{ loading ? '登录中...' : '登 录' }}
          </ice-button>
        </div>
      </div>
      
      <div class="login-footer">
        <p>简历管理系统 &copy; 2025</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { iceMessage } from 'icepro'

const router = useRouter()
const loading = ref(false)
const userStore = useUserStore() // 创建store实例

// 页面加载动画状态
const pageVisible = ref(false)
const pageLoaded = ref(false)

// 页面入场动画
onMounted(() => {
  setTimeout(() => {
    pageVisible.value = true
    setTimeout(() => {
      pageLoaded.value = true
    }, 300)
  }, 100)
})
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
const goHome = () => {
  router.push('/')
}
</script>

<style scoped lang="less">
/* 全局样式 */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--color-theme-100);
  position: relative;
  overflow: hidden;
  opacity: 0;
  transition: opacity 0.8s ease-out;
  
  &.loaded {
    opacity: 1;
    
    .login-box {
      transform: translateY(0) scale(1);
      opacity: 1;
    }
    
    .back-button {
      transform: translateX(0);
      opacity: 1;
    }
    
    .bg-circles .circle,
    .animated-squares .square,
    .glow {
      opacity: 1;
    }
  }
}

/* 装饰性背景 */
.bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px);
  background-size: 30px 30px;
  opacity: 0.15;
}

.bg-circles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-light) 0%, var(--primary) 100%);
  opacity: 0.1;
}

.circle-1 {
  width: 500px;
  height: 500px;
  left: -200px;
  top: -100px;
  animation: float 15s infinite ease-in-out;
}

.circle-2 {
  width: 300px;
  height: 300px;
  right: -80px;
  bottom: -80px;
  animation: float 20s infinite ease-in-out reverse;
}

.circle-3 {
  width: 200px;
  height: 200px;
  right: 300px;
  top: 120px;
  animation: float 25s infinite ease-in-out;
}

.circle-4 {
  width: 120px;
  height: 120px;
  left: 70%;
  top: 70%;
  animation: float 18s infinite ease-in-out 1s;
}

.circle-5 {
  width: 160px;
  height: 160px;
  left: 30%;
  bottom: -50px;
  animation: float 22s infinite ease-in-out 0.5s;
}

.glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0;
  transition: opacity 1.5s ease-out;
}

.glow-1 {
  width: 400px;
  height: 400px;
  background: var(--primary);
  top: -100px;
  right: -100px;
  animation: pulse 8s infinite alternate;
}

.glow-2 {
  width: 350px;
  height: 350px;
  background: var(--primary-light);
  bottom: -50px;
  left: -100px;
  animation: pulse 10s infinite alternate-reverse;
}

@keyframes float {
  0% { transform: translate(0, 0) rotate(0deg); }
  50% { transform: translate(20px, 20px) rotate(5deg); }
  100% { transform: translate(0, 0) rotate(0deg); }
}

@keyframes pulse {
  0% { opacity: 0.2; transform: scale(0.9); }
  100% { opacity: 0.4; transform: scale(1.1); }
}

.animated-squares {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  pointer-events: none;
}

.square {
  position: absolute;
  width: 15px;
  height: 15px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 3px;
  opacity: 0;
  transition: opacity 2s ease-out;
  animation: float-random 20s infinite linear;
}

.square:nth-child(1) { top: 10%; left: 20%; animation-duration: 15s; }
.square:nth-child(2) { top: 40%; left: 80%; animation-duration: 18s; animation-delay: 1s; }
.square:nth-child(3) { top: 70%; left: 10%; animation-duration: 20s; animation-delay: 2s; }
.square:nth-child(4) { top: 5%; left: 60%; animation-duration: 22s; animation-delay: 0.5s; }
.square:nth-child(5) { top: 80%; left: 30%; animation-duration: 25s; animation-delay: 1.5s; }
.square:nth-child(6) { top: 30%; left: 50%; animation-duration: 17s; animation-delay: 3s; }
.square:nth-child(7) { top: 60%; left: 70%; animation-duration: 24s; animation-delay: 2.5s; }
.square:nth-child(8) { top: 75%; left: 40%; animation-duration: 21s; animation-delay: 1s; }
.square:nth-child(9) { top: 20%; left: 80%; animation-duration: 19s; animation-delay: 0s; }
.square:nth-child(10) { top: 50%; left: 10%; animation-duration: 16s; animation-delay: 4s; }

@keyframes float-random {
  0% { transform: translate(0, 0) rotate(0deg); }
  25% { transform: translate(20px, 30px) rotate(90deg); }
  50% { transform: translate(-20px, 40px) rotate(180deg); }
  75% { transform: translate(-30px, -20px) rotate(270deg); }
  100% { transform: translate(0, 0) rotate(360deg); }
}

/* 返回按钮 */
.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  opacity: 0;
  transform: translateX(-20px);
  transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: 0.2s;
  
  :deep(.ice-button) {
    background: var(--color-theme-50);
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 8px 16px;
    transition: all 0.3s ease;

    &:hover {
      background: var(--color-theme-200);
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  }
}

/* 登录盒子 */
.login-box {
  width: 400px;
  background-color: var(--color-theme-100);
  border-radius: 20px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.2),
    0 15px 20px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.4);
  padding: 40px;
  position: relative;
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  overflow: hidden;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transform-style: preserve-3d;
  perspective: 800px;
  opacity: 0;
  transform: translateY(30px) scale(0.95);
  
  &:hover {
    transform: translateY(-8px) rotateX(2deg) rotateY(-2deg);
    box-shadow: 
      0 25px 65px rgba(0, 0, 0, 0.25),
      0 10px 20px rgba(0, 0, 0, 0.15),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5);
  }
}

.login-box-shine {
  position: absolute;
  top: -200px;
  left: -200px;
  width: 200px;
  height: 800px;
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: rotate(45deg);
  animation: shine 6s infinite;
  pointer-events: none;
}

@keyframes shine {
  0% {
    transform: translateX(-200px) rotate(45deg);
  }
  100% {
    transform: translateX(600px) rotate(45deg);
  }
}

/* 登录头部 */
.login-header {
  text-align: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;
}

.logo-wrapper {
  margin: 0 auto 20px;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon {
  width: 70px;
  height: 70px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 
    0 10px 20px rgba(0, 0, 0, 0.2),
    inset 0 0 0 1px rgba(255, 255, 255, 0.3);
  position: relative;
  animation: pulse-subtle 3s infinite alternate ease-in-out;
  z-index: 1;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 30%;
    background: linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(255,255,255,0));
    border-radius: 20px 20px 100px 100px;
  }
  
  span {
    color: white;
    font-size: 34px;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 2;
    letter-spacing: 2px;
    transform: translateY(-2px);
  }
}

.logo-glow {
  position: absolute;
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%);
  border-radius: 50%;
  z-index: 0;
  animation: glow-pulse 2s infinite alternate ease-in-out;
  opacity: 0;
}

@keyframes pulse-subtle {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}

@keyframes glow-pulse {
  0% { opacity: 0.5; transform: scale(0.8); }
  100% { opacity: 0.8; transform: scale(1.2); }
}

.login-header h2 {
  font-size: 28px;
  color: var(--color);
  margin-bottom: 10px;
  font-weight: 600;
  letter-spacing: 1px;
}

.login-header p {
  color: var(--color-bleak);
  font-size: 16px;
  opacity: 0.8;
}

/* 表单部分 */
.login-form {
  position: relative;
  z-index: 1;

  .form-item {
    margin-bottom: 24px;
  }
  
  .input-group {
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 
      0 2px 10px rgba(0, 0, 0, 0.04),
      inset 0 0 0 1px rgba(0, 0, 0, 0.03),
      0 1px 2px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
      box-shadow: 
        0 4px 15px rgba(0, 0, 0, 0.08),
        inset 0 0 0 1px rgba(var(--primary-rgb), 0.3),
        0 1px 2px rgba(0, 0, 0, 0.15);
    }
    
    &:focus-within {
      box-shadow: 
        0 4px 20px rgba(var(--primary-rgb), 0.15),
        inset 0 0 0 2px rgba(var(--primary-rgb), 0.4),
        0 1px 3px rgba(0, 0, 0, 0.1);
      transform: translateY(-2px);
    }
  }
  
  .input-icon {
    background: var(--color-theme-200);
    width: 54px;
    height: 54px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(to right, transparent, rgba(255, 255, 255, 0.5), transparent);
    }
    
    .icon-placeholder {
      color: var(--primary);
      font-size: 14px;
      font-weight: 600;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 1;
    }
    
    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 10%;
      right: 10%;
      height: 4px;
      border-radius: 2px;
      background: var(--primary-light);
      opacity: 0;
      transform: translateY(4px);
      transition: all 0.3s ease;
    }
  }
  
  .input-group:focus-within .input-icon:after {
    opacity: 1;
    transform: translateY(0);
  }
  
  :deep(.styled-input) {
    flex: 1;
    height: 54px;
    border: none;
    box-shadow: none;
    border-radius: 0;
    background: var(--color-theme-100);
    font-size: 16px;
    padding: 0 15px;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
    
    &::placeholder {
      color: var(--color-bleak);
      opacity: 0.6;
    }
    
    &:focus {
      box-shadow: none;
      background: var(--color-theme-50);
    }
  }
  
  .error-message {
    color: var(--danger);
    font-size: 13px;
    margin-top: 10px;
    margin-left: 5px;
    min-height: 18px;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    opacity: 0.9;
    animation: shake-subtle 0.5s cubic-bezier(.36,.07,.19,.97) both;
    transform: translateX(0);
    backface-visibility: hidden;
    perspective: 1000px;
    
    &::before {
      content: '!';
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 18px;
      height: 18px;
      background: linear-gradient(135deg, var(--danger), #ff6b6b);
      color: white;
      border-radius: 50%;
      font-size: 11px;
      font-weight: bold;
      margin-right: 8px;
      box-shadow: 0 2px 5px rgba(var(--danger-rgb), 0.3);
    }
  }
  
  @keyframes shake-subtle {
    10%, 90% { transform: translateX(-1px); }
    20%, 80% { transform: translateX(1px); }
    30%, 50%, 70% { transform: translateX(-2px); }
    40%, 60% { transform: translateX(2px); }
  }
}

.form-actions {
  display: flex;
  flex-direction: column;
  margin-top: 30px;
}

.login-button {
  width: 100%;
  height: 56px;
  border-radius: 14px;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 2px;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  box-shadow: 
    0 10px 20px rgba(var(--primary-rgb), 0.2),
    0 6px 6px rgba(0, 0, 0, 0.1),
    inset 0 2px 0 rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  margin-top: 10px;
  
  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 
      0 15px 30px rgba(var(--primary-rgb), 0.25),
      0 8px 8px rgba(0, 0, 0, 0.15),
      inset 0 2px 0 rgba(255, 255, 255, 0.4);
    letter-spacing: 2.5px;
  }
  
  &:active {
    transform: translateY(2px) scale(0.98);
    box-shadow: 
      0 5px 15px rgba(var(--primary-rgb), 0.2),
      0 3px 3px rgba(0, 0, 0, 0.1);
    transition-duration: 0.1s;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50%;
    background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0));
    border-radius: 14px 14px 50px 50px / 14px 14px 25px 25px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: all 0.6s ease;
  }
  
  &:hover::after {
    left: 100%;
  }
}

/* 页脚 */
.login-footer {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid var(--color-theme-200);
  
  p {
    font-size: 13px;
    color: var(--color-bleak);
    opacity: 0.7;
  }
}
</style>
