import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue';
import router from './router' // ✅ 라우터 추가!
import './assets/main.css' //  Tailwind 스타일을 불러옴!
import PrimeVue from 'primevue/config';
import DataTable from 'primevue/datatable';
import Aura from '@primeuix/themes/aura';
import Button from 'primevue/button'
import StyleClass from 'primevue/styleclass'
import 'primeicons/primeicons.css'



const app = createApp(App);
const pinia = createPinia(); // ✅ Pinia 추가!
app.use(pinia)
app.component('Button', Button)
app.directive('styleclass', StyleClass)
app.component('DataTable', DataTable)
app.use(PrimeVue, {
    // Default theme configuration
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            darkModeSelector: false || 'none',
            cssLayer: false
        }
    }
 })
.use(router) // ✅ 라우터 추가!
.mount('#app');