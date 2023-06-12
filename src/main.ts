import { createApp, markRaw } from 'vue'
import { AppRoot } from '@/app'
import { Router } from 'vue-router';
import { router, pinia } from '@/app/providers';
import '@/style.css'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    router: Router;
  }
}

pinia.use(({ store }) => {
  store.router = markRaw(router);
});

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)

createApp(AppRoot)
    .use(pinia)
    .use(router)
    .mount('#app')
