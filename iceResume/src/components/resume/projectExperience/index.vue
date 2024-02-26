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
      <template v-for="(key, index) in data" :key="index">
        {{ key }}

      </template>
    </ice-column>
  </div>
</template>

<style scoped lang="less">

</style>