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
    <el-form-item>
      <div v-if="isReadOnly">
        <el-button @click="goToList">취소</el-button>
        <el-button type="primary" @click="onEdit">수정</el-button>
      </div>
      <div v-else>
        <el-button @click="goToList">취소</el-button>
        <el-button type="primary" @click="() => onSubmit(userData.id)">저장</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue'
// import { Field, Form, ErrorMessage, defineRule, configure } from 'vee-validate'
// import { required, email } from '@vee-validate/rules'
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
        email: ''
      }
    }
  }
})

const emit = defineEmits('goToList')

const userData = ref({
  name: '',
  age: '',
  gender: '',
  email: ''
})

const userDataSchema = ref({
  name: { val: '', require: true, type: String },
  age: { val: '', require: true, type: Number },
  gender: { val: '', require: true, type: String },
  email: { val: '', require: false, type: String }
})

const isReadOnly = ref(true)

// 생성
const onSubmit = (id) => {
  console.log('submit!')

  console.log(userDataSchema.value)
  let isValidData = {
    isValid: true,
    message: ''
  }
  for (let key in userDataSchema.value) {
    // 하나씩 검사를 하게 됨
    // require 가 true 인것만 검사
    const testData = userDataSchema.value[key]
    if (testData.require && !testData.val) {
      console.log('비어있다!!', testData)
      isValidData.isValid = false
      isValidData.message = '비어있다. 무엇이 ?? 바로! ' + key
    }
    // console.log(key, userDataSchema.value[key])
  }

  if (!isValidData.isValid) {
    // alert
    alert(isValidData.message)
    return
  } else {
    // axios\
    console.log('이름 입력 후')
    const request = axios({
      method: props.mode === 'create' ? 'post' : 'put',
      url: props.mode === 'create' ? '/api/users' : `/api/users/${id}`,
      data: {
        name: userDataSchema.value.name.val,
        age: userDataSchema.value.age.val,
        gender: userDataSchema.value.gender.val,
        email: userDataSchema.value.email.val
      }
    })
    request.then((response) => {
      if (response.status === 200) {
        console.log('저장되었음')
        emit('goToList')
      }
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
</script>
<style></style>
