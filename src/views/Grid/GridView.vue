<template>
  <div class="grid-wrap">
    <!-- list -->
    <div v-if="isMode('list')">
      <div class="right">
        <el-button @click="onDelete(detailData.id)">삭제</el-button>
        <el-button type="primary" @click="onClickAddUser">신규추가</el-button>
      </div>
      <GridListView
        @detailViewHandler="detailViewHandler"
        @selectHandler="selectHandler"
        :listData="listData"
        :itemPerPage="10"
      ></GridListView>
    </div>
    <!-- //list -->

    <!-- detail -->
    <div v-else>
      <!-- <el-button plian @click="goToList">목록으로</el-button> -->
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
const selectedItems = ref([])

const isMode = (modeName) => {
  return mode.value === modeName
}

const setMode = (newMode) => {
  mode.value = newMode
}

const detailViewHandler = (data) => {
  setMode('detail')
  console.log(data)
  console.log(detailData.value)
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

// 목록
const getAllList = () => {
  const request = axios({
    method: 'get',
    url: '/api/users'
  })
  request.then((response) => {
    if (response.status === 200) {
      listData.value = response.data
    }
  })
}

const selectHandler = (selection, rows) => {
  console.log('선택된 row')
  selectedItems.value = selection
}

// 삭제
const onDelete = async () => {
  for (const item of selectedItems.value) {
    console.log(item)
    try {
      const response = await axios.delete(`/api/users/${item.id}`)
      console.log(response.data)
      response.data
    } catch (error) {
      console.log('에러')
    }
  }
  getAllList()
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
