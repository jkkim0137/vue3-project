<template>
  <div class="dashboard-wrap bg-gray-100">
    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-4">
        <el-card class="flex justify-center box-card h-90 basis-1/3"
          ><DoughnutChart :chartData="testData"
        /></el-card>
        <el-card class="flex justify-center box-card h-90 basis-1/3"
          ><LineChart :chartData="testData"
        /></el-card>
        <el-card class="flex justify-center box-card h-90 basis-1/2"
          ><BubbleChart :chartData="testData"
        /></el-card>
      </div>
      <!-- <div class="flex flex-row gap-4">
        <el-card class="flex justify-center box-card h-90 basis-1/3"
          ><DoughnutChart :chartData="testData"
        /></el-card>
        <el-card class="flex justify-center box-card h-90 basis-1/3"
          ><LineChart :chartData="testData"
        /></el-card>
        <el-card class="flex justify-center box-card h-90 basis-1/2"
          ><BubbleChart :chartData="testData"
        /></el-card>
      </div> -->
    </div>
  </div>
</template>
<script setup>
import { ref, watchEffect } from 'vue'
import { DoughnutChart, LineChart, BubbleChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const donutChartData = ref([
  { label: '음식', value: 3000 },
  { label: '패션', value: 1500 },
  { label: '전자제품', value: 1200 },
  { label: '서적', value: 800 },
  { label: '운동', value: 600 },
  { label: '기타', value: 300 }
])

const testData = {
  labels: donutChartData.value.map((item) => item.label),
  datasets: [
    {
      data: donutChartData.value.map((item) => item.value),
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED']
    }
  ]
}
</script>
<style>
.dashboard-wrap {
  padding: 20px;
  height: calc(100vh - 60px);
}
</style>
