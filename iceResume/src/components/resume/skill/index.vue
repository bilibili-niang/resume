<script setup lang="ts">
const props = defineProps({
  modelValue: Object
})

const emits = defineEmits(['update:myInfo'])

let data = ref()
const init = () => {
  data.value = props.modelValue;
}
watch(data, () => {
  emits('update:myInfo', data.value)
})
const addElement = (type: string) => {
  console.log(data.value)
  const list = data.value
  const keys = Object.keys(list)
  const tempKey = type + (parseInt(keys[keys.length - 1].charAt(keys[keys.length - 1].length - 1)) + 1 + '');
  data.value[tempKey] = {
    name:'技能',
    extent:'熟练度'
  }
}
init();
</script>

<template>
  <div class="skill">
    <ice-column>
      <ice-header>专业技能</ice-header>
      {{ data }}
      <ice-row v-for="(item,index) in data" :key="index">
        <ice-input v-model="item.name" placeholder="技能"/>
        <ice-input v-model="item.extent" placeholder="熟练度" size="s"/>

      </ice-row>

      <ice-button @click="addElement('skill')">加一</ice-button>


    </ice-column>
  </div>
</template>

<style scoped lang="less">

</style>