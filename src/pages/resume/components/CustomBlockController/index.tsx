import { defineComponent } from 'vue'
import resumeStore from '@/store/modules/resume.ts'
import { storeToRefs } from 'pinia'
import { deepClone } from '@/utils/utils'

export default defineComponent({
  name: 'CustomBlockController',
  props: {},
  emits: [''],
  setup(props, { emit }) {

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


            </ice-column>
          </div>
        )
      }

    }
  }
})
