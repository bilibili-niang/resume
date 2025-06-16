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
        <div class="card-content">
          <div class="icon-container">
            <i class="iconfont icon-add"></i>
          </div>
          <div class="card-info">
            <ice-text class="card-title">创建一个新简历</ice-text>
            <ice-text class="card-desc">从头开始创建</ice-text>
          </div>
        </div>
      </div>
      
      <!-- 导入简历功能已移除 -->
      
      <!-- 已有简历示例 -->
      <div v-for="(resume, index) in resumeList" :key="index" class="resume-card" @click="openResume(resume.id)">
        <div class="card-content preview">
          <div class="preview-image">
            <img :src="resume.thumbnail" alt="简历预览" />
          </div>
          <div class="card-footer">
            <ice-text class="resume-name">{{ resume.name }}</ice-text>
            <ice-text class="last-modified">最后更新于 {{ formatDate(resume.updatedAt) }}</ice-text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import indexHeader from '@/components/index/header.vue';
import { getResumeList } from '@/api';
import { ResumeInfo } from '@/api/resume/types';
import { IceNotification } from 'icepro';

const router = useRouter();
const resumeList = ref<ResumeInfo[]>([]);
const loading = ref<boolean>(false);

// 从接口加载简历列表数据
const loadResumeList = async () => {
  loading.value = true;
  try {
    const res = await getResumeList();
    if (res.data && res.data.code === 200) {
      resumeList.value = res.data.data || [];
    } else {
      // 使用IcePro的通知组件替代原生alert
      IceNotification.error({
        title: '获取简历列表失败',
        message: res.data?.msg || '服务器响应异常'
      });
    }
  } catch (error) {
    console.error('获取简历列表出错:', error);
    IceNotification.error({
      title: '获取简历列表失败',
      message: '网络请求异常，请稍后重试'
    });
    // 加载失败时使用本地模拟数据
    resumeList.value = [
      {
        id: '1',
        name: '软件开发工程师简历',
        thumbnail: 'https://via.placeholder.com/150x200',
        createdAt: Date.now(),
        updatedAt: new Date().getTime() - 2 * 24 * 60 * 60 * 1000 // 2天前
      },
      {
        id: '2',
        name: '产品经理简历',
        thumbnail: 'https://via.placeholder.com/150x200',
        createdAt: Date.now(),
        updatedAt: new Date().getTime() - 7 * 24 * 60 * 60 * 1000 // 一周前
      }
    ];
  } finally {
    loading.value = false;
  }
};

// 格式化日期
const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const now = new Date();
  
  // 计算时间差
  const diffTime = now.getTime() - timestamp;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return '今天';
  } else if (diffDays === 1) {
    return '昨天';
  } else if (diffDays < 7) {
    return `${diffDays}天前`;
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)}周前`;
  } else {
    // 年-月-日 格式
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }
};

// 创建新简历
const createNewResume = () => {
  router.push({ name: 'resume' });
};

// 导入简历功能已移除

// 打开已有简历
const openResume = (id: string) => {
  router.push({ 
    name: 'resume',
    query: { id }
  });
};

onMounted(() => {
  // 从接口加载用户的简历列表
  loadResumeList();
});
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
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }

  .resume-card {
    height: 300px;
    background-color: @white-10;
    border-radius: @radio-n;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    .card-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      padding: 20px;
      box-sizing: border-box;

      &.preview {
        justify-content: space-between;
        padding: 0;
      }
    }

    .icon-container {
      width: 60px;
      height: 60px;
      background: @btn-skyblue;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;

      .iconfont {
        font-size: 30px;
        color: white;
      }
    }

    .card-info {
      text-align: center;
    }

    .card-title {
      color: @fontColor-light;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 5px;
    }

    .card-desc {
      color: @fontColor-bleak;
      font-size: 14px;
    }

    .preview-image {
      width: 100%;
      height: 80%;
      background: #f0f0f0;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .card-footer {
      padding: 10px;
      background-color: @bac-dark;
      height: 20%;
      display: flex;
      flex-direction: column;
      justify-content: center;

      .resume-name {
        color: @fontColor-light;
        font-weight: 500;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .last-modified {
        color: @fontColor-bleak;
        font-size: 12px;
        margin-top: 2px;
      }
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
