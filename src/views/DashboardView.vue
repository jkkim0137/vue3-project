<template>
  <div class="dashboard-wrap bg-gray-100">
    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-4">
        <el-card class="box-card h-80 basis-1/3"> <DoughnutChart :chartData="testData" /></el-card>
        <el-card class="box-card h-80 basis-1/3"> </el-card>
        <el-card class="box-card h-80 basis-1/2"> </el-card>
      </div>
      <div class="flex flex-row gap-4">
        <el-card class="box-card h-80 basis-1/3"> </el-card>
        <el-card class="box-card h-80 basis-1/3"> </el-card>
        <el-card class="box-card h-80 basis-1/2"> </el-card>
      </div>
    </div>
  </div>
</template>
<script setup>
import { DoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const testData = {
  labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
  datasets: [
    {
      data: [30, 40, 60, 70, 5],
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
