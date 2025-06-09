import { defineComponent } from 'vue'
import './index.less'
import { themeManager, themes } from 'icepro'

export default defineComponent({
  name: 'StyleControllerBar',
  setup() {
    console.log(themeManager)
    console.log(themes)

    return () => {
      return (
        <div class="StyleControllerBar">
          <ice-row>
            <ice-text>
              控制栏
            </ice-text>

            {themes.map((p: any) => {
              return <ice-text>
                {p.color}
              </ice-text>
            })}

          </ice-row>
        </div>
      )
    }
  }
})
