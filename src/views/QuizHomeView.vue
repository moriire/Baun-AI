<script setup>
import axiosInstance from '@/axios';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const currentQuestionIndex = ref(0);
const selectedAnswer = ref(null);
const score = ref(0);
const quizFinished = ref(false);
const questions = ref([])
const router = useRouter()
const getQuestions = async () => {
  try {
    const res = await axiosInstance.post("ai/tutor/quiz/", {
      subject: "IOT",
      class: "JSS1"
    })
    questions.value = res.data
  } catch (error) {
    window.alert("somethllll")
  }
}

const submitQuiz = async () => {
  try {
    const res = await axiosInstance.post("ai/quiz/", {
      subject: "IOT",
      grade: "JSS1",
      user: 1,
      score: score.value
    })
    router.push("/quiz/dashboard")
  } catch (error) {
    window.alert("somethllll")
  }
}
const currentQuestion = computed(() => {
  return questions.value[currentQuestionIndex.value]
});

const selectAnswer = (index) => {
  selectedAnswer.value = index;
};
const nextQuestion = () => {
  if (selectedAnswer.value == currentQuestion.value.correct) {
    score.value++;
  }
  selectedAnswer.value = null;

  if (currentQuestionIndex.value < questions.value.length - 1) {
    currentQuestionIndex.value++;
  } else {
    quizFinished.value = true;
  }
};
const restartQuiz = () => {
  currentQuestionIndex.value = 0;
  selectedAnswer.value = null;
  score.value = 0;
  quizFinished.value = false;
}
onMounted(() => getQuestions())
</script>
<template>
  <div class="container .mt-5">
    <div class="row justify-content-center align-items-center h-100">
      <div class="col-md-8">
        <h2 class="text-light text-center">AI Quiz</h2>
        <div class="card shadow">
          <div class="card-header bg-warning text-center">
            <h3>
              Question - {{ currentQuestionIndex + 1 }}/{{ questions.length }}
            </h3>
          </div>
          <transition name="fade" mode="out-in">
            <div v-if="!quizFinished" key="question">
              <div class="card-body" v-if="currentQuestion">
                <!--h5>Question</h5-->
                <p>{{ currentQuestion.question }}</p>
                <ul class="list-group">
                  <li v-for="(answer, index) in currentQuestion.answers.split(',')" :key="index"
                    class="list-group-item list-group-item-action" :class="{ active: selectedAnswer === index }"
                    @click="selectAnswer(index)">
                    {{ answer }}
                  </li>
                </ul>
              </div>

              <div class="card-footer text-center">
                <button class="btn btn-warning mt-3" @click="nextQuestion" :disabled="selectedAnswer === null">
                  Next
                </button>
              </div>
            </div>

            <div v-else key="result">
              <div class="card-body text-center">
                <h4>Quiz Completed!</h4>
                <p>Your Score: {{ score }}/{{ questions.length }}</p>
               <div class="d-flex justify-content-center">
               
                  <button class="btn btn-secondary me-2" @click="restartQuiz">
                  Restart Quiz
                </button>
                <button class="btn btn-warning ms-2" @click="submitQuiz">
                  Submit Quiz
                </button>
                
               </div>
              </div>
            </div>
          </transition>
        </div>
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
