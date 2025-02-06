import { defineComponent } from 'vue'
import resumeStore from '@/store/modules/resume.ts'

import { storeToRefs } from 'pinia'

const resumeDataStore = resumeStore()
const { resumeData } = storeToRefs(resumeDataStore)

export default defineComponent({
  name: 'OtherBlock',
  setup() {
    return () => (
      <div
        class="otherBlock"
        onClick={() => {
          console.log('resumeData.value:')
          console.log(resumeData.value)
        }}>
        <ice-text>
          添加其他模块
        </ice-text>
      </div>
    )
  }
})
