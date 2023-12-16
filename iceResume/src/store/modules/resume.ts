import {defineStore} from 'pinia'
import {ref} from 'vue'

const resume = defineStore('resume', () => {
    const resumeData = ref({
        myInfo: {
            avatar: 'https://blog.icestone.work/default.png',
            email: {
                email1: 'killicestone@126.com'
            },
            website: "https://blog.icestone.work/#/",
            phone: 18672148720,
            summary: {
                summary1: '暂无内容'
            },
            wechatId: '',
            educate: ''
        },
        education: {
            school: '武汉轻工大学',
            major: '计算机科学与技术',
            time: '2020.09-至今',
            degree: '本科'
        }
    })

    const updateResume = (data: object): void => {
        resume.value = data
    }

    return {
        resumeData,
        updateResume
    }
})

export default resume