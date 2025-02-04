<script setup lang="ts">
const props = defineProps({
  modelValue: Object
})

let data = ref()
const init = () => {
  data.value = props.modelValue;
}
const emits = defineEmits(['update:education'])

// 子组件的内容改变,update父组件中的内容
watch(data, () => {
  emits('update:education', data.value)
})
init();

// 控制元素添加
const addElement = () => {
  data.value.push(
      {
        school: '武汉轻工大学',
        major: '软件工程',
        time: '2022.09-2024.06',
        degree: '本科'
      }
  )
}
/**
 * 删除元素
 */
const delElement = (index: number) => {
  data.value.splice(index, 1);
}

</script>

<template>
  <div class="educationalExperience">
    <ice-column>
      <ice-header>教育经历</ice-header>
      <template v-for="(item, index) in data" :key="index">
        <ice-column class="m-top-large">
          <ice-input v-model="item.school" placeholder="学校"></ice-input>
          <ice-input v-model="item.major" placeholder="专业"></ice-input>
          <ice-input v-model="item.time" placeholder="就读时间"></ice-input>
          <ice-input v-model="item.degree" placeholder="层级"></ice-input>
        </ice-column>
        <ice-button v-if="index!==0" @click="delElement(index)">减一</ice-button>
      </template>
    </ice-column>
    <ice-button @click="addElement">加一</ice-button>

  </div>

</template>

<style scoped lang="less">

</style>
