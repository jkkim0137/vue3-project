<template>
  <!-- list -->
  <div v-if="isMode('list')">
    <el-button type="primary" @click="onClickAddUser">신규추가</el-button>
    <GridListView @detailViewHandler="detailViewHandler"></GridListView>
  </div>
  <!-- //list -->

  <!-- detail -->
  <div v-else>
    <el-button plian @click="goToList">이전으로</el-button>
    <GridDetailView :detailData="detailData" :mode="mode" @goToList="goToList"></GridDetailView>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import GridListView from './GridListView.vue'
import GridDetailView from './GridDetailView.vue'

const detailData = ref({})
const mode = ref('list')

const isMode = (modeName) => {
  console.log(modeName)
  return mode.value === modeName
}

const setMode = (newMode) => {
  mode.value = newMode
}

const detailViewHandler = (data) => {
  detailData.value = data
  setMode('detail')
}

const onClickAddUser = () => {
  console.log('유저 추가 ')
  setMode('create')
}

const goToList = () => {
  console.log('이전으로')
  setMode('list')
}
</script>
<style></style>
