import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import EventView from '@/views/EventView.vue';
import LoginView from '@/views/LoginView.vue';
import SignupView from '@/views/SignupView.vue';



const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/events', name: 'Events', component: EventView },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/signup', name: 'Signup', component: SignupView },
  ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })
  
  export default router