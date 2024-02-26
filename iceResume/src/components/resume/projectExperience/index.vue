<script setup lang="ts">

const props = defineProps({
  modelValue: Object
})
let data = ref()
const init = () => {
  data.value = props.modelValue;
}

init();
</script>

<template>
  <div class="projectExperience">
    <ice-column>
      <ice-header>项目经历</ice-header>
      <div class="verticalLine"></div>
      <ice-column>
        <template v-for="(key, index) in data" :key="index">
          <ice-input v-model="key.projectName" placeholder="项目名称" class="flex1"></ice-input>
          <ice-input v-model="key.company" placeholder="所属公司" class="flex1"></ice-input>
          <ice-input v-model="key.projectTime" placeholder="起止时间" class="flex1"></ice-input>
          <ice-input v-model="key.projectRole" placeholder="角色" class="flex1"></ice-input>
          textarea:
          <ice-textarea v-model="key.projectContent" placeholder="项目描述" class="flex1"></ice-textarea>



        </template>
      </ice-column>

    </ice-column>
  </div>
</template>

<style scoped lang="less">

</style>