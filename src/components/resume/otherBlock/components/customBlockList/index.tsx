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
          <ice-column
            key={index}
            class={[
              'block-item renderBlock',
              { selected: props.selectedBlock === block }
            ]}
            onClick={() => handleSelect(block)}
          >
            <ice-row>
              <ice-split position="left" text={block.type}></ice-split>
            </ice-row>

            <ice-row class="alignC justBetween">

              <ice-row>
                <ice-text color={color}>
                  {block.projectName}-{block.projectRole}
                </ice-text>
                <ice-text color={color}>
                  {block.responsibilities}
                </ice-text>
                <ice-text color={color}>
                  {block.city}
                </ice-text>
              </ice-row>

              <ice-text color={color} nowrap={true}>
                {(block.time.start && block.time.end) ?
                  `${block.time.start} - ${block.time.end}`
                  : ''}
              </ice-text>

            </ice-row>


            <ice-text class="wrap" color={color}>
              {block.content}
            </ice-text>

          </ice-column>
        ))}
      </div>
    )
  },
})
