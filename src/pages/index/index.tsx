import { defineComponent } from 'vue'
import IndexHeader from '@/components/index/header.vue'
import router from '@/router'
import logo from '@/assets/png/logo.png'
import './index.less'
// 使用defineComponent创建组件，方便TypeScript类型推断
export default defineComponent({
  name: 'IndexPage',
  setup() {
    // 页面跳转函数
    const goDoc = () => {
      router.push({
        name: 'resume-list'
      })
    }
    // 返回渲染函数
    return () => (
      <div class="index">
        {/* 先显示header组件，确保登录/退出按钮正确显示 */}
        <div class="header-container">
          <IndexHeader/>
        </div>
        <ice-column>
          <ice-header size="l">
            iceResume
          </ice-header>
          <ice-avatar size={120} block src={logo}></ice-avatar>

          <ice-row>
            <ice-button onClick={goDoc}>起步</ice-button>
          </ice-row>

          <ice-row class="alignC">
            <ice-text>
              基于
              <ice-tag>vue</ice-tag>
              ,
              <ice-link href="https://github.com/bilibili-niang/icePro" target="_blank"
                        color="luoxiahong">icepro</ice-link>
              简历编写工具
            </ice-text>
          </ice-row>
        </ice-column>
      </div>
    )
  }
})
