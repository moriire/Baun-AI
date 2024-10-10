<template>
    <Bar :data="props.data" :options="options" v-if="data.labels.length"/>
  </template>
  
  <script setup>
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    BarElement,
    CategoryScale,
    LinearScale
  } from 'chart.js'
  import { Bar } from 'vue-chartjs'
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const props = defineProps({
    data:{
        type: Array,
        required: true
    }
})
const options = {
  responsive: true,
  maintainAspectRatio: false
}
  </script>
  