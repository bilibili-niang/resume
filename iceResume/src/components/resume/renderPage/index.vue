<script setup>

import {color} from "@/config.js";

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
        <ice-text :color="color" m0>{{ data.myInfo.name }}</ice-text>

        <ice-row>
          <ice-text :color="color" size="s" nowrap p0 m0>
            <ice-tag :color="color" size="s" m0>email:</ice-tag>
            {{ data.myInfo.email }}
          </ice-text>

          <ice-text :color="color" size="s" nowrap p0 m0>
            <ice-tag :color="color" size="s" m0>当前居住地:</ice-tag>
            {{ data.myInfo.address }}
          </ice-text>

        </ice-row>
        <ice-row>

          <ice-text :color="color" size="s" nowrap p0 m0>
            <ice-tag :color="color" size="s" m0>网站地址:</ice-tag>
            {{ data.myInfo.website }}
          </ice-text>

          <ice-text :color="color" size="s" nowrap p0 m0>
            <ice-tag :color="color" size="s" m0>手机号:</ice-tag>
            {{ data.myInfo.phone }}
          </ice-text>


        </ice-row>

      </ice-column>
    </ice-row>
    <ice-column>
      <iceSplit :color="color"/>
      <ice-text :color="color">
        {{ data.myInfo.summary }}
      </ice-text>
    </ice-column>

  </div>
  {{ data }}
</template>

<style scoped lang="less">
.renderPage{
  position: absolute;
  margin: auto;
  width: 600px;
  aspect-ratio: 3/4;
  font-size: 16px;
  background: #e2e1e4;
  color: #2f2f35;
  border-radius: @radio-n;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.userInfoText{
  justify-content: flex-end;
}
</style>