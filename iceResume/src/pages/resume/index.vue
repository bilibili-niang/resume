<template>
  <div class="resume">
    <ice-row>
      <ice-text>resume</ice-text>
      <indexHeader/>
    </ice-row>

    <div class="formContainer ice-row" ref="currentBox">
      <div class="left" ref="leftContentRef">
        <!--自我介绍-->
        <introduceMyself v-model="data.myInfo"/>


      </div>
      <div class="resize" title="收缩侧边栏" ref="resizeBox">⋮</div>
      <div class="center">

        <renderPage :data="data"/>

      </div>
      <!-- <div class="right" ref="rightBox"></div>-->
    </div>

  </div>
</template>

<script setup lang="ts">
import indexHeader from "@/components/index/header.vue"
import introduceMyself from '@/components/resume/introduceMyself/index.vue'
import renderPage from '@/components/resume/renderPage/index.vue'

let data = ref({
  myInfo: {
    avatar: 'https://blog.icestone.work/default.png',
    email: 'killicestone@126.com',
    website: "https://blog.icestone.work/#/",
    phone: 18672148720,
    summary: ""
  }
})
let startX = ref();
const onMousemove = (e: any) => {
  const endX = e.clientX
  // (endx-startx)= 移动的距离
  const moveLen = endX - startX.value
  // resize[i].left+移动的距离=左边区域最后的宽度
  const CurBoxLen = curLen.value + moveLen
  if (CurBoxLen < 150 || CurBoxLen > 500) {
    return
  }
  leftContentRef.value.style.width = CurBoxLen + 'px';
};
const onMouseup = (e: any) => {
  resizeBox.value.style.background = 'rgba(122, 115, 116, 1)';
  // 移除监听
  document.removeEventListener('mousedown', onMouseDown)
  document.removeEventListener('mousemove', onMousemove)
};
let resizeBox = ref()
let curLen = ref();
let currentBox = ref();
let leftContentRef = ref();

const onMouseDown = (e: any) => {
  startX.value = e.clientX
  curLen.value = leftContentRef.value.clientWidth
  // 改变颜色
  resizeBox.value.style.background = 'rgba(56, 25, 36, 1)';
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}

const dragControllerDiv: any = () => {
  // 拖拽条
  const resize = document.getElementsByClassName('resize')
  // 循环为每个拖拽条添加事件
  for (let i = 0; i < resize.length; i++) {
    // 鼠标按下事件
    resize[i].addEventListener('mousedown', onMouseDown)
  }
}
onMounted(() => {
  dragControllerDiv()
})

// 定时将 data 存入本地
setInterval(() => {
  localStorage.setItem('info', JSON.stringify(data.value))
}, 2000)
const init = () => {
  if (localStorage.getItem('info')) {
    data.value = JSON.parse(localStorage.getItem('info'))
  }
}
init()

</script>

<style scoped lang="less">
.flexC(){
  display: flex;
  flex-direction: column;
}

.resume{
  .formContainer{
    width: 100%;
    height: 95vh;
  }
}
.left, .center, .right{
  height: 100%;
  box-sizing: border-box;
  background: @white-10;
  border-radius: @radio-n;
}
.left{
  .flexC();
  width: 18rem;
  padding: 0 @p-normal;
  box-sizing: border-box;
}
.center{
  .flexC();
  flex: 1;
  margin: 0 @m-small;
  overflow: hidden;
  position: relative;
}
.right{
  .flexC();
  width: 15%;
}

.resize{
  cursor: col-resize;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  align-items: center;
  background-color: @btn-skyblue;
  border-radius: 3px;
  width: 5px;
  height: 100%;
  background-size: cover;
  background-position: center;
  font-size: 20px;
  color: black;
  text-align: center;
  transition-duration: @time-n;
  user-select: none;

  &:hover{
    background: @themeActiveColor;
  }
}

</style>