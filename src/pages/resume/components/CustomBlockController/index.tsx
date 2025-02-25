import { defineComponent } from 'vue'
import resumeStore from '@/store/modules/resume.ts'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'CustomBlockController',
  props: {},
  emits: [''],
  setup(props, { emit }) {

    const resumeDataStore = resumeStore()
    const { resumeData } = storeToRefs(resumeDataStore)


    return () => {
      return (
        <div class="customBlockController">
          <ice-text>
            menu:
            {resumeData.value.menu}
          </ice-text>
        </div>
      )
    }
  }
})
