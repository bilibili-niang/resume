<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  modelValue: Object
})
let data = ref()
const init = () => {
  data.value = props.modelValue
}

// 增加项目
const addElement = () => {
  data.value.push({
    company: '浙江嘉兴数字城市实验室有限公司',
    projectName: '基层治理综合信息平台',
    projectTime: '2023.05-08',
    projectContent: '项目描述\n' +
      '负责全市社会治理信息化规划,建设和管理,同时协调指导各级指挥中心的运行.建立标准化流程,实现事务处理的规范高效的运营\n' +
      'toB平台的后台管理系统,面向政府,主要是功能的安全性和实现,pc端\n' +
      '职责描述:\n' +
      '基于elementui,less还原原型图/ui设计稿,并确保用户体验的易用性\n' +
      '使用axios统一封装底层api接口,方便接口完全脱离业务和统一管理\n' +
      '对于一些状态数据存储与校验,使用mixins封装部分业务逻辑,确保前端用户权限的区分和每个功能的权限区分.\n' +
      '基于echarts实现饼图,条状图,地图等数据大屏展示,提供直观的数据展示和决策支持.\n' +
      '涉及技术:\n' +
      'vue2, elementui, axios, echarts, vuex',
    projectRole: '前端开发',
    city: '嘉兴',
    // 是否为公司项目,0为false,1为true
    companyProject: 1
  })
}

// 删除项目
const deleteElement = (key: number) => {
  data.value.splice(key, 1)
}

init()
</script>

<template>
  <div class="projectExperience">
    <ice-column>
      <ice-header>项目经历</ice-header>
      <div class="verticalLine"></div>
      <ice-column>
        <template v-for="(key, index) in data" :key="index">
          <ice-header>项目:</ice-header>
          <ice-input v-model="key.projectName" placeholder="项目名称" class="flex1"></ice-input>
          <ice-input v-model="key.company" placeholder="所属公司" class="flex1"></ice-input>
          <ice-input v-model="key.projectTime" placeholder="起止时间" class="flex1"></ice-input>
          <ice-input v-model="key.projectRole" placeholder="角色" class="flex1"></ice-input>
          <ice-textarea v-model="key.projectContent" :rows="20" placeholder="项目描述"></ice-textarea>
          <ice-button @click="deleteElement(index)">删去</ice-button>
        </template>
        <ice-button @click="addElement('projectData')">加一</ice-button>
      </ice-column>

    </ice-column>
  </div>
</template>

<style scoped lang="less">

</style>
