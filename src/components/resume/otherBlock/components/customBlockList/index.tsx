import { defineComponent, PropType } from 'vue'
import { color } from '@/config'
import { CustomBlock } from '@/components/resume/otherBlock'

export default defineComponent({
  name: 'CustomBlockList',
  props: {
    blocks: {
      type: Array as PropType<CustomBlock[]>,
      default: () => [],
    },
    selectedBlock: {
      type: Object as PropType<CustomBlock>,
      default: null,
    },
  },
  emits: ['select'],
  setup(props, { emit }) {
    const handleSelect = (block: CustomBlock) => {
      emit('select', block)
    }

    return () => (
      <div class="custom-blocks-content">
        {props.blocks?.map((block: CustomBlock, index: number) => (
          <div 
            key={index} 
            class={[
              'block-item',
              { selected: props.selectedBlock === block }
            ]}
            onClick={() => handleSelect(block)}
          >
            <ice-column>
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
                  `${block.time.start} - ${block.time.end}`
                  : ''}
              </ice-text>

              <ice-text class="wrap" color={color}>
                {block.content}
              </ice-text>
            </ice-column>
          </div>
        ))}
      </div>
    )
  },
})
