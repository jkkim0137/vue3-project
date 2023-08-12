<template>
  <el-table :data="tableData" style="width: 100%" @cell-click="detailViewHandler">
    <el-table-column prop="name" label="이름" width="180" />
    <el-table-column prop="age" label="나이" width="180" />
    <el-table-column prop="gender" label="성별" />
    <el-table-column prop="email" label="이메일" />
  </el-table>
</template>
<script setup>
import { ref, defineEmits } from 'vue'

const tableData = [
  {
    name: 'Tom0',
    age: '30',
    gender: 'No. 189, Grove St, Los Angeles',
    email: 'No. 189, Grove St, Los Angeles'
  },
  {
    name: 'Tom1',
    age: '30',
    gender: 'No. 189, Grove St, Los Angeles',
    email: 'No. 189, Grove St, Los Angeles'
  },
  {
    name: 'Tom2',
    age: '30',
    gender: 'No. 189, Grove St, Los Angeles',
    email: 'No. 189, Grove St, Los Angeles'
  },
  {
    name: 'Tom3',
    age: '30',
    gender: 'No. 189, Grove St, Los Angeles',
    email: 'No. 189, Grove St, Los Angeles'
  }
]
const emit = defineEmits('detailViewHandler')

const detailViewHandler = (data) => {
  emit('detailViewHandler', data)
  console.log('크릭?')
  // console.log(data)
  // console.log(column)
}
</script>
<style></style>
