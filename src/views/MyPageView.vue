<template>
    <div class="text-xl font-semibold mb-4">
        현재 보유 포인트: <span class="text-primary">{{ point }}P</span>
    </div>
</template>
<script setup>

import { ref, onMounted } from 'vue'

const point = ref(0)

onMounted(async () => {
  const token = localStorage.getItem('token')
  if (!token) return

  const res = await fetch('http://localhost:8080/api/users/points', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  point.value = await res.json()
})
</script>
