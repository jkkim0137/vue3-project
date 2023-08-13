<template>
  <div class="grid-wrap">
    <!-- list -->
    <div v-if="isMode('list')">
      <div class="right">
        <el-button type="primary" @click="onClickAddUser">신규추가</el-button>
      </div>
      <GridListView @detailViewHandler="detailViewHandler" :listData="listData"></GridListView>
    </div>
    <!-- //list -->

    <!-- detail -->
    <div v-else>
      <el-button plian @click="goToList">목록으로</el-button>
      <GridDetailView :detailData="detailData" :mode="mode" @goToList="goToList"></GridDetailView>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import GridListView from './GridListView.vue'
import GridDetailView from './GridDetailView.vue'

onMounted(() => {
  getAllList()
})
const listData = ref([])
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
  setMode('detail')
  detailData.value = data
  console.log(data.id)
}

const onClickAddUser = () => {
  console.log('유저 추가 ')
  setMode('create')
}

const goToList = () => {
  console.log('이전으로')
  detailData.value = {}
  setMode('list')
  getAllList()
}

const getAllList = () => {
  const request = axios({
    method: 'get',
    url: '/api/users'
    // data: {
    //   name: 'Fred',
    //   age: 'Flintstone',
    //   gender: 'Flintstone',
    //   email: 'Flintstone'
    // }
  })
  request.then((response) => {
    if (response.status === 200) {
      listData.value = response.data
    }
  })
}
</script>
<style>
.grid-wrap {
  padding: 50px;
  width: 1000px;
}
.right {
  text-align: right;
}
</style>
