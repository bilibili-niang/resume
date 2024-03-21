<script setup lang="ts">
import indexHeader from '@/components/index/header.vue';
</script>

<template>
  <div class="index">
    <ice-column>
      <ice-header size='l'>
        iceResume
      </ice-header>
      <ice-avatar size="120" block src="/public/logo.png"></ice-avatar>

      <ice-row>
        <ice-link href="/#/resume">起步</ice-link>
      </ice-row>

      <ice-row class="alignC">
        <indexHeader></indexHeader>
        <ice-text>
          基于
          <ice-tag>vue</ice-tag>
          ,
          <ice-link href="https://github.com/bilibili-niang/icePro" target="_blank" color="luoxiahong">icepro</ice-link>
          简历编写工具
        </ice-text>
      </ice-row>


    </ice-column>
  </div>

</template>

<style scoped lang="less">
.index{
  padding: 0 @padding-layout-small;
  display: flex;
  box-sizing: border-box;
  width: 100%;
}
</style>