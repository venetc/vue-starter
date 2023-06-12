<script setup lang="ts">
import { QuizQuestion as QuizQuestionType, useQuizStore } from '../model'
import { QuizQuestion } from '../ui'
import { storeToRefs } from 'pinia';
import { NStep, NSteps, NButton } from 'naive-ui';

const quizStore = useQuizStore()
const { selectAnswer, resetGame } = quizStore
const { activeQuestion, activeQuestionIndex, questions, gameStatus } = storeToRefs(quizStore)

const formattedStepDescription = (question: QuizQuestionType) => {
  return `Рельный номер вопроса - ${question.text}. Правильный вариант ответа - ${question.correctAnswerId}.`
}

const renderGameStatus = (id: number): 'wait' | 'error' | 'finish' | 'process' => {

  if (id < activeQuestionIndex.value || gameStatus.value === 'completed') return 'finish'
  if (id === activeQuestionIndex.value && gameStatus.value === 'failed') return 'error'
  if (id === activeQuestionIndex.value) return 'process'
  return 'wait'
}

</script>

<template>
  <section>
    <QuizQuestion v-if="gameStatus === 'inProgress'"
                  :key="activeQuestion.id"
                  :question="activeQuestion"
                  :onAnswerClick="selectAnswer"
                  :questionIndex="activeQuestionIndex"
    />
    <div v-else-if="gameStatus === 'failed'"
         class="flex flex-col items-center justify-center min-h-[288px] text-red-600 font-medium text-2xl"
    >
      <span class="my-3">FAILED!</span>
      <NButton type="primary"
               @click="resetGame"
      >
        Replay
      </NButton>
    </div>
    <div v-else
         class="flex flex-col items-center justify-center min-h-[288px] text-green-600 font-medium text-2xl"
    >
      <span class="my-3">COMPLETED!</span>
      <NButton type="primary"
               @click="resetGame"
      >
        Replay
      </NButton>
    </div>
    <NSteps :current="activeQuestionIndex + 1"
            :status="'process'"
            class="my-5"
    >
      <NStep v-for="(question, index) in questions"
             :key="question.id"
             :title="`Вопрос № ${(index + 1).toString()}`"
             :description="formattedStepDescription(question)"
             :status="renderGameStatus(index)"
      />
    </NSteps>
  </section>
</template>
