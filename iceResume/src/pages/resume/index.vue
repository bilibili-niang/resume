<template>
  <div class="resume">
    <ice-row>
      <ice-text>resume</ice-text>
      <indexHeader/>
    </ice-row>

    <div class="formContainer ice-row" ref="currentBox">
      <div class="left" ref="leftContentRef">
        <ice-button @click="generate">生成</ice-button>
        <!--自我介绍-->
        <introduceMyself v-model="data.myInfo"/>


      </div>
      <div class="resize" title="收缩侧边栏" ref="resizeBox">⋮</div>
      <div class="center">

        <renderPage :data="data" id="pdfDom"/>

      </div>
      <!-- <div class="right" ref="rightBox"></div>-->
    </div>

  </div>
</template>

<script setup lang="ts">
import indexHeader from "@/components/index/header.vue"
import introduceMyself from '@/components/resume/introduceMyself/index.vue'
import renderPage from '@/components/resume/renderPage/index.vue'
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";

let data = ref({
  myInfo: {
    avatar: 'https://blog.icestone.work/default.png',
    email: 'killicestone@126.com',
    website: "https://blog.icestone.work/#/",
    phone: 18672148720,
    summary1: "",
    summary2: "",
    summary3: "",
    wechatId: '',
    educate: ''
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
const generate = (title = 'resume') => {
  nextTick(() => {
    // htmlToPdfFun('pdfDom', '个人报告')
    const element = document.getElementById('pdfDom');

    const opts = {
      scale: 12, // 缩放比例，提高生成图片清晰度
      useCORS: true, // 允许加载跨域的图片
      allowTaint: false, // 允许图片跨域，和 useCORS 二者不可共同使用
      tainttest: true, // 检测每张图片已经加载完成
      logging: true // 日志开关，发布的时候记得改成 false
    };

    html2Canvas(element, opts)
        .then((canvas) => {
          const contentWidth = canvas.width;
          const contentHeight = canvas.height;
          // 一页pdf显示html页面生成的canvas高度;
          const pageHeight = (contentWidth / 592.28) * 841.89;
          // 未生成pdf的html页面高度
          let leftHeight = contentHeight;
          // 页面偏移
          let position = 0;
          // a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
          const imgWidth = 595.28;
          const imgHeight = (592.28 / contentWidth) * contentHeight;
          const pageData = canvas.toDataURL("image/jpeg", 1.0);
          // a4纸纵向，一般默认使用；new JsPDF('landscape'); 横向页面
          const PDF = new JsPDF("", "pt", "a4");
          // 当内容未超过pdf一页显示的范围，无需分页
          if (leftHeight < pageHeight) {
            // addImage(pageData, 'JPEG', 左，上，宽度，高度)设置
            PDF.addImage(pageData, "JPEG", 0, 0, imgWidth, imgHeight);
          } else {
            // 超过一页时，分页打印（每页高度841.89）
            while (leftHeight > 0) {
              PDF.addImage(pageData, "JPEG", 0, position, imgWidth, imgHeight);
              leftHeight -= pageHeight;
              position -= 841.89;
              if (leftHeight > 0) {
                PDF.addPage();
              }
            }
          }
          console.log("title:")
          console.log(title)
          PDF.save(title + ".pdf");
        })
        .catch((error) => {
          console.log("打印失败", error);
        });
  })
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