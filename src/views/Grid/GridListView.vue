<template>
  <!-- {{ listData.data }} -->
  <el-table
    :data="props.listData.data"
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
</template>
<script setup>
import { ref, defineProps, defineEmits } from 'vue'

const props = defineProps({
  listData: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits('detailViewHandler, selectHandler')

const detailViewHandler = (data) => {
  emit('detailViewHandler', data)
}

const selectHandler = (selection, rows) => {
  emit('selectHandler', selection, rows)
}
</script>
<style></style>
