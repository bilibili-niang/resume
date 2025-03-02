<script setup lang="ts">
import resumeStore from '@/store/modules/resume.ts'
import { color, moduleIds } from '@/config'
import OtherBlock from '@/components/resume/otherBlock'
import { storeToRefs } from 'pinia'

const resumeDataStore = resumeStore()
const { updateMenu } = resumeDataStore
const { resumeData } = storeToRefs(resumeDataStore)

const props = defineProps({
  data: {
    type: Object
  }
})

onBeforeMount(() => {
  const targetDom = document.querySelector('#pdfDom')
})

onMounted(() => {
  const targetDom = document.querySelector('#pdfDom')
})

let renderPageRef = ref()
const moveDiv = () => {
  renderPageRef.value.addEventListener('mousedown', (e: any) => {
    // 鼠标按下，计算当前元素距离可视区的距离
    let disX = e.clientX
    let disY = e.clientY
    let left = renderPageRef.value.offsetLeft
    let top = renderPageRef.value.offsetTop
    document.onmousemove = (e) => {
      // 通过事件委托,计算移动的距离
      let l = e.clientX - disX
      let t = e.clientY - disY
      // 移动当前元素
      renderPageRef.value.style.left = l + left + 'px'
      renderPageRef.value.style.top = t + top + 'px'
    }
    document.onmouseup = (e) => {
      document.onmousemove = null
      document.onmouseup = null
    }
  })
}

// 监听鼠标按下
onMounted(() => {
  moveDiv()
})

// 切换菜单
const changeMenu = (moduleId: string) => {
  updateMenu(moduleId)
}
</script>

<template>
  <div
    class="renderPage"
    ref="renderPageRef"
  >
    <!--头像-->
    <ice-column class="renderBlock" id="avatar" @click="changeMenu(moduleIds.introduceMyself)">
      <ice-row>
        <ice-avatar :src="data[moduleIds.introduceMyself].avatar" block></ice-avatar>
        <ice-column class="userInfoText">
          <ice-text :color="color" size="l" m0>{{ data[moduleIds.introduceMyself].name }}</ice-text>

          <ice-row>
            <ice-text :color="color" nowrap p0 m0>
              <ice-tag :color="color">年龄:</ice-tag>
              {{ data[moduleIds.introduceMyself].age }}
            </ice-text>

            <ice-text :color="color" nowrap p0 m0>
              <ice-tag :color="color">电话:</ice-tag>
              {{ data[moduleIds.introduceMyself].phone }}
            </ice-text>

            <ice-text :color="color" nowrap p0 m0>
              <ice-tag :color="color" nowrap>邮箱:</ice-tag>
              {{ data[moduleIds.introduceMyself].email.email1 }}
            </ice-text>

            <ice-text :color="color" nowrap p0 m0>
              <ice-tag :color="color">微信:</ice-tag>
              {{ data[moduleIds.introduceMyself].wechatId }}
            </ice-text>
          </ice-row>

          <ice-row>
            <ice-text :color="color" p0 m0>
              <ice-tag :color="color">github地址:</ice-tag>
              {{ data[moduleIds.introduceMyself].githubRul }}
            </ice-text>
          </ice-row>

          <ice-row>
            <ice-text :color="color" nowrap p0 m0>
              <ice-tag :color="color">个人网站:</ice-tag>
              {{ data[moduleIds.introduceMyself].website }}
            </ice-text>

            <ice-text :color="color" nowrap p0 m0>
              <ice-tag :color="color" m0>现居城市:</ice-tag>
              {{ data[moduleIds.introduceMyself].address }}
            </ice-text>
          </ice-row>
        </ice-column>
      </ice-row>
    </ice-column>

    <!--教育经历-->
    <ice-column class="renderBlock" id="education" @click="changeMenu(moduleIds.educationalExperience)">

      <ice-split position="left" text="教育经历"></ice-split>

      <template v-for="(item,index) in data[moduleIds.educationalExperience]" :key="index">
        <ice-row class="justBetween">
          <ice-row>
            <ice-text :color="color" nowrap>
              {{ item.school }} -{{ item.major }}
            </ice-text>
          </ice-row>
          <ice-text :color="color" nowrap>
            {{ item.time }}
          </ice-text>
        </ice-row>
      </template>
    </ice-column>

    <!--专业技能-->
    <ice-column class="renderBlock" id="professionalSkills" @click="changeMenu(moduleIds.skill)">

      <ice-split position="left" text="专业技能"></ice-split>
      <ice-text v-for="(item,index) in data[moduleIds.skill]" :key="index" :color="color">
        {{ item.skillName }}-{{ item.extent }}
      </ice-text>
    </ice-column>

    <!--项目经历-->
    <ice-column class="renderBlock" id="projectExperience" @click="changeMenu(moduleIds.projectExperience)">

      <ice-split position="left" text="项目经历"></ice-split>

      <ice-text v-for="(item,index) in data[moduleIds.projectExperience]" :key="index" :color="color">
        <ice-column class="justBetween">
          <ice-row class="alignC justBetween">

            <ice-row>
              <ice-text :color="color">
                {{ item.projectName }}-{{ item.projectRole }}
              </ice-text>
              <ice-text :color="color" v-if="item.companyProject===1">
                {{ item.company }}
              </ice-text>
              <ice-text :color="color">
                {{ item.city }}
              </ice-text>
            </ice-row>

            <ice-text :color="color" class="widthAuto nowrap">
              {{ item.projectTime }}
            </ice-text>
          </ice-row>

          <ice-text class="wrap" :color="color">
            {{ item.projectContent }}
          </ice-text>

        </ice-column>
      </ice-text>
    </ice-column>

    <!--获奖-->
    <ice-column class="renderBlock" id="prize" @click="changeMenu(moduleIds.prize)">

      <ice-split position="left" text="获奖"></ice-split>

      <template v-for="(item, index) in data[moduleIds.prize]" :key="index">
        <div class="ice-row justBetween">
          <ice-text :color="color">{{ item.prizeName }}</ice-text>
        </div>
      </template>
    </ice-column>

    <!--自我评价-->
    <ice-column class="renderBlock" id="summary" @click="changeMenu(moduleIds.introduceMyself)">

      <ice-split position="left" text="总结"></ice-split>
      <template v-for="(key, index) in Object.keys(data[moduleIds.introduceMyself].summary)" :key="index">
        <ice-text :color="color" v-if="data[moduleIds.introduceMyself].summary[key]&&data[moduleIds.introduceMyself].summary[key].length>0">
          {{ data[moduleIds.introduceMyself].summary[key] }}
        </ice-text>
      </template>
    </ice-column>
    <OtherBlock :data="data"/>
  </div>
</template>

<style scoped lang="less">
.renderPage {
  position: absolute;
  width: 21cm;
  min-height: 29.7cm;
  padding: 1cm;
  margin: 1cm auto;
  border-radius: 5px;
  background: white;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.verticalLine {
  width: 4px;
  height: 20px;
  background: @themeColor;
  margin-right: 10px;
}

.avatarInfo {
  margin-left: 10px;
}

:deep(.ice-split-text) {
  color: @themeColor;
  font-weight: bold;
}
</style>
