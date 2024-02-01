<template>
  <div class="modal-wrapper">
    <div class="modal-layout">
      <el-button text class="modal-close" :bg="false">X</el-button>
      <div class="modal-header flex items-center">
        {{ props.userListData }}
        {{ props.title }}
        {{ props.selectedListData }}
      </div>
      <div class="modal-container ">
        <div class="modal-content max-h-[700px] overflow-y-scroll">
          <el-table
            :data="userListData"
            style="width: 100%"
            @cell-click="cellClickHandler"
            @select="selectHandler"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="checked" width="85">
              <template #default="scope">
                <el-checkbox
                  v-model="scope.row.checked"
                  label
                  size="large"
                  @change="(val, $e) => handleChecked(val, $e, scope.row)"
                />
                {{ scope.row.checked }}
              </template>
            </el-table-column>
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
        </div>
      </div>
      <div class="modal-footer">
        <el-button @click="() => onCloseModal()">취소</el-button>
        <!-- {{ selectedItemList }} -->
        <el-button type="primary" @click="() => addSelectedItems(selectedItemList)">추가</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, defineEmits, watchEffect } from 'vue'
import axios from 'axios'

const props = defineProps({
  isModalOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    defulat: ''
  },
  selectedListData: {
    type: Array,
    default: () => []
  }
})

const listData = ref([])
const userListData = ref([])
const selectedItemList = ref([])
// const selectedItems = ref([]) // 선택된 인덱스 저장

const checked = ref(false)
onMounted(() => {
  console.log('mounted')
  getAllList()
})

// watchEffect(() => {
//   // 선택된 항목의 인덱스 배열을 출력
//   console.log('Selected indices:', selectedItems.value)
// })

// 선택된 항목들이 변경될 때마다 실행되는 이벤트 핸들러
// const handleSelectionChange = (selectedRows) => {
//   console.log('선택되었나요오오옹 ')
//   console.log(selectedRows)
//   selectedItems.value = selectedRows
//   console.log('Selected items:', selectedItems.value)
// }
const emit = defineEmits('addSeletedItems, onCloseModal')

const getAllList = () => {
  const request = axios({
    method: 'get',
    url: '/api/users'
  })
  request.then((response) => {
    if (response.status === 200) {
      listData.value = response.data

      userListData.value = listData.value.data.map((item) => ({ ...item, checked: false }))
      console.log(userListData.value)
    }
  })
}

// const selectHandler = (selection, rows, e) => {
//   console.log('selected')
//   console.log(selection)
//   console.log(rows)
//   console.log(e)
//   selectedItemList.value = selection
// }

const handleChecked = (val, e, item) => {
  // console.log(val)
  // console.log(e)
  // console.log(item)
  selectedItemList.value.push(item)
}

const addSelectedItems = (selectedList) => {
  emit('addSelectedItems', selectedList)
}

const onCloseModal = () => {
  emit('onCloseModal')
}
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
  width: 800px;
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
}
.modal-content {
  min-height: 300px;
  overflow-y: auto;
  padding: 20px;
}
.modal-footer {
  text-align: center;
  height: 50px;
}
</style>
