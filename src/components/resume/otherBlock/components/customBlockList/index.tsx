import { defineComponent, PropType } from 'vue'
import { color } from '@/config'
import { CustomBlock } from '@/components/resume/otherBlock'

export default defineComponent({
  name: 'CustomBlockList',
  props: {
    blocks: {
      type: Array as PropType<CustomBlock[]>,
      required: true,
    },
  },
  setup(props) {
    return () => (
      <div class="custom-blocks-content">
        {props.blocks?.map((block: CustomBlock, index: number) => (
          <ice-column key={index}>
            <ice-row>
              <ice-split position="left">
                {block.type}
              </ice-split>
              <ice-text color={color} nowrap>
                {block.responsibilities}
              </ice-text>
            </ice-row>

            <ice-text color={color}>
              {(block.time.start && block.time.end) ?
                ` 起始时间:${block.time.start} - ${block.time.end}`
                : ''}
            </ice-text>

            <ice-text class="wrap" color={color}>
              {block.content}
            </ice-text>
          </ice-column>
        ))}
      </div>
    )
  },
})
