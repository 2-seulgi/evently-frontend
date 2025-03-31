<template>
    <div class="flex items-center justify-center w-full h-[calc(100vh-8rem)] bg-surface-50 dark:bg-surface-950 overflow-hidden">
      <div class="flex flex-col items-center justify-center">
        <!-- 배경 둥글게 + 그라데이션 -->
        <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
          <!-- 안쪽 카드 스타일 -->
          <div class="w-full bg-surface-0 dark:bg-surface-900 py-10 px-6 sm:px-10" style="border-radius: 53px">
            <div class="text-center mb-8">
              <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">🎉 회원가입</div>
              <span class="text-muted-color font-medium">간단한 정보를 입력해주세요.</span>
            </div>
  
            <!-- 폼 영역 -->
            <!-- 📧 이메일 -->
            <div class="flex flex-col gap-2 mb-4">
                <label for="email" class="font-medium">이메일</label>
                <div class="flex items-center gap-2">
                <InputText id="email" v-model="email" placeholder="이메일" class="w-full md:w-[24rem]" />
                <Button label="중복확인" @click="checkEmail" outlined size="small" class="text-sm px-3 py-2" />
                </div>
            </div>

            <!-- 👤 이름 -->
            <div class="flex flex-col gap-2 mb-4">
                <label for="name" class="font-medium">이름</label>
                <InputText id="name" v-model="name" placeholder="이름" class="w-full md:w-[30rem]" />
            </div>

            <!-- 🔒 비밀번호 -->
            <div class="flex flex-col gap-2 mb-6">
                <label for="password" class="font-medium">비밀번호</label>
                <Password id="password" v-model="password" placeholder="비밀번호" class="w-full md:w-[30rem]" :toggleMask="true" fluid :feedback="false" />
            </div>

            <Button label="회원가입" class="w-full md:w-[30rem]" @click="signup" ></Button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const email = ref('')
  const name = ref('')
  const password = ref('')
  const emailDuplicateChecked = ref(false) // 중복 확인 여부

  const router = useRouter()

    const validateEmail = (value) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(value)
    }

    const validatePassword = (value) => {
        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{6,}$/
        return regex.test(value)
    }
  
    const checkEmail = async () => {
        if (!validateEmail(email.value)) {
            alert('올바른 이메일 형식을 입력해주세요.')
            return
        }

        const res = await fetch(`http://localhost:8080/auth/check-email?email=${email.value}`)
        const data = await res.json()

        if (data.duplicate) {
            alert('이미 사용 중인 이메일입니다.')
            emailDuplicateChecked.value = false
        } else {
            alert('사용 가능한 이메일입니다.')
            emailDuplicateChecked.value = true
        }

    }
  
    const signup = async () => {

        if (!email.value || !name.value || !password.value) {
            alert('모든 항목을 입력해주세요.')
            return
        }

        if (!validateEmail(email.value)) {
            alert('올바른 이메일 형식을 입력해주세요.')
            return
        }

        if (!emailDuplicateChecked.value) {
            alert('이메일 중복 확인을 해주세요.')
            return
        }

        if (!validatePassword(password.value)) {
            alert('비밀번호는 최소 6자 이상이며, 영문자, 숫자, 특수문자를 포함해야 합니다.')
            return
        }

        const res = await fetch('http://localhost:8080/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            userId: email.value.trim(), // 이메일을 userId로!
            userName: name.value.trim(),
            password: password.value
        })
    })
  
    if (res.ok) {
        alert('회원가입 성공! 이제 로그인 해보세요.')
        router.push('/login')
        } else {
        alert('회원가입 실패 😢')
        }
    }
  </script>
  