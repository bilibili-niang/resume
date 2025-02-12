import { defineComponent } from 'vue'
import resumeStore from '@/store/modules/resume.ts'
import { storeToRefs } from 'pinia'
import './style.less'
import CustomBlockList from './components/customBlockList'

export interface CustomBlock {
  type: '校内项目' | '实习经历' | '项目经历'
  content: string
  responsibilities: string
  time: {
    start: string
    end: string
  }
}

const resumeDataStore = resumeStore()
const { resumeData } = storeToRefs(resumeDataStore)

export default defineComponent({
  name: 'OtherBlock',
  components: {
    CustomBlockList,
  },
  setup() {
    const addCustomBlock = () => {
      const newBlock: CustomBlock = {
        type: '项目经历',
        // 职责
        responsibilities: '前端开发',
        content: '',
        // 开始,结束时间
        time: {
          start: '2024-3-10',
          end: '2035-02-12',
        },
      }

      if (!resumeData.value.customBlocks) {
        resumeData.value.customBlocks = []
      }

      resumeData.value.customBlocks.push(newBlock)
      resumeDataStore.updateResume(resumeData.value)
      console.log('resumeData:')
      console.log(resumeData.value)
    }

    return () => (
      <div class="otherBlock">
        <CustomBlockList blocks={resumeData.value.customBlocks} class="renderBlock"/>
        <ice-row onClick={addCustomBlock} class="renderBlock">
          添加其他模块
        </ice-row>
      </div>
    )
  },
})
