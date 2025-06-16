<template>
  <div class="resume-list">
    <div class="header">
      <ice-row class="title-row">
        <ice-text tag="h1" class="title">Resumes</ice-text>
        <div class="view-options">
          <ice-button class="view-btn grid-view" active>
            <i class="iconfont icon-grid"></i>
          </ice-button>
          <ice-button class="view-btn list-view">
            <i class="iconfont icon-list"></i>
          </ice-button>
        </div>
      </ice-row>
    </div>

    <div class="resume-grid">
      <!-- 创建新简历卡片 -->
      <div class="resume-card create-new" @click="createNewResume">
        <div class="card-content create-content">
          <div class="icon-container">
            <i class="iconfont icon-add"></i>
          </div>
          <div class="card-info">
            <ice-text class="card-title">创建一个新简历</ice-text>
            <ice-text class="card-desc">从头开始创建</ice-text>
          </div>
          <div class="pattern-overlay"></div>
        </div>
      </div>

      <!-- 导入简历功能已移除 -->

      <!-- 已有简历列表 -->
      <div v-for="resume in resumeList" :key="resume.id" class="resume-card" @click="openResume(resume.id)">
        <div class="card-content preview">
          <!-- 判断图片存在否，不存在则使用默认图片 -->
          <img class="resume-thumbnail" 
               :src="resume.img || 'https://via.placeholder.com/150x200?text=Resume'" 
               alt="Resume Preview" 
               @error="e => e.target.src = 'https://via.placeholder.com/150x200?text=No+Image'" />
          <div class="card-info">
            <ice-text class="card-title">{{ resume.title || '无标题简历' }}</ice-text>
            <ice-text class="card-date">更新于 {{ formatDate(new Date(resume.updatedAt || resume.createdAt || Date.now()).getTime()) }}</ice-text>
          </div>
        </div>
      </div>

      <!-- 加载中状态 -->
      <div v-if="loading" class="loading-overlay">
        <ice-spinner size="large"/>
      </div>

      <!-- 无数据提示 -->
      <div v-if="!loading && resumeList.length === 0" class="no-data">
        <ice-text class="no-data-text">暂无简历，点击“创建一个新简历”开始</ice-text>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getResumeList } from '@/api'
import { PaginationParams, ResumeInfo } from '@/api/resume/types'
import { iceMessage } from 'icepro'

const router = useRouter()
const resumeList = ref<ResumeInfo[]>([])
const loading = ref<boolean>(false)
const total = ref<number>(0)
// 分页参数
const pagination = ref<PaginationParams>({
  page: 1,
  size: 10
})
// 从接口加载简历列表数据
const loadResumeList = () => {
  loading.value = true

  getResumeList(pagination.value)
    .then(res => {
      console.log('res===>')
      console.log(res)

      // 根据返回数据结构处理数据
      if (res && res.code === 200) {
        // 直接处理数据数组
        console.log('原始数据：', res)
        
        // 判断数据格式是否包含 rows 和 count
        if (res.data && typeof res.data === 'object') {
          if (res.data.rows && Array.isArray(res.data.rows)) {
            // 有 rows 字段的情况
            resumeList.value = res.data.rows
            total.value = res.data.count || resumeList.value.length
            console.log('解析后的数据数组：', resumeList.value)
          } else if (Array.isArray(res.data)) {
            // 直接是数组的情况
            resumeList.value = res.data
            total.value = res.data.length
            console.log('解析后的数据数组：', resumeList.value)
          }
        } else {
          resumeList.value = []
          total.value = 0
          iceMessage.error({
            title: '获取简历列表失败',
            message: '服务器返回数据格式错误'
          })
        }
      } else {
        // 使用IcePro的通知组件替代原生alert
        iceMessage.error({
          title: '获取简历列表失败',
          message: res?.msg || '服务器响应异常'
        })
        resumeList.value = []
        total.value = 0
      }
    })
    .catch(error => {
      console.error('获取简历列表出错:', error)
      iceMessage.error({
        title: '获取简历列表失败',
        message: '网络请求异常，请稍后重试'
      })
      // 不使用本地模拟数据，保持空列表
      resumeList.value = []
      total.value = 0
    })
    .finally(() => {
      loading.value = false
    })
}
// 格式化日期
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp)
  const now = new Date()
  // 计算时间差
  const diffTime = now.getTime() - timestamp
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
  if (diffDays === 0) {
    return '今天'
  } else if (diffDays === 1) {
    return '昨天'
  } else if (diffDays < 7) {
    return `${diffDays}天前`
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)}周前`
  } else {
    // 年-月-日 格式
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  }
}
// 创建新简历
const createNewResume = () => {
  router.push({ name: 'resume' })
}
// 导入简历功能已移除
// 打开已有简历
const openResume = (id: number) => {
  router.push({
    name: 'resume',
    query: { id: String(id) } // 路由查询参数仍需要字符串
  })
}
onMounted(() => {
  // 从接口加载用户的简历列表
  loadResumeList()
})
</script>

<style scoped lang="less">
.resume-list {
  width: 100%;
  min-height: 100vh;
  background-color: @bac;
  padding: 20px;
  box-sizing: border-box;

  .header {
    width: 100%;
    margin-bottom: 30px;

    .title-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title {
      font-size: 24px;
      color: @fontColor-light;
      margin: 0;
    }

    .view-options {
      display: flex;
      gap: 10px;

      .view-btn {
        padding: 5px 10px;

        &.active {
          background-color: @btn-skyblue;
        }
      }
    }
  }

  .resume-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 20px;
    position: relative;
    min-height: 280px;
    
    // 定义所有卡片的通用样式
    .resume-card {
      height: 280px;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      }
      
      // 简历卡片内容区
      .card-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        
        &.preview {
          position: relative;
          
          .resume-thumbnail {
            width: 100%;
            height: 200px;
            object-fit: cover;
            background-color: @bac;
          }
          
          .card-info {
            padding: 15px;
            background-color: @bac;
            
            .card-title {
              font-size: 16px;
              font-weight: 500;
              color: @fontColor-light;
              margin-bottom: 5px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
            
            .card-date {
              font-size: 12px;
              color: @fontColor-bleak;
            }
          }
        }
      }
      
      // 创建新简历卡片特殊样式
      &.create-new {
        background: linear-gradient(135deg, #36D1DC, #5B86E5);
        position: relative;
        overflow: hidden;
        
        // 添加装饰性图案
        &:before {
          content: "";
          position: absolute;
          top: -10%;
          right: -10%;
          width: 120px;
          height: 120px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          z-index: 1;
        }
        
        &:after {
          content: "";
          position: absolute;
          bottom: -15%;
          left: -10%;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          z-index: 1;
        }
        
        .card-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 100%;
          padding: 20px;
          box-sizing: border-box;
          text-align: center;
          position: relative;
          z-index: 2;
          
          .pattern-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIG9wYWNpdHk9Ii4yIj48cGF0aCBkPSJNNTkgMzdMMzYgNjAgNjAgNjB6Ii8+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTYwIDAgMCAwIDAgNjAgMjMgMzcgMjQgMzYgMzYgMjQgMzcgMjMgNjAgMHoiLz48L2c+PC9zdmc+');
            opacity: 0.1;
            z-index: -1;
          }

          .icon-container {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(4px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: center;
            align-items: center;
            margin-bottom: 20px;
            border: 2px solid rgba(255, 255, 255, 0.5);
            transition: all 0.3s ease;

            i {
              font-size: 32px;
              color: white;
            }
          }
          
          &:hover .icon-container {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
          }
          
          .card-info {
            z-index: 3;
            text-align: center;
            
            .card-title {
              font-weight: 600;
              color: white;
              font-size: 18px;
              text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
              margin-bottom: 8px;
            }
            
            .card-desc {
              color: rgba(255, 255, 255, 0.85);
              font-size: 14px;
            }
          }
        }
      }
    }

    /* 加载状态覆盖层 */
    .loading-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.7);
      z-index: 10;
    }

    /* 无数据提示 */
    .no-data {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: @fontColor-bleak;
      font-size: 16px;
      text-align: center;
    }
  }
}

// 深色模式适配
:deep(.dark) {
  .resume-list {
    background-color: @bac-dark;
  }
}
</style>
