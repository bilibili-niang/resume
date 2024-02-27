import {defineStore} from 'pinia'
import {ref} from 'vue'

const resume = defineStore('resume', () => {
    const resumeData = ref({
        myInfo: {
            name: "张嘉凯",
            avatar: 'https://blog.icestone.work/default.png',
            email: {
                email1: 'killicestone@126.com'
            },
            website: "https://blog.icestone.work/#/",
            phone: 18672148720,
            summary: {
                summary1: '暂无内容'
            },
            wechatId: 'icestone9',
            address:"湖北-襄阳"
        },
        projectData: [
            {
                company: '浙江嘉兴数字城市实验室有限公司',
                projectName: '基层治理综合信息平台',
                projectTime: '2023.05-08',
                projectContent: '项目描述\n' +
                    '负责全市社会治理信息化规划,建设和管理,同时协调指导各级指挥中心的运行.建立标准化流程,实现事务处理的规范高效的运营\n' +
                    'toB平台的后台管理系统,面向政府,主要是功能的安全性和实现,pc端\n' +
                    '职责描述:\n' +
                    '基于elementui,less还原原型图/ui设计稿,并确保用户体验的易用性\n' +
                    '使用axios统一封装底层api接口,方便接口完全脱离业务和统一管理\n' +
                    '对于一些状态数据存储与校验,使用mixins封装部分业务逻辑,确保前端用户权限的区分和每个功能的权限区分.\n' +
                    '基于echarts实现饼图,条状图,地图等数据大屏展示,提供直观的数据展示和决策支持.\n' +
                    '涉及技术:\n' +
                    'vue2, elementui, axios, echarts, vuex',
                projectRole: '前端开发',
                city: '嘉兴',
                // 是否为公司项目,0为false,1为true
                companyProject: 1
            }
        ],
        education: {
            school: '武汉轻工大学',
            major: '计算机科学与技术',
            time: '2022.09-2024.06',
            degree: '本科'
        },
        skill: {
            skill1: {
                name: 'Java',
                extent: '熟悉',
            },
            skill2: {
                name: 'Vue',
                extent: '熟练',
            }
        },
        menu: '',
        prize: [
            {
                prizeName: '全国大学生逃课一等奖',
                prizeTime: '2024-10-05'
            }, {
                prizeName: '班级进步奖',
                prizeTime: '2001-01-10'
            }
        ]
    })

    const updateResume = (data: object): void => {
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