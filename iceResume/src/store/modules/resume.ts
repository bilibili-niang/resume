import { defineStore } from 'pinia'
import { ref } from 'vue'

const resume = defineStore('resume', () => {
  const resumeData = ref({
    myInfo: {
      name: '张嘉凯',
      avatar: 'https://avatars.githubusercontent.com/u/60811236?v=4',
      email: {
        email1: 'killicestone@126.com'
      },
      website: 'https://blog.icestone.work/#/',
      phone: 18672148720,
      summary: {
        summary1: `本人具备良好的前端技能，熟练掌握HTML、CSS、JavaScript等技术，能够编写符合响应式设计和跨浏览器兼容性的前端页面。在团
队合作中，本人积极参与并贡献自己的专业知识，具备良好的沟通和协作能力。
乐于学习新技术，不断提升自己的技能水平，并能将所学应用于实际工作中。本人对新技术充满热情，热衷于尝试和探索，能够承受
高强度的工作压力。对工作认真负责，始终保持积极的工作态度。`
      },
      wechatId: 'icestone9',
      address: '湖北-襄阳'
    },
    projectData: [
      {
        company: '浙江嘉兴数字城市实验室有限公司',
        projectName: '基层治理综合信息平台',
        projectTime: '2023.05-2023.08',
        projectContent: `- 项目描述: 负责嘉兴市社会治理信息化,协调指导各级指挥中心的运行。建立标准化流程,实现事务处理的规范高效的运营。政府平台
的后台管理系统,主要是功能的安全性和实现。
- 职责描述:
基于element封装组件,还原设计稿,确保用户体验的易用性
使用axios统一封装底层api接口,方便接口完全脱离业务和统一管理
使用mixins封装部分业务逻辑,确保前端用户权限的区分和每个功能的权限区分
基于echarts实现数据展示,提供直观的数据展示和决策支持
- 涉及技术: vue2, element, axios, echarts, vuex`,
        projectRole: '前端开发',
        city: '嘉兴',
        // 是否为公司项目,0为false,1为true
        companyProject: 1
      },
      {
        company: '浙江嘉兴数字城市实验室有限公司',
        projectName: '民生一键办大屏展示',
        projectTime: '2023.05-2023.08',
        projectContent: `- 项目描述: 民生事件的定位和监控视频的实时查看,业务系统的事件流转。地图上快速调派执法人员到各个位置,以实现最快速的警务
事件处理面向政府的数据大屏展示。
- 职责描述: 使用 echarts 来实现,展示关键字的热度,频率等信息功能.使用 Pinia来进行用户权限,状态和事件状态管理使用了 video.js
和 element-ui 来封装媒体素材展示的组件。
- 涉及技术: vue3, vite, echarts, element plus, video.js, pinia
- 工作成果: 开发了面向政府的民生一键办大屏展示系统，实现了关键字词云展示和媒体素材展示等功能，提高了数据分析和警务处理
的效率`,
        projectRole: '前端开发',
        city: '嘉兴',
        // 是否为公司项目,0为false,1为true
        companyProject: 1
      }
    ],
    education: [
      {
        school: '武汉轻工大学',
        major: '软件工程',
        time: '2022.09-2024.06',
        degree: '本科'
      }
    ],
    skill: [
      {
        name: 'Vue',
        extent: '熟练',
      },
      {
        name: 'Taro/UniApp',
        extent: '熟悉',
      },
    ],
    menu: '',
    prize: [
      {
        prizeName: '班级进步奖',
        prizeTime: '2001-01-10'
      }
    ]
  })

  const updateResume = (data: any): void => {
    resumeData.value = data
  }
  const updateMenu = (menu: string): void => {
    resumeData.value.menu = menu
  }

  return {
    resumeData,
    updateResume,
    updateMenu
  }
})

export default resume
