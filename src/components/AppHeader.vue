<template>
<div class="flex items-center justify-between w-full px-4 lg:px-8 h-16 bg-white shadow">
  <!-- 로고 -->
  <a class="flex items-center" href="#">
    <span class="text-surface-900 dark:text-surface-0 font-medium text-2xl leading-normal mr-20">EVENTLY</span>
  </a>

  <!-- 네비게이션 메뉴 -->
  <div
    class="items-center bg-surface-0 dark:bg-surface-900 grow justify-between hidden lg:flex w-auto z-20 gap-6"
  >
    <ul class="flex gap-8 list-none p-0 m-0 items-center">
      <li><a class="text-surface-900 dark:text-surface-0 text-xl">Home</a></li>
      <li><a class="text-xl">Events</a></li>
    </ul>
    <div v-if="auth.isLoggedIn">
      <div class="flex gap-2 ml-4">
      <!-- 로그인 상태에 따라 버튼 변경 -->
        <Button label="마이페이지" text as="router-link" to="/mypage" rounded></Button>
        <Button label="로그아웃" @click="auth.logout(); router.push('/login')" rounded ></Button>
      </div>
    </div>
    <div v-else>
      <div class="flex gap-2 ml-4">
        <Button label="로그인" text as="router-link" to="/login" rounded></Button>
        <Button label="회원가입" to="/login" rounded></Button>
      </div>
    </div>
  </div>
</div>
</template>
  
<script setup>
  import { useAuthStore } from '@/stores/auth.ts'

const auth = useAuthStore()
  
</script>
  