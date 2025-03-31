import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue';
import EventView from '@/views/EventView.vue';
import LoginView from '@/views/LoginView.vue';
import SignupView from '@/views/SignupView.vue';
import MyPageView from '@/views/MyPageView.vue';
import { useAuthStore } from '@/stores/auth';


const routes = [
    { path: '/', name: 'Home', component: HomeView },
    { path: '/events', name: 'Events', component: EventView },
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/signup', name: 'Signup', component: SignupView },
    { path: '/mypage', name: 'Mypage', component: MyPageView },

  ]

  const router = createRouter({
    history: createWebHistory(),
    routes,
  })

  router.beforeEach((to, from, next) => {
    const auth = useAuthStore()
    const isLoggedIn = !!auth.token
    // 보호된 라우트 목록 
    const protectedRouteNames = ['Mypage']
    // 로그인 안 했는데 보호 페이지 들어가려는 경우
    if (protectedRouteNames.includes(to.name) && !isLoggedIn) {
      alert('로그인이 필요합니다.')
      return next('/login')
    }

    next() // 통과
  })
  
  export default router