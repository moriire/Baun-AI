<script setup>
import axiosInstance from '@/axios';
import { computed, onMounted, ref } from 'vue';
import HistoGram from "@/components/HistoGram.vue"
const result = ref([])
const graphData = computed(()=>{
  let dts =  result.value.map(x => x.score);
  let lbls =  result.value.map(x => x.subject);
  return  {
  labels: lbls,
  datasets:[{
      label: 'General Subject Performance',
      backgroundColor: ["#ffc107", "green", "grey", "black", "blue"],
      data: dts
    }]
  }
})
const getResult = async () => {
  try {
    const res = await axiosInstance.get("ai/quiz/")
    result.value = res.data
  } catch (error) {
    window.alert("somethllll")
  }
}

onMounted(() => getResult())
</script>
<template>
  <div class="container .mt-5 vh-100 my-4"> 
    <div class="row justify-content-center align-items-center h-100">
      <h2 class="text-light text-center">Dashboard Coming Soon</h2>
        
      <div class="col-md-6">
        <div class="table responsive">
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Subject</th>
                <th>Score</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(res, index) in result" :key="index">
                <td>
                  {{ index+1 }}
                </td>
                <td>
                  {{ res.subject }}
                </td>
                <td>
                  {{ res.score }}
                </td>
                <td>
                  {{ res.remarks }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-md-5 bg-light mx-2" style="height: 45vh">
          <HistoGram :data="graphData" />   
      </div>
    </div>
  </div>
</template>
<style>
.list-group-item.list-group-item-action.active{
  background-color: var(--bs-warning);
  border-color: var(--bs-warning)
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
  opacity: 0;
}
</style>
