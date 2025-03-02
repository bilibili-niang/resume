import './style.less'
import { defineComponent, ref } from 'vue'
import resumeStore from '@/store/modules/resume.ts'
import { storeToRefs } from 'pinia'
import CustomBlockList from './components/customBlockList'
import { color } from '@/config'

export interface CustomBlock {
  type: string
  content: string
  id: string
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
    const selectedBlock = ref<CustomBlock | null>(null)

    const addCustomBlock = () => {
      const newBlock: CustomBlock = {
        type: '自定义模块',
        id: Math.random().toString(36).substring(2),
        responsibilities: '',
        content: '',
        time: {
          start: '',
          end: '',
        },
      }

      if (!resumeData.value.customBlocks) {
        resumeData.value.customBlocks = []
      }

      resumeData.value.customBlocks.push(newBlock)
      resumeDataStore.updateResume(resumeData.value)
      selectedBlock.value = newBlock
    }

    const handleSelect = (block: CustomBlock) => {
      selectedBlock.value = block.id
      resumeData.value.menu = block.id
    }

    const handleUpdate = () => {
      if (selectedBlock.value && resumeData.value.customBlocks) {
        const index = resumeData.value.customBlocks.findIndex(
          block => block === selectedBlock.value
        )
        if (index !== -1) {
          resumeData.value.customBlocks[index] = { ...selectedBlock.value }
          resumeDataStore.updateResume(resumeData.value)
        }
      }
    }

    return () => (
      <div class="otherBlock">
        <div class="content-area">
          <CustomBlockList
            blocks={resumeData.value.customBlocks}
            onSelect={handleSelect}
          />
          <ice-row onClick={addCustomBlock} class="add-button renderBlock">
            <ice-text color={color} m0>
              添加其他模块
            </ice-text>
          </ice-row>
        </div>
      </div>
    )
  },
})
