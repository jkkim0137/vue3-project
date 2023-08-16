<template>
  <el-table
    :data="pagedTableData"
    style="width: 100%"
    @cell-click="cellClickHandler"
    @select="selectHandler"
  >
    <el-table-column type="selection" width="55" />
    <el-table-column prop="name" label="이름" width="180" />
    <el-table-column prop="age" label="나이" width="180" />
    <el-table-column prop="gender" label="성별" />
    <el-table-column prop="email" label="이메일" />
    <el-table-column prop="lastUpdateDate" label="날짜">
      <template #default="scope">
        {{ scope.row.lastUpdateDate.split('T')[0].replace('"', '') }}
      </template>
    </el-table-column>
  </el-table>
  <div class="flex relative items-center m-1.5">
    <div class="absolute left-0 text-basic">총 {{ tableListData?.length }} 개</div>
    <div class="pagination-wrap flex-1">
      <el-pagination
        layout="prev, pager, next"
        :total="tableListData?.length"
        @current-change="handleCurrentChange"
      />
    </div>
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

const pageStart = ref(0)
const pageEnd = ref(props.itemPerPage)

watch(
  () => props.listData,
  (newValue) => {
    console.log(newValue)
    tableListData.value = newValue.data.sort(
      (a, b) =>
        new Date(b.lastUpdateDate.replace(/^"|"$/g, '')) -
        new Date(a.lastUpdateDate.replace(/^"|"$/g, ''))
    )
  }
)

const emit = defineEmits('detailViewHandler, selectHandler')

const handleCurrentChange = (val) => {
  pageStart.value = (val - 1) * 10
  pageEnd.value = val * 10 - 1
}

const pagedTableData = computed(() => {
  return tableListData.value.slice(pageStart.value, pageEnd.value)
})

const cellClickHandler = (data, column) => {
  if (column.property !== undefined) {
    detailViewHandler(data, column)
  }
}

const detailViewHandler = (data, column) => {
  emit('detailViewHandler', data, column)
}
const selectHandler = (selection, rows) => {
  emit('selectHandler', selection, rows)
}
</script>
<style>
table .el-table__row:hover .cell {
  text-decoration: underline;
  cursor: pointer;
}
.pagination-wrap {
  display: flex;
  justify-content: center;
}
</style>
