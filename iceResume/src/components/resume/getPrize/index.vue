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
const decreaseElement = (type: string, target: string) => {
  delete data.value[type][target]
}
init();
</script>

<template>
  <div class="getPrize">

    <ice-header>
      获奖
    </ice-header>

    {{ data }}

    <div class="verticalLine"></div>
    <!--    <template v-for="(key, index) in Object.keys(data.prize)" :key="index">
          <ice-row class="oneRow alignC">
            <ice-input v-model="data.summary[key]" placeholder="奖项名称" class="flex1"></ice-input>
            <ice-button @click="decreaseElement('prize',key)">-</ice-button>
          </ice-row>
        </template>-->


  </div>
</template>

<style scoped lang="less">
.getPrize{

}

</style>