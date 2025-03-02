import { defineComponent } from 'vue'
import resumeStore from '@/store/modules/resume.ts'
import { storeToRefs } from 'pinia'
import { deepClone } from '@/utils'

export default defineComponent({
  name: 'CustomBlockController',
  setup() {

    const resumeDataStore = resumeStore()
    const { resumeData } = storeToRefs(resumeDataStore)

    const blockTempData = ref([])
    const init = () => {
      blockTempData.value = deepClone(resumeData.value.customBlocks)
    }

    init()

    watch(() => blockTempData.value, (newV) => {
      if (newV.length !== 0) {
        console.log('自定义模块更新了数据:')
        console.log(newV)
      }
    })
    const showCustomBlock = computed(() => {
      return resumeData.value.customBlocks?.find(o => o.id === resumeData.value.menu)
    })
    return () => {
      if (showCustomBlock.value) {
        return (
          <div
            class="customBlockController"
            onClick={() => {
              console.log('blockTempData.value')
              console.log(blockTempData.value)
            }}
          >
            <ice-column>
              <ice-text>
                menu:
                {resumeData.value.menu}
              </ice-text>

              <ice-input
                placeholder="模块名称"
                v-model={resumeData.value.customBlocks.find(o => o.id === resumeData.value.menu).type}
              />

              <ice-input
                placeholder="所属公司"
                v-model={resumeData.value.customBlocks.find(o => o.id === resumeData.value.menu).responsibilities}
              />
              <ice-input
                placeholder="角色"
                v-model={resumeData.value.customBlocks.find(o => o.id === resumeData.value.menu).projectRole}
              />
              <ice-input
                placeholder="项目名称"
                v-model={resumeData.value.customBlocks.find(o => o.id === resumeData.value.menu).projectName}
              />
              <ice-input
                placeholder="城市"
                v-model={resumeData.value.customBlocks.find(o => o.id === resumeData.value.menu).city}
              />
              <ice-input
                placeholder="开始时间"
                v-model={resumeData.value.customBlocks.find(o => o.id === resumeData.value.menu).time.start}
              />
              <ice-input
                placeholder="结束时间"
                v-model={resumeData.value.customBlocks.find(o => o.id === resumeData.value.menu).time.end}
              />

              <ice-textarea v-model={resumeData.value.customBlocks.find(o => o.id === resumeData.value.menu).content}
                            rows={20} placeholder="项目描述"></ice-textarea>

            </ice-column>
          </div>
        )
      }

    }
  }
})
