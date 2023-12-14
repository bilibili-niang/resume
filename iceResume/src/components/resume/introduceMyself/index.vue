<script setup lang="ts">
const props = defineProps({
  modelValue: Object
})

let data = ref()
const init = () => {
  data.value = props.modelValue;
}

const emits = defineEmits(['update:myInfo'])
// 子组件的内容改变,update父组件中的内容
const inputChange = () => {
  emits('update:myInfo', data.value)
}
init();

</script>

<template>
  <div class="introduceMyself">
    <ice-row class="alignC">
      <ice-avatar :src="data.avatar" block></ice-avatar>
      <ice-input v-model="data.avatar" placeholder="picture" @input="inputChange"></ice-input>
    </ice-row>

    <ice-column>
      <ice-column>
        <div class="verticalLine"></div>
        <ice-input v-model="data.name" placeholder="全名" @input="inputChange"></ice-input>
        <div class="verticalLine"></div>
        <ice-input v-model="data.email" placeholder="email" @input="inputChange"></ice-input>
        <div class="verticalLine"></div>
        <ice-input v-model="data.address" placeholder="当前居住地" @input="inputChange"></ice-input>
        <div class="verticalLine"></div>
        <ice-input v-model="data.website" placeholder="个人网站" @input="inputChange"></ice-input>
        <div class="verticalLine"></div>
        <ice-input v-model="data.phone" placeholder="手机号" @input="inputChange"></ice-input>
        <div class="verticalLine"></div>
        <ice-header>
          总结
        </ice-header>
        <ice-input v-model="data.summary" placeholder="总结" @input="inputChange"></ice-input>


      </ice-column>

    </ice-column>
  </div>
</template>

<style scoped lang="less">
.introduceMyself{
  box-sizing: border-box;
  padding: 0 @p-small;
}

</style>