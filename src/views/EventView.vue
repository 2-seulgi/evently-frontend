<template>
  <DataTable 
    v-model:expandedRows="expandedRows"
    :value="events" paginator 
    :rows="5" 
    :rowsPerPageOptions="[5, 10, 20, 50]"
     tableStyle="min-width: 60rem"
  >
    <!-- Row Expansion 아이콘 컬럼 -->
    <Column expander style="width: 3rem" />
    
    <!-- 이벤트 기본 정보 -->
    <Column header="유형" style="min-width:6rem">
      <template #body="{ data }">
        <Tag
          :icon="eventTypeMeta[data.eventType].icon"
          :value="eventTypeMeta[data.eventType].label"
          :severity="eventTypeMeta[data.eventType].severity"
          rounded
        />
      </template>
    </Column>
    <Column field="title" header="이벤트명" style="min-width:12rem" />
    <Column field="startDate" header="시작일" >  
      <template #body="{ data }">
        {{ formatDate(data.startDate) }}
      </template>
    </Column>
    <Column field="endDate" header="종료일">
      <template #body="{ data }">
        {{ formatDate(data.endDate) }}
      </template>
    </Column>
    <Column
      header="참여"
      style="min-width: 10rem; text-align: justify"
      headerStyle="text-align: justify"
      bodyStyle="text-align: justify"
    >
      <template #body="{ data }">
        <div class="flex justify-center">
        <Button
        v-if="eventTypeMeta[data.eventType].mode === 'click'"
          label="출석체크"
          icon="pi pi-sign-in"
          class="p-button-sm p-button-outlined p-button-success"
          :disabled="new Date(data.endDate) < new Date() || participatedEvents.includes(data.id)"
          @click="handleCheckIn(data.id)"
        />
        <RouterLink v-else :to="`/events/${data.id}`">
          <Button
            v-if="data.eventType !== 'CHECKIN'"
            label="참여"
            icon="pi pi-sign-in"
            class="p-button-sm p-button-text p-button-primary"
            :disabled="new Date(data.endDate) < new Date()" 
          />
        </RouterLink>
        </div>
      </template>
    </Column>

      <!-- 🔽 확장 영역 -->
      <template #expansion="{ data }">
      <div class="p-4 bg-gray-50 rounded">
        <p>{{ data.description }}</p>
      </div>
    </template>
  </DataTable>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth' // ✅ auth store import
import { useApi } from '@/utils/useApi' // useApi 가져오기
const authStore = useAuthStore()             // ✅ store 인스턴스 생성

const { request } = useApi()
const events = ref([])
const expandedRows = ref([])

// 날짜 포맷 함수 (하이픈으로 명확히)
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 0부터 시작하니까 +1
  const day = String(date.getDate()).padStart(2, '0');
  const formatted = `${year}-${month}-${day}`;
  return formatted;
}

const eventTypeMeta = {
  QUIZ:     { label: '퀴즈', icon: 'pi pi-question-circle', severity: 'info', mode: 'route' },
  SURVEY:   { label: '설문조사', icon: 'pi pi-comments', severity: 'success' , mode: 'route'},
  PROMOTION:{ label: '프로모션', icon: 'pi pi-bolt', severity: 'warning' , mode: 'route'},
  GIVEAWAY: { label: '이벤트 경품', icon: 'pi pi-gift', severity: 'danger', mode: 'route' },
  CHECKIN: { label: '출석체크', icon: 'pi pi-calendar', severity: 'contrast' , mode: 'click' },
  OTHER:    { label: '기타', icon: 'pi pi-ellipsis-h', severity: 'secondary', mode: 'route' }
}

onMounted(async () => {
  const res = await request('/events?page=1&size=10')
  const data = await res.json()
  events.value = data.content
  
} )

onMounted(async() =>{
  const token = localStorage.getItem('token')
  if (token) {
    const res = await request('/users/me/participations/checkin/today', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await res.json()
    participatedEvents.value = data.map(event => event.eventId) // 오늘 출석 이벤트 ID 리스트
  }
})

const participatedEvents = ref([]) // ✅ 오늘 출석한 이벤트 ID 리스트

const handleCheckIn = async (eventId) => {
  const token = localStorage.getItem('token')
  if (!token) {
    alert('로그인이 필요합니다. 로그인 페이지로 이동합니다.')
    window.location.href = '/login'
    return
  }

  try {
    const res = await request(`/events/${eventId}/participation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    console.log("res.status =", res.status)

    if (!res.ok) throw new Error('참여 실패')

    const result = await res.json()
    console.log("✅ result =", result)

    participatedEvents.value.push(eventId) // 버튼 비활성화를 위한 처리

    // ✅ 포인트 갱신: getPoint 호출!
    await authStore.getPoint()
    
    alert(`출석체크 완료! +${result.pointReward}P`)
  } catch (err) {
    console.error("❌ 참여 실패", err)
    alert('출석체크 실패')
  }
}

</script>

