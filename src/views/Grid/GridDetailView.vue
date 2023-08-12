<template>
  {{ props.mode }}
  {{ props.detailData.name }}
  {{ props.detailData.age }}
  {{ props.detailData.gender }}
  {{ props.detailData.email }}
  <el-form :model="form" label-width="120px">
    <el-form-item label="이름">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="나이">
      <el-input v-model="form.age" />
    </el-form-item>
    <el-form-item label="성별">
      <el-select v-model="form.gender" placeholder="선택하세요">
        <el-option label="남" value="male" />
        <el-option label="여" value="female" />
      </el-select>
    </el-form-item>
    <el-form-item label="이메일">
      <el-input v-model="form.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button @click="goToList">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, defineProps, defineEmits } from 'vue'

const props = defineProps({
  mode: {
    type: String,
    default: () => 'list'
  },
  detailData: {
    type: Object,
    default: () => {}
  }
})

const emit = defineEmits('goToList')

const form = reactive({
  name: '',
  age: '',
  gender: '',
  email: ''
})

const onSubmit = () => {
  console.log('submit!')
}

const goToList = () => {
  emit('goToList')
  console.log('cancel')
}
</script>
<style></style>
