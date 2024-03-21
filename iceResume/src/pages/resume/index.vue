<template>
  <div class="resume">
    <ice-row>
      <ice-text>resume</ice-text>
      <indexHeader/>
    </ice-row>

    <div class="formContainer ice-row" ref="currentBox">
      <div class="left" ref="leftContentRef">
        <ice-row>
          <ice-column class="leftMenu" v-if="false"></ice-column>
          <ice-column class="rightSelection">
            <ice-row>
              <ice-button @click="generate" hover type="shadow-r-t">生成pdf</ice-button>
              <ice-button @click="generateWord" v-if="false">生成word</ice-button>
              <ice-button @click="generateHtml">生成html</ice-button>
              <ice-button @click="showAllTrigger" v-if="resumeData.$state.resumeData.menu!=='all'">展示所有</ice-button>
            </ice-row>

            <div class="column widthAuto">
              <ice-text>选择一种model</ice-text>
              <ice-selector v-model="showModel" :list="selectionList"></ice-selector>
            </div>
            <customConfig></customConfig>

            <!--自我介绍-->
            <introduceMyself v-model="data.myInfo"
                             v-if="menuData[resumeData.$state.resumeData.menu]==='introduceMyself' || showAll"/>
            <!--教育经历-->
            <educationalExperience v-model="data.education"
                                   v-if="menuData[resumeData.$state.resumeData.menu]==='educationalExperience' || showAll"/>

            <!--项目经历-->
            <projectExperience v-model="data.projectData"
                               v-if="menuData[resumeData.$state.resumeData.menu]==='projectExperience' || showAll"/>
            <!--获奖-->
            <getPrize
                v-model="data.prize"
                v-if="menuData[resumeData.$state.resumeData.menu]==='prize' || showAll"/>

            <!--专业技能-->
            <skill v-model="data.skill"
                   v-if="menuData[resumeData.$state.resumeData.menu]==='skill' || showAll"/>


          </ice-column>
        </ice-row>

      </div>
      <div class="resize" title="收缩侧边栏" ref="resizeBox">⋮</div>
      <div class="center">
        <renderPage :data="data" id="pdfDom" v-show="showModel==='resume'"/>
        <markdownCard :data="data" id="markdownCard" v-show="showModel==='markdownCard'"></markdownCard>

      </div>
    </div>
  </div>
</template>

<script setup>
// 父组件引入子组件的正确写法:
import indexHeader from "@/components/index/header.vue";
import renderPage from "@/components/resume/renderPage/index.vue";
import getPrize from "@/components/resume/getPrize/index.vue";
import projectExperience from "@/components/resume/projectExperience/index.vue";
import html2Canvas from "html2canvas";
import JsPDF from "jspdf";
import resumeStore from "@/store/modules/resume.ts";
import {ref} from "vue";
import {menuData} from "@/config.js";
import {saveAs} from "file-saver";
import {asBlob} from "html-docx-js-typescript";
import customConfig from "@/components/resume/customConfig/index.vue";
import {messageAlert} from "@/utils/utils.js";
import markdownCard from "@/components/resume/markdownCard/index.vue";
import lessToJs from "less-vars-to-js";

const resumeData = resumeStore();

let data = ref({});
let startX = ref();
const onMousemove = (e) => {
  const endX = e.clientX;
  // (endx-startx)= 移动的距离
  const moveLen = endX - startX.value;
  // resize[i].left+移动的距离=左边区域最后的宽度
  const CurBoxLen = curLen.value + moveLen;
  if (CurBoxLen < 150 || CurBoxLen > 500) {
    return;
  }
  leftContentRef.value.style.width = CurBoxLen + "px";
};
const onMouseup = () => {
  resizeBox.value.style.background = "rgba(122, 115, 116, 1)";
  // 移除监听
  document.removeEventListener("mousedown", onMouseDown);
  document.removeEventListener("mousemove", onMousemove);
};
let resizeBox = ref();
let curLen = ref();
let currentBox = ref();
let leftContentRef = ref();

const onMouseDown = (e) => {
  startX.value = e.clientX;
  curLen.value = leftContentRef.value.clientWidth;
  // 改变颜色
  resizeBox.value.style.background = "rgba(56, 25, 36, 1)";
  document.addEventListener("mousemove", onMousemove);
  document.addEventListener("mouseup", onMouseup);
};

const dragControllerDiv = () => {
  // 拖拽条
  const resize = document.getElementsByClassName("resize");
  // 循环为每个拖拽条添加事件
  for (let i = 0; i < resize.length; i++) {
    // 鼠标按下事件
    resize[i].addEventListener("mousedown", onMouseDown);
  }
};
onMounted(() => {
  dragControllerDiv();
});

// 定时将 data 存入本地
setInterval(() => {
  if (data.value !== "{}") {
    localStorage.setItem("info", JSON.stringify(data.value));
  }
}, 2000);
const init = () => {
  /*if (localStorage.getItem('info')) {
    resumeData.updateResume(JSON.parse(localStorage.getItem('info')))
  }*/
  data.value = resumeData.$state.resumeData;
};
/**
 * 生成pdf
 */
const generate = () => {
  messageAlert("pdf正在生成,请稍等几秒");
  nextTick(() => {
    // htmlToPdfFun('pdfDom', '个人报告')
    const element = document.getElementById("pdfDom");
    const opts = {
      scale: 12, // 缩放比例，提高生成图片清晰度
      useCORS: true, // 允许加载跨域的图片
      allowTaint: false, // 允许图片跨域，和 useCORS 二者不可共同使用
      // tainttest: true, // 检测每张图片已经加载完成
      logging: false // 日志开关，发布的时候记得改成 false
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
          PDF.save("我的简历.pdf");
          // PDF.save(title + ".pdf");
        })
        .catch((error) => {
          console.log("打印失败", error);
        });
  });
};
const handleCss = async () => {
  const rootElement = document.querySelector("#pdfDom");
  const allStyles = getAllStyles(rootElement); // 获取所有样式
  console.log(allStyles); // 打印样式对象
  return allStyles;
};

function getAllStyles(element) {
  // 创建一个对象来存储样式
  var styles = {};

  // 定义一个函数来递归获取样式
  function getStylesRecursive(elem) {
    // 获取当前元素的计算样式
    var computedStyle = window.getComputedStyle(elem);

    // 将当前元素的ID（或其他唯一标识）作为键，其样式作为值存入对象
    styles[elem.id] = {};
    for (var i = 0; i < computedStyle.length; i++) {
      var styleName = computedStyle[i];
      var styleValue = computedStyle.getPropertyValue(styleName);
      styles[elem.id][styleName] = styleValue;
    }

    // 遍历子节点
    for (var i = 0; i < elem.children.length; i++) {
      getStylesRecursive(elem.children[i]); // 递归调用
    }
  }

  // 从给定的元素开始递归
  getStylesRecursive(element);

  // 返回包含所有样式的对象
  return styles;
}

// 生成word
const generateWord = async () => {
  const htmlString = document.getElementById("pdfDom").innerHTML
      // strong在word中不生效问题
      .replace(/<strong>/g, "<b>")
      .replace(/<\/strong>/g, "</b>")
      // 背景色不生效问题
      .replace(/<mark/g, "<span")
      .replace(/<\/mark>/g, "</span>");

  // let cssHTML = await handleCss();
  let cssHTML = `
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    text-decoration: none;
    color: red;
}`;
  // 创建一个完整的HTML文档字符串
  const fullHtmlString = `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Document</title>
      <style> ${cssHTML}</style>
    </head>
    <body>
      ${htmlString}
    </body>
    </html>`;

  console.log("cssHTML:");
  console.log(cssHTML);
  // return;
  asBlob(fullHtmlString).then(data => {
    saveAs(data, "file.docx"); // save as docx file
  });
};

// 生成html
// 获取全局css
const css = document.querySelector("style").innerHTML;
const generateHtml = () => {
  console.log(css);
  /*  const targetDom = document.querySelector("#markdownCard");
  downloadFile(targetDom.innerHTML);*/
};
// 下载事件
const downloadFile = (str, name = "resume.html") => {
  // 创建一个Blob对象，包含HTML内容
  const blob = new Blob([str], {type: "text/html;charset=utf-8"});
  // 创建一个a标签用于下载
  const a = document.createElement("a");
  // 创建一个对象URL，指向Blob对象
  const url = window.URL.createObjectURL(blob);
  // 设置a标签的属性
  a.href = url;
  a.download = name; // 设置下载的文件名
  a.style.display = "none"; // 隐藏a标签
  // 将a标签添加到文档中
  document.body.appendChild(a);
  // 触发点击事件以开始下载
  a.click();
  // 下载完成后，移除对象URL并从文档中移除a标签
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

init();

let showAll = computed(() => {
  return resumeData.$state.resumeData.menu === "all" ? true : false;
});

const showAllTrigger = () => {
  resumeData.updateMenu("all");
  console.log("resumeData.$state.resumeData.menu:");
  console.log(resumeData.$state.resumeData.menu);
};

// 展示模式
const showModel = ref("resume");

const selectionList = reactive([
  {
    label: "简历编写",
    value: "resume"
  },
  {
    label: "markdown模块",
    value: "markdownCard"
  },
]);

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
  overflow-y: scroll;

  &::-webkit-scrollbar{
    width: 8px; /* 滚动条宽度 */
  }

  &::-webkit-scrollbar-track{
    background: #f1f1f1; /* 滚动条轨道背景色 */
  }

  &::-webkit-scrollbar-thumb{
    background: #888; /* 滚动条颜色 */
  }

  &::-webkit-scrollbar-thumb:hover{
    background: #555; /* 滚动条悬停颜色 */
  }


  .leftMenu{
    //width: 1.5rem !important;
  }

  .rightSelection{
    flex: 1;
  }
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