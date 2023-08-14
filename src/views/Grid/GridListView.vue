<template>
  <el-table
    :data="tableListData"
    style="width: 100%"
    @cell-click="detailViewHandler"
    @select="selectHandler"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column prop="name" label="이름" width="180" />
    <el-table-column prop="age" label="나이" width="180" />
    <el-table-column prop="gender" label="성별" />
    <el-table-column prop="email" label="이메일" />
  </el-table>

  <div class="pagination-wrap">
    <el-pagination
      layout="prev, pager, next"
      :total="tableListData?.length"
      @current-change="handleCurrentChange"
    />
  </div>
</template>
<script setup>
import { ref, defineProps, defineEmits, watch, computed } from 'vue'

const props = defineProps({
  listData: {
    type: Array,
    default: () => []
  },
  itemPerPage: {
    type: Number,
    default: 10
  }
})

const tableListData = ref([])
const page = ref(1)
const pageSize = ref(10)

watch(
  () => props.listData,
  (newValue) => {
    tableListData.value = newValue.data
    // console.log(newValue)
  }
)

const emit = defineEmits('detailViewHandler, selectHandler')

const handleCurrentChange = (val) => {
  console.log(`current page: ${val}`)

  console.log(props.listData.data)

  // tableListData.value = props.listData.data.slice(
  //   pageSize.value * page.value - pageSize.value,
  //   pageSize.value * page.value
  // )
  // console.log(tableListData.value)
}
// const pagedTableData = computed(() => {
//   // return console.log(props.listData.data)
//   return (tableListData.value = props.listData.data.slice(
//     pageSize.value * page.value - pageSize.value,
//     pageSize.value * page.value
//   ))
// })
const detailViewHandler = (data) => {
  emit('detailViewHandler', data)
}

const selectHandler = (selection, rows) => {
  emit('selectHandler', selection, rows)
}
</script>
<style></style>
