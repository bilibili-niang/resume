<script setup lang="ts">

import resumeStore from "@/store/modules/resume.ts";
import {color} from "@/config.js";

const resumeData = resumeStore();
const props = defineProps({
  data: {
    type: Object
  }
});


let renderPageRef = ref();
const moveDiv = () => {
  renderPageRef.value.addEventListener("mousedown", (e) => {
    // 鼠标按下，计算当前元素距离可视区的距离
    let disX = e.clientX;
    let disY = e.clientY;
    let left = renderPageRef.value.offsetLeft;
    let top = renderPageRef.value.offsetTop;
    document.onmousemove = (e) => {
      // 通过事件委托,计算移动的距离
      let l = e.clientX - disX;
      let t = e.clientY - disY;
      // 移动当前元素
      renderPageRef.value.style.left = l + left + "px";
      renderPageRef.value.style.top = t + top + "px";
    };
    document.onmouseup = (e) => {
      document.onmousemove = null;
      document.onmouseup = null;
    };
  });
};

// 监听点击并获取类名
const elementLister = () => {
  let elementList = document.getElementsByClassName("renderBlock");
  for (let i = 0; i < elementList.length; i++) {
    elementList[i].addEventListener("click", (e) => {
      changeMenu(e.target.id);
    });
  }
};

// 监听鼠标按下
onMounted(() => {
  moveDiv();
  // elementLister();
});

const changeMenu = (menu: string) => {
  if (!menu) {
    return void 0;
  } else {
    resumeData.updateMenu(menu);
  }
};

</script>

<template>
  <div class="renderPage" ref="renderPageRef">

    <!--头像-->
    <ice-column class="renderBlock" id="avatar" @click="changeMenu('avatar')">
      <div class="verticalLine"></div>
      <ice-row>
        <ice-avatar :src="data.myInfo.avatar" block></ice-avatar>
        <ice-column class="userInfoText">
          <ice-text :color="color" size="l" m0>{{ data.myInfo.name }}</ice-text>

          <ice-row>
            <ice-text :color="color" nowrap p0 m0>
              <ice-tag :color="color">电话:</ice-tag>
              {{ data.myInfo.phone }}
            </ice-text>

            <ice-text :color="color" nowrap p0 m0>
              <ice-tag :color="color" nowrap>邮箱:</ice-tag>
              <template v-for="(key, index) in Object.keys(data.myInfo.email)" :key="index">
                <ice-text :color="color" v-if="data.myInfo.email[key]&&data.myInfo.email[key].length>0">
                  {{ data.myInfo.email[key] }}
                </ice-text>
              </template>
            </ice-text>


            <ice-text :color="color" nowrap p0 m0>
              <ice-tag :color="color">微信:</ice-tag>
              {{ data.myInfo.wechatId }}
            </ice-text>


          </ice-row>
          <ice-row>

            <ice-text :color="color" nowrap p0 m0>
              <ice-tag :color="color">个人网站:</ice-tag>
              {{ data.myInfo.website }}
            </ice-text>

            <ice-text :color="color" nowrap p0 m0>
              <ice-tag :color="color" m0>现居城市:</ice-tag>
              {{ data.myInfo.address }}
            </ice-text>


          </ice-row>
        </ice-column>
      </ice-row>
    </ice-column>

    <!--教育经历-->
    <ice-column class="renderBlock" id="education" @click="changeMenu('education')">
      <div class="verticalLine"></div>
      <ice-split position="left" text="教育经历"></ice-split>
      <ice-row class="justBetween">
        <ice-row>
          <ice-text :color="color" nowrap>
            {{ data.education.school }} -{{ data.education.major }}
          </ice-text>
        </ice-row>
        <ice-text :color="color" nowrap>
          {{ data.education.time }}
        </ice-text>
      </ice-row>
    </ice-column>

    <!--专业技能-->
    <ice-column class="renderBlock" id="professionalSkills" @click="changeMenu('professionalSkills')">
      <div class="verticalLine"></div>
      <ice-split position="left" text="专业技能"></ice-split>
      <ice-text v-for="(item,index) in data.skill" :key="index" :color="color">
        {{ item.name }}-{{ item.extent }}
      </ice-text>

    </ice-column>

    <!--项目经历-->
    <ice-column class="renderBlock" id="projectExperience" @click="changeMenu('projectExperience')">
      <div class="verticalLine"></div>
      <ice-split position="left" text="项目经历"></ice-split>


      <ice-text v-for="(item,index) in data.projectData" :key="index" :color="color">
        <ice-column class="justBetween">

          <ice-row class="alignC justBetween">
            <ice-row>
              <ice-text :color="color">
                {{ item.projectName }}-{{ item.projectRole }}
              </ice-text>
              <!--<ice-tag v-if="item.companyProject===1" :color="color">企业项目</ice-tag>-->
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
    <ice-column class="renderBlock" id="prize" @click="changeMenu('prize')">
      <div class="verticalLine"></div>
      <ice-split position="left" text="获奖"></ice-split>

      <template v-for="(key, index) in Object.keys(data.prize)" :key="index">
        <div class="ice-row justBetween">
          <ice-text :color="color">{{ data.prize[key].prizeName }}</ice-text>
          <ice-text :color="color">{{ data.prize[key].prizeTime }}</ice-text>
        </div>
      </template>

    </ice-column>

    <!--自我评价-->
    <ice-column class="renderBlock" id="summary" @click="changeMenu('avatar')">
      <div class="verticalLine"></div>
      <ice-split position="left" text="总结"></ice-split>

      <template v-for="(key, index) in Object.keys(data.myInfo.summary)" :key="index">
        <ice-text :color="color" v-if="data.myInfo.summary[key]&&data.myInfo.summary[key].length>0">
          {{ data.myInfo.summary[key] }}
        </ice-text>
      </template>

    </ice-column>


  </div>
</template>

<style scoped lang="less">
.renderPage{
  position: absolute;
  margin: auto;
  width: 835.8px;
  height: 1122.66px;
  //aspect-ratio: 3/4;
  font-size: 16px;
  background: #e2e1e4;
  color: #2f2f35;
  border-radius: @radio-n;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
}
.userInfoText{
  justify-content: flex-end;
}
.renderBlock{
  transition-duration: @time-n;

  &:hover{
    background: rgba(0, 0, 0, .2);
  }
}
</style>