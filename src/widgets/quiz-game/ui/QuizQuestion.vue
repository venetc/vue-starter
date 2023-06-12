<script setup lang="ts">
import { QuizAnswer, QuizQuestion } from '../model';
import { toRefs } from 'vue';
import { NCard, NH1, NGrid, NGridItem } from 'naive-ui'

const props = defineProps<{
  question: QuizQuestion,
  onAnswerClick: (answer: QuizAnswer) => void,
  questionIndex: number
}>()

const { answers } = toRefs(props.question)
const { questionIndex } = toRefs(props)
</script>

<template>
  <NH1>Вопрос № {{ questionIndex + 1 }}</NH1>
  <NGrid :xGap="12"
         :yGap="8"
         :cols="2"
         class="my-14"
  >
    <NGridItem v-for="answer in answers"
               :key="answer.id"
    >
      <NCard :title="answer.text"
             class="cursor-pointer"
             @click="onAnswerClick(answer)"
      />
    </NGridItem>
  </NGrid>
</template>
