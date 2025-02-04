<script setup lang="ts">
import {ref} from 'vue';

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
const addElement = () => {
  const tempObj = (JSON.stringify(data.value[0]))
  if (tempObj) {
    data.value.push(
        JSON.parse(tempObj)
    )
  } else {
    data.value.push({
      name: 'Vue',
      extent: '熟练',
    })
  }
}
const delElement = (index: number) => {
  data.value.splice(index, 1);
}

init();
</script>

<template>
  <div class="skill">
    <ice-column>
      <ice-header>专业技能</ice-header>
      <ice-row v-for="(item,index) in data" :key="index">
        <ice-row width="85%" class="alignC">
          <ice-input v-model="item.name" placeholder="技能"/>
          <ice-input v-model="item.extent" placeholder="熟练度" size="s"/>
        </ice-row>
        <ice-button @click="delElement(index)" v-if="index!==0">减一</ice-button>
      </ice-row>
      <ice-button @click="addElement('skill')">加一</ice-button>
    </ice-column>
  </div>
</template>

