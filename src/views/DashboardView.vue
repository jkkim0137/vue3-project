<template>
  <div class="dashboard-wrap bg-gray-100">
    <button @click="getData">get</button>
    <div class="flex flex-col gap-4">
      <div class="flex flex-row gap-4">
        <el-card class="flex justify-center box-card h-1000 w-full" style="height: 1200px">
          <DoughnutChart :chartData="makeupDataRef" />

          <div class="right">total : {{ uniqueBrandList.length }}</div>
        </el-card>
        <!-- <el-card class="flex justify-center box-card h-90 basis-1/3"
          ><LineChart :chartData="testData"
        /></el-card>
        <el-card class="flex justify-center box-card h-90 basis-1/2"
          ><BubbleChart :chartData="testData"
        /></el-card> -->
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watchEffect, onMounted } from 'vue'
import { DoughnutChart, LineChart, BubbleChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import axios from 'axios'
Chart.register(...registerables)

const dialogVisible = ref(false)

const donutChartData = ref([
  { label: '음식', value: 3000 },
  { label: '패션', value: 1500 },
  { label: '전자제품', value: 1200 },
  { label: '서적', value: 800 },
  { label: '운동', value: 600 },
  { label: '기타', value: 300 }
])

const makeupData = ref([])
const makeupBrandList = ref([])
const uniqueBrandList = ref([])

const makeupDataRef = ref({
  labels: [],
  datasets: [
    {
      data: [],
      backgroundColor: []
    }
  ]
})

const brandCount = new Map()

// onMounted(() => {
//   getData()
// })

const getData = () => {
  const request = axios({
    metthod: 'get',
    url: 'http://makeup-api.herokuapp.com/api/v1/products.json'
  })
  request.then((response) => {
    makeupData.value = response.data

    makeupData.value.forEach((item) => {
      makeupBrandList.value.push(item.brand)
      // console.log(item.brand)
      if (brandCount.has(item.brand)) {
        brandCount.set(item.brand, brandCount.get(item.brand) + 1)
      } else {
        // console.log('2')
        brandCount.set(item.brand, 1)
      }
    })

    console.log(Array.from(brandCount.values()))

    // console.log(makeupBrandList.value)

    uniqueBrandList.value = [...new Set(makeupBrandList.value)]
    console.log(Object.values(uniqueBrandList.value))

    //브랜드 이름의 중복된 갯수를 가져오고 싶다

    makeupDataRef.value = {
      labels: Object.values(uniqueBrandList.value),
      datasets: [
        {
          data: Array.from(brandCount.values()),
          backgroundColor: [
            '#77CEFF',
            '#0079AF',
            '#123E6B',
            '#97B0C4',
            '#A5C8ED',
            '#FF5733',
            '#FFC300',
            '#3EFF33',
            '#33FFE5',
            '#336BFF',
            '#FF3333',
            '#FF9933',
            '#FFFF33',
            '#33FF33',
            '#33FFFF',
            '#3333FF',
            '#9933FF',
            '#FF33FF',
            '#FF33A3',
            '#FF336B',
            '#FF8888',
            '#FFCC88',
            '#FFFF88',
            '#88FF88',
            '#88FFFF',
            '#8888FF',
            '#CC88FF',
            '#FF88FF',
            '#FF88CC',
            '#FF886B',
            '#77FF77',
            '#77FFCC',
            '#77FF33',
            '#33FF77',
            '#33FFCC',
            '#33CCFF',
            '#77CCFF',
            '#CC77FF',
            '#FF77FF',
            '#FF7799',
            '#77DD77',
            '#77DDCC',
            '#77DD33',
            '#33DD77',
            '#33DDCC',
            '#33CCDD',
            '#77CCDD',
            '#DD77DD',
            '#FF77DD',
            '#FF77AA',
            '#77AA77',
            '#77AACC',
            '#77AA33',
            '#33AA77',
            '#33AACC',
            '#33CCAA',
            '#77CCAA',
            '#AA77AA',
            '#FF77AA',
            '#FF7799'
          ]
        }
      ]
    }
  })
}
</script>

<style>
.dashboard-wrap {
  padding: 20px;
  height: calc(100vh - 60px);
}
#doughnut-chart {
  width: 100% !important;
  height: 100% !important;
}
</style>
