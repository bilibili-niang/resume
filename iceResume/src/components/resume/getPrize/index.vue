<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps({
  modelValue: Object
})

let data = ref()
const init = () => {
  data.value = props.modelValue;
}
// 较少指定
const decreaseElement = (key: number) => {
  console.log("key", key)
  console.log(data.value[key])
  delete data.value[key]
}
init();
</script>

<template>
  <div class="getPrize">
    <ice-header>获奖</ice-header>
    <div class="verticalLine"></div>
    <template v-for="(key, index) in data" :key="index">
      <ice-row class="oneRow alignC m-top-small">
        <ice-column>
          <ice-input v-model="key.prizeName" placeholder="奖项名称" class="flex1"></ice-input>
          <ice-input v-model="key.prizeTime" placeholder="获奖时间" class="flex1"></ice-input>
        </ice-column>
        <ice-button @click="decreaseElement(index)">-</ice-button>
      </ice-row>
    </template>


  </div>
</template>

<style scoped lang="less">
.getPrize{

}

</style>