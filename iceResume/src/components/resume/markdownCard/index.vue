<script setup lang="ts">
const props = defineProps({
  data: {
    type: Object
  },
})

</script>

<template>
  <div class="markdownCard">
    <ice-avatar :src="data.myInfo.avatar" block></ice-avatar>
    {{ data.myInfo }}

  </div>
</template>

<style scoped lang="less">
.markdownCard{
  margin: 0 auto;
  width: 1000px;
  background: @bac-dark-bleak;
  padding: @p-large;
  color: @fontColor;
  border-radius: @radio-n;
}
</style>