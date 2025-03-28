<template>
  <div class="flex flex-col min-h-screen overflow-hidden">
    <!-- 🔹 헤더 -->
    <AppHeader />

    <!-- 🔹 메인 컨텐츠 영역 (동적 라우팅) -->
    <!-- 라우트 경로가 /login이면 container 제거 -->
    <main :class="['flex-1 p-4', (route.path !== '/login' && route.path !== '/signup') ? 'container mx-auto' : '']">
      <router-view />
    </main>

    <!-- 🔹 푸터 -->
    <AppFooter />
  </div>
</template>


<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>