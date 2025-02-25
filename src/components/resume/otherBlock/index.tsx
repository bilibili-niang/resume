import { defineComponent, ref } from 'vue'
import resumeStore from '@/store/modules/resume.ts'
import { storeToRefs } from 'pinia'
import './style.less'
import CustomBlockList from './components/customBlockList'

export interface CustomBlock {
  type: string
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
    const selectedBlock = ref<CustomBlock | null>(null)

    const addCustomBlock = () => {
      const newBlock: CustomBlock = {
        type: '自定义模块',
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
      selectedBlock.value = block
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
        <div class="edit-area">
          {selectedBlock.value ? (
            <div class="edit-form">
              <div class="form-item">
                <label>类型：</label>
                <input 
                  v-model={selectedBlock.value.type}
                  onInput={handleUpdate}
                />
              </div>
              <div class="form-item">
                <label>职责：</label>
                <input 
                  v-model={selectedBlock.value.responsibilities}
                  onInput={handleUpdate}
                />
              </div>
              <div class="form-item">
                <label>开始时间：</label>
                <input 
                  v-model={selectedBlock.value.time.start}
                  onInput={handleUpdate}
                />
              </div>
              <div class="form-item">
                <label>结束时间：</label>
                <input 
                  v-model={selectedBlock.value.time.end}
                  onInput={handleUpdate}
                />
              </div>
              <div class="form-item">
                <label>内容：</label>
                <textarea 
                  v-model={selectedBlock.value.content}
                  onInput={handleUpdate}
                  rows={4}
                />
              </div>
            </div>
          ) : (
            <div class="empty-state">
              请选择一个模块进行编辑，或点击"添加其他模块"创建新模块
            </div>
          )}
        </div>
        <div class="content-area">
          <CustomBlockList 
            blocks={resumeData.value.customBlocks} 
            onSelect={handleSelect}
            selectedBlock={selectedBlock.value}
          />
          <ice-row onClick={addCustomBlock} class="add-button">
            添加其他模块
          </ice-row>
        </div>
      </div>
    )
  },
})
