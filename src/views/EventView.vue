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
        <RouterLink :to="`/event/${data.id}`">
          <Button
            label="참여"
            icon="pi pi-sign-in"
            class="p-button-sm p-button-text p-button-primary"
            :disabled="new Date(data.endDate) < new Date()" 
          />
        </RouterLink>
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
  QUIZ:     { label: '퀴즈', icon: 'pi pi-question-circle', severity: 'info' },
  SURVEY:   { label: '설문조사', icon: 'pi pi-comments', severity: 'success' },
  PROMOTION:{ label: '프로모션', icon: 'pi pi-bolt', severity: 'warning' },
  GIVEAWAY: { label: '이벤트 경품', icon: 'pi pi-gift', severity: 'danger' },
  OTHER:    { label: '기타', icon: 'pi pi-ellipsis-h', severity: 'secondary' }
}

onMounted(async () => {
  const res = await fetch('http://localhost:8080/events?page=1&size=10')
  const data = await res.json()
  events.value = data.content
})
</script>

