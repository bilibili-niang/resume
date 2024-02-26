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
        },
        projectData: [
            {
                company: '浙江嘉兴数字城市实验室有限公司',
                projectName: '基层治理综合信息平台',
                projectTime: '2021.09-至今',
                projectContent: '基于SpringBoot+Vue+ElementUI+MySQL+Redis+MyBatis+Shiro+JWT+LayUI+Axios+Mock+MockJs+MockJs+MockJs+Mock',
                projectRole: '前端开发',
                city: '嘉兴',
                // 是否为公司项目,0为false,1为true
                companyProject: 1
            }
        ],
        education: {
            school: '武汉轻工大学',
            major: '计算机科学与技术',
            time: '2020.09-至今',
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