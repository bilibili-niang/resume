<script setup>

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

</script>

<template>
  <div class="renderPage" ref="renderPageRef">
    <ice-row>
      <ice-avatar :src="data.myInfo.avatar" block></ice-avatar>
      <ice-column class="userInfoText">
        <ice-text :color="color" size="l" m0>{{ data.myInfo.name }}</ice-text>

        <ice-row>
          <ice-text :color="color" ta nowrap p0 m0>
            <ice-tag :color="color" ta m0>电话:</ice-tag>
            {{ data.myInfo.phone }}
          </ice-text>
          <ice-text :color="color" ta nowrap p0 m0>
            <ice-tag :color="color" ta m0>邮箱:</ice-tag>
            {{ data.myInfo.email }}
          </ice-text>
          <ice-text :color="color" ta nowrap p0 m0>
            <ice-tag :color="color" ta m0>微信:</ice-tag>
            {{ data.myInfo.wechatId }}
          </ice-text>


        </ice-row>
        <ice-row>

          <ice-text :color="color" ta nowrap p0 m0>
            <ice-tag :color="color" ta m0>个人网站:</ice-tag>
            {{ data.myInfo.website }}
          </ice-text>

          <ice-text :color="color" ta nowrap p0 m0>
            <ice-tag :color="color" ta m0>当前居住地:</ice-tag>
            {{ data.myInfo.address }}
          </ice-text>


        </ice-row>
      </ice-column>
    </ice-row>
    <div class="verticalLine"></div>
    <ice-column>
      <ice-split position="left" text="总结" :color="heightLight"></ice-split>
      <ice-text :color="color">
        {{ data.myInfo.summary1 }}
      </ice-text>

      <ice-text :color="color">
        {{ data.myInfo.summary2 }}
      </ice-text>

      <ice-text :color="color">
        {{ data.myInfo.summary3 }}
      </ice-text>
    </ice-column>
    <div class="verticalLine"></div>
    <ice-column>
      <ice-split position="left" text="教育经历"></ice-split>
      <ice-row class="justBetween">
        <ice-text :color="color">
          {{ data.myInfo.educate }}
        </ice-text>


        <ice-text :color="color">2022.9-2024.6</ice-text>
      </ice-row>
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
</style>