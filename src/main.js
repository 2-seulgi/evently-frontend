import { createApp } from 'vue'
import App from './App.vue';
import './assets/main.css' //  Tailwind 스타일을 불러옴!
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';


const app = createApp(App);
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
.mount('#app');