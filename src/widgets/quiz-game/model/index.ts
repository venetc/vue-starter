import { chunkArray, shuffle } from '@/shared/lib/array';
import { randomInt } from '@/shared/lib/number.ts';
import { defineStore } from 'pinia';

export type QuizAnswer = {
  id: number,
  text: string
}

export type QuizQuestion = {
  id: number,
  text: string
  answers: QuizAnswer[],
  correctAnswerId: QuizAnswer['id'],
}


const _useQuizFactory = () => {
  const ANSWERS: QuizAnswer[][] = chunkArray([
    { id: 0, text: 'Ответ 0' },
    { id: 1, text: 'Ответ 1' },
    { id: 2, text: 'Ответ 2' },
    { id: 3, text: 'Ответ 3' },
    { id: 4, text: 'Ответ 4' },
    { id: 5, text: 'Ответ 5' },
    { id: 6, text: 'Ответ 6' },
    { id: 7, text: 'Ответ 7' },
    { id: 8, text: 'Ответ 8' },
    { id: 9, text: 'Ответ 9' },
    { id: 10, text: 'Ответ 10' },
    { id: 11, text: 'Ответ 11' },
    { id: 12, text: 'Ответ 12' },
    { id: 13, text: 'Ответ 13' },
    { id: 14, text: 'Ответ 14' },
    { id: 15, text: 'Ответ 15' },
    { id: 16, text: 'Ответ 16' },
    { id: 17, text: 'Ответ 17' },
    { id: 18, text: 'Ответ 18' },
    { id: 19, text: 'Ответ 19' }
  ], 4)
  const QUESTIONS: QuizQuestion[] = [
    {
      id: 0,
      text: 'Вопрос 0',
      answers: ANSWERS[0],
      correctAnswerId: ANSWERS[0][randomInt(0, 3)].id
    },
    {
      id: 1,
      text: 'Вопрос 1',
      answers: ANSWERS[1],
      correctAnswerId: ANSWERS[1][randomInt(0, 3)].id
    },
    {
      id: 2,
      text: 'Вопрос 2',
      answers: ANSWERS[2],
      correctAnswerId: ANSWERS[2][randomInt(0, 3)].id
    },
    {
      id: 3,
      text: 'Вопрос 3',
      answers: ANSWERS[3],
      correctAnswerId: ANSWERS[3][randomInt(0, 3)].id
    },
    {
      id: 4,
      text: 'Вопрос 4',
      answers: ANSWERS[4],
      correctAnswerId: ANSWERS[4][randomInt(0, 3)].id
    },
  ]

  return shuffle(QUESTIONS)
}

const questions = _useQuizFactory()

type GameStatus = 'inProgress' | 'failed' | 'completed'

type State = { questions: QuizQuestion[], activeQuestion: QuizQuestion, gameStatus: GameStatus }

export const useQuizStore = defineStore('quiz', {
  state: (): State => ({
    questions: questions,
    activeQuestion: questions[0],
    gameStatus: 'inProgress'
  }),
  getters: {
    activeQuestionIndex: state => {
      return questions.findIndex((question) => state.activeQuestion.id === question.id)
    }
  },
  actions: {
    resetGame() {
      this.$reset()
    },
    checkIsAnswerCorrect(answer: QuizAnswer) {
      return this.activeQuestion?.correctAnswerId === answer.id
    },
    setGameFailedStatus() {
      this.gameStatus = 'failed'
    },
    setGameCompleteStatus() {
      this.gameStatus = 'completed'
    },
    selectAnswer(answer: QuizAnswer) {
      const isCorrect = this.checkIsAnswerCorrect(answer)
      const nextId = this.activeQuestionIndex + 1
      const isLast = nextId >= this.questions.length

      isCorrect
          ? isLast
              ? this.setGameCompleteStatus()
              : this.activeQuestion = this.questions[this.activeQuestionIndex + 1]

          : this.setGameFailedStatus()
    }
  }
})

