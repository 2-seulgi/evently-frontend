<template>
    <div class="max-w-4xl mx-auto py-10 px-4">
      
  
      <!-- 🔹 사용자 정보 -->
      <div class="mb-8 p-6 rounded-lg shadow bg-white dark:bg-gray-800">
        <h3 class="text-xl font-semibold mb-4">내 정보</h3>
        <p><strong>이메일:</strong> {{ user.email }}</p>
        <p><strong>이름:</strong> {{ user.name }}</p>
        <p><strong>보유 포인트:</strong> <span class="text-primary">{{ auth.points }}P</span></p>
      </div>
  
      <!-- 🔹 카드 영역: 포인트 내역 / 이벤트 참여 내역 등 -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="포인트 내역" @click="goTo('point')">
          <template #content>
            최근 적립/사용 내역
          </template>
        </Card>
  
        <Card title="이벤트 참여 내역" @click="goTo('participation')">
          <template #content>
            내가 참여한 이벤트
          </template>
        </Card>
      </div>
    </div>
  </template>
  
<script setup>

import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { useApi } from '@/utils/useApi' // useApi 가져오기

const { request } = useApi()
const auth = useAuthStore()
const router = useRouter()

const user = {
  email: auth.userId,
  name: auth.userName,
}

const point = ref(0)

onMounted(() => {
  if (auth.token) {
    auth.getPoint()
  }
})

const goTo = (section) => {
  if (section === 'point') router.push('/mypage/points')
  else if (section === 'participation') router.push('/mypage/participation')
}

</script>
