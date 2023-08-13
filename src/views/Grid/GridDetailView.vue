<template>
  <br />
  <br />
  {{ mode }}
  <br />
  {{ userData.name }}
  {{ userData.age }}
  {{ userData.gender }}
  {{ userData.email }}
  <el-form :model="userData" label-width="120px">
    <el-form-item label="이름">
      <el-input v-model="userData.name" :disabled="isReadOnly" />
    </el-form-item>
    <el-form-item label="나이">
      <el-input v-model="userData.age" :disabled="isReadOnly" />
    </el-form-item>
    <el-form-item label="성별">
      <el-select v-model="userData.gender" placeholder="선택하세요" :disabled="isReadOnly">
        <el-option label="남" value="male" />
        <el-option label="여" value="female" />
      </el-select>
    </el-form-item>
    <el-form-item label="이메일">
      <el-input v-model="userData.email" :disabled="isReadOnly" />
    </el-form-item>
    <el-form-item>
      <el-button @click="goToList" v-if="isReadOnly">취소</el-button>
      <el-button type="primary" @click="onEdit" v-if="isReadOnly">수정</el-button>
      <el-button type="primary" @click="() => onSubmit(userData.id)" v-else>저장</el-button>
      {{ userData.id }}
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, computed, watch, defineProps, defineEmits } from 'vue'
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
const isReadOnly = ref(true)

// 생성
const onSubmit = (id) => {
  console.log(id)
  console.log('submit!')
  const request = axios({
    method: props.mode === 'create' ? 'post' : 'put',
    url: props.mode === 'create' ? '/api/users' : `/api/users/${id}`,
    data: {
      name: userData.value.name,
      age: userData.value.age,
      gender: userData.value.gender,
      email: userData.value.email
    }
  })
  console.log(props.mode)
  request.then((response) => {
    if (response.status === 200) {
      console.log('저장되었음')
      emit('goToList')
    }
  })
}
const onEdit = () => {
  console.log('edit')
  isReadOnly.value = false
}
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
