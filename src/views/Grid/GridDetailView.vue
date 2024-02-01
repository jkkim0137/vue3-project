<template>
  <el-form label-width="120px">
    <el-form-item label="이름">
      <el-input v-model="userDataSchema.name.val" :disabled="isReadOnly" />
      <div v-if="!isReadOnly" style="color: red">* 이름은 필수 항목입니다.</div>
    </el-form-item>
    <el-form-item label="나이">
      <el-input v-model="userDataSchema.age.val" :disabled="isReadOnly" />
      <div v-if="!isReadOnly" style="color: red">* 나이는 필수 항목입니다.</div>
    </el-form-item>
    <el-form-item label="성별">
      <el-select
        v-model="userDataSchema.gender.val"
        placeholder="선택하세요"
        :disabled="isReadOnly"
      >
        <el-option label="남" value="male" />
        <el-option label="여" value="female" />
      </el-select>
      <div v-if="!isReadOnly" style="color: red">* 성별은 필수 항목입니다.</div>
    </el-form-item>
    <el-form-item label="이메일">
      <el-input v-model="userDataSchema.email.val" :disabled="isReadOnly" />
      <!-- <div v-if="!isReadOnly" style="color: red">* 이메일은 필수 항목입니다.</div> -->
    </el-form-item>
    <el-form-item label="파티원 ">
      <el-col :span="22" class="position">
        <el-input :disabled="isReadOnly" /><br><br>
        <!-- {{ userDataSchema.party.val }} <br><br> -->
     
        <div class="absolute top-0 left-3">
          <span v-for="item in userDataSchema.party.val" :key="item.id" style="color: blue">
            <!-- {{ item.name }} -->
            {{ item.name }} 
            <el-button text small round class="el-button plain--right" @click="removeParty(item.id)" :disabled="isReadOnly"
              >X</el-button
            >
          </span>
        </div>
      </el-col>
      <el-col :span="2">
        <el-button size="default" class="ml-2" @click="addPartyHandler()" :disabled="isReadOnly">추가</el-button>
      </el-col>
    </el-form-item>
    <el-form-item>
      <div v-if="isReadOnly">
        <el-button @click="goToList">취소</el-button>
        <el-button type="primary" @click="onEdit(userData.id)">수정</el-button>
      </div>
      <div v-else>
        <el-button @click="goToList">취소</el-button>
        <el-button type="primary" @click="() => onSubmit(userData.id)">저장</el-button>
      </div>
    </el-form-item>
  </el-form>
  <!-- 파티추가 팝업 -->
  <ModalPopup
    v-if="isModalOpen"
    :title="`파티원 추가`"
    @addSelectedItems="handleAddSelectedItems"
    @onCloseModal="onCloseModal"
    :selectedListData="selectedListData"
  />
  <!-- //파티추가 팝업 -->
</template>
<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue'
import ModalPopup from '../../components/ModalPopup.vue'
import axios from 'axios'

const props = defineProps({
  mode: {
    type: String,
    default: () => 'list'
  },
  detailData: {
    type: Object,
    default: () => {
      return {
        name: '',
        age: '',
        gender: '',
        email: '',
        party:'',
      }
    }
  },
  selectedListData: {
    type: Array,
    default: () => []
  },
  listData: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits('goToList')

const userData = ref({
  name: '',
  age: '',
  gender: '',
  email: '',
  party:'',
})
const selectedListData = ref([])

const userDataSchema = ref({
  name: { val: props.detailData.name, require: true, type: String },
  age: { val: props.detailData.age, require: true, type: Number },
  gender: { val: props.detailData.gender, require: true, type: String },
  email: { val: props.detailData.email, require: false, type: String },
  party: {val:  props.mode === 'create' ? '' : JSON.parse(props.detailData.party), require: false, type: String} 
})
// 추가를 누르면 selectedListData 고 상세에 들어왔을때 props.detailData.party 
// console.log(JSON.parse(props.detailData.party))
const isReadOnly = ref(true)
const isModalOpen = ref(false)

// 생성
const onSubmit = (id) => {
  console.log('submit!')
  console.log('submit! selectedListData ::>> ', selectedListData.value)
  // console.log('submit! userDataSchema ::>> ', userDataSchema.value)
  // console.log('submit! userDataSchema ::>> ', userDataSchema.value.party.val)


  let isValidData = {
    isValid: true,
    message: ''
  }
  for (let key in userDataSchema.value) {
    // 하나씩 검사를 하게 됨
    // require 가 true 인것만 검사
    const testData = userDataSchema.value[key]
    if (testData.require && !testData.val) {
      // console.log('비어있다!!', testData)
      isValidData.isValid = false
      isValidData.message = '필수 항목이 입력되지 않았습니다.'
    }
    // console.log(key, userDataSchema.value[key])
  }

  if (!isValidData.isValid) {
    // alert
    alert(isValidData.message)
    return
  } else {
    // axios\
    // console.log('이름 입력 후')

    const request = axios({
      method: props.mode === 'create' ? 'post' : 'put',
      url: props.mode === 'create' ? '/api/users' : `/api/users/${id}`,
      data: {
        name: userDataSchema.value.name.val,
        age: userDataSchema.value.age.val,
        gender: userDataSchema.value.gender.val,
        email: userDataSchema.value.email.val,
        party: JSON.stringify(userDataSchema.value.party.val),
      }
    })
    request.then((response) => {
      if (response.status === 200) {
        // console.log('저장되었음')
        emit('goToList')
        // console.log(response)
        console.log('요청완료 파티는?', selectedListData.value)
      }
    }).catch((error) => {
      console.log('error ::>> ', error)
    })
  }
}

//수정하기
const onEdit = () => {
  console.log('edit')
  isReadOnly.value = false
}

//목록으로 가기
const goToList = () => {
  emit('goToList')
  console.log('cancel')
}

watch(() => (userData.value = { ...props.detailData }))
watch(() => {
  if (props.mode === 'create') {
    isReadOnly.value = false
  } else {
    isReadOnly.value = true
  }
})

// 파티원 추가
const addPartyHandler = () => {
  isModalOpen.value = !isModalOpen.value
}

const handleAddSelectedItems = (selectedList) => {
  if (selectedList.length) {
    isModalOpen.value = !isModalOpen.value
    userDataSchema.value.party.val = selectedList
  } else {
    alert('파티원을 선택해주세요.')
  }
}

const onCloseModal = () => {
  console.log('모달닫기')
  isModalOpen.value = !isModalOpen.value
}

const removeParty = (itemId) => {
  console.log('삭제')
  // console.log(userDataSchema.value.party.val)
  userDataSchema.value.party.val = userDataSchema.value.party.val.filter((item) => item.id !== itemId) // 아닌것을 담아냄
  // selectedListData.value = selectedListData.value.filter((item) => item.id !== itemId) // 아닌것을 담아냄
}
</script>
<style></style>
