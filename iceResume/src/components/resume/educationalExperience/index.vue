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
</script>

<template>
  <div class="educationalExperience">
    <ice-column>
      <ice-header>教育经历</ice-header>
      <ice-input v-model="data.school" placeholder="学校"></ice-input>
      <ice-input v-model="data.major" placeholder="专业"></ice-input>
      <ice-input v-model="data.time" placeholder="就读时间"></ice-input>
      <ice-input v-model="data.degree" placeholder="层级"></ice-input>
    </ice-column>
    <ice-button>加一</ice-button>

  </div>

</template>

<style scoped lang="less">

</style>