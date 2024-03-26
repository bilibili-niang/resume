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
watch(data, () => {
  emits('update:myInfo', data.value)
})
init();
// 控制元素添加
const addElement = (type: string) => {
  const list = data.value[type]
  const keys = Object.keys(list)
  // 生成顺序的key
  let tempKey = ''
  try {
    // 这里报错,是因为 summary 里面可能被删空了
    tempKey = type + (parseInt(keys[keys.length - 1].charAt(keys[keys.length - 1].length - 1)) + 1 + '');
  } catch (e) {
    tempKey = 'summary1'
  }
  data.value[type][tempKey] = ''
}
// 减少
const decreaseElement = (type: string, target: string) => {
  console.log("data.value[type]")
  console.log(data.value[type])

  console.log("Object.keys(data.value[type]):")
  console.log(Object.keys(data.value[type]))
  delete data.value[type][target]
}
// 控制元素删除
const deleteElement = (type: string, index: number) => {
  console.log("delete", type, index)
  console.log(data.value)
  console.log(data.value[type])
}


</script>

<template>
  <div class="introduceMyself">
    <ice-header>基本信息</ice-header>
    <ice-row class="alignC">
      <ice-avatar :src="data.avatar" block></ice-avatar>
      <ice-input v-model="data.avatar" placeholder="picture"></ice-input>
    </ice-row>

    <ice-column>
      <ice-column>
        <div class="verticalLine"></div>
        <ice-input v-model="data.name" placeholder="全名"></ice-input>
        <div class="verticalLine"></div>

        <template v-for="(key, index) in Object.keys(data.email)" :key="index">
          <ice-row class="oneRow alignC">
            <ice-input v-model="data.email[key]" placeholder="email" class="flex1"></ice-input>
            <ice-button @click="decreaseElement('email',key)">-</ice-button>
          </ice-row>
        </template>

        <ice-button @click="addElement('email')">加一</ice-button>

        <div class="verticalLine"></div>
        <ice-input v-model="data.address" placeholder="当前居住地"></ice-input>
        <div class="verticalLine"></div>
        <ice-input v-model="data.website" placeholder="个人网站"></ice-input>
        <div class="verticalLine"></div>
        <ice-input v-model="data.phone" placeholder="手机号"></ice-input>
        <div class="verticalLine"></div>
        <ice-input v-model="data.wechatId" placeholder="微信"></ice-input>
        <div class="verticalLine"></div>
        <ice-header>
          总结
        </ice-header>

        <template v-for="(key, index) in Object.keys(data.summary)" :key="index">
          <ice-column class="oneRow alignC">
            <ice-textarea :rows="10" v-model="data.summary[key]" class="flex1 w100Percent"></ice-textarea>
            <ice-row class="justS w100Percent">
              <ice-button @click="decreaseElement('summary',key)">-</ice-button>
            </ice-row>
          </ice-column>
        </template>
        <ice-button @click="addElement('summary')">加一</ice-button>
      </ice-column>

    </ice-column>
  </div>
</template>

<style scoped lang="less">
.introduceMyself {
  box-sizing: border-box;
  padding: 0 @p-small;

  .oneRow {

  }
}
</style>
