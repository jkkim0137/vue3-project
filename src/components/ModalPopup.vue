<template>
  <div class="modal-wrapper">
    <div class="modal-layout">
      <el-button text class="modal-close" :bg="false">X</el-button>
      <div class="modal-header flex items-center">
        {{ props.title }}
      </div>
      <div class="modal-container">
        {{ props.listData }}
        <el-table
          :data="listData"
          style="width: 100%"
          @cell-click="cellClickHandler"
          @select="selectHandler"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="data.name" label="이름" width="180" />
          <el-table-column prop="age" label="나이" width="180" />
          <el-table-column prop="gender" label="성별" />
          <el-table-column prop="email" label="이메일" />
          <el-table-column prop="lastUpdateDate" label="날짜">
            <template #default="scope">
              {{ scope.row.lastUpdateDate.split('T')[0].replace('"', '') }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps } from 'vue'

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    defulat: ''
  },
  listData: {
    type: Array,
    default: () => []
  }
})
console.log(props.listData)
</script>

<style scoped>
.modal-wrapper:before {
  position: fixed;
  left: 0;
  top: 0;
  content: '';
  display: block;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}
.modal-layout {
  position: fixed;
  width: 500px;
  min-height: 450px;
  background: #fff;
  /* border: 1px solid #efefef; */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
}
.modal-header {
  height: 50px;
  border-bottom: 1px solid #efefef;
  padding: 0 20px;
}
.modal-close {
  position: absolute;
  right: 10px;
  top: 10px;
}
.modal-container {
  padding: 20px;
}
</style>
