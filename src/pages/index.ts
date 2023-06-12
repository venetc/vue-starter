import { RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Главная страница',
    components: {
      default: () => import(/* webpackChunkName: "MainPage" */'./main'),
      Header: () => import(/* webpackChunkName: "Header" */'../widgets/header'),
      Footer: () => import(/* webpackChunkName: "Footer" */'../widgets/footer'),
    }
  },
  {
    path: '/not-so-main',
    name: 'Не очень главная страница',
    components: {
      default: () => import(/* webpackChunkName: "NotSoMainComponent" */'./not-so-main'),
      Header: () => import(/* webpackChunkName: "Header" */'../widgets/header'),
      Footer: () => import(/* webpackChunkName: "Footer" */'../widgets/footer'),
    }
  },
  {
    path: '/quiz',
    name: 'Квиз',
    components: {
      default: () => import(/* webpackChunkName: "QuizComponent" */'./quiz'),
      Header: () => import(/* webpackChunkName: "Header" */'../widgets/header'),
      Footer: () => import(/* webpackChunkName: "Footer" */'../widgets/footer'),
    }
  },
  {
    path: '/mru',
    name: 'MRU',
    components: {
      default: () => import(/* webpackChunkName: "MRUComponent" */'./mru'),
      Header: () => import(/* webpackChunkName: "Header" */'../widgets/header'),
      Footer: () => import(/* webpackChunkName: "Footer" */'../widgets/footer'),
    }
  },
];

export { default as AppRouting } from './AppRouting.vue'
