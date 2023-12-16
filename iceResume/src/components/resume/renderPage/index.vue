<script setup lang="ts">

import {color, heightLight} from "@/config.js";

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

// 监听鼠标按下
onMounted(() => {
  moveDiv();
});
const changeMenu = (menu) => {

}

</script>

<template>
  <div class="renderPage" ref="renderPageRef">
    <ice-row class="renderBlock">
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
            <ice-tag :color="color" m0>当前居住地:</ice-tag>
            {{ data.myInfo.address }}
          </ice-text>


        </ice-row>
      </ice-column>
    </ice-row>
    <!--教育经历-->
    <ice-column class="renderBlock" @click="changeMenu('education')">
      <div class="verticalLine"></div>
      <ice-split position="left" text="教育经历"></ice-split>
      <ice-row class="justBetween">
        <ice-text :color="color">
          {{ data.education.school }}
        </ice-text>

        <ice-text :color="color">2022.9-2024.6</ice-text>
      </ice-row>


    </ice-column>

    <ice-column class="renderBlock">
      <div class="verticalLine"></div>
      <ice-split position="left" text="专业技能"></ice-split>


    </ice-column>

    <ice-column class="renderBlock">
      <div class="verticalLine"></div>
      <ice-split position="left" text="项目经历"></ice-split>


    </ice-column>

    <ice-column class="renderBlock">
      <div class="verticalLine"></div>
      <ice-split position="left" text="获奖"></ice-split>


    </ice-column>

    <!--自我评价-->
    <ice-column class="renderBlock">
      <div class="verticalLine"></div>
      <ice-split position="left" text="总结" :color="heightLight"></ice-split>

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