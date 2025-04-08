import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

export function useApi() {
  const auth = useAuthStore()
  const router = useRouter()

  const request = async (url, options = {}) => {
    const token = auth.token

    const headers = {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    try {
      const res = await fetch(url, {
        ...options,
        headers,
      })

      // ✅ 만료된 토큰 처리
      if (res.status === 401) {
        alert('로그인이 만료되었습니다. 다시 로그인해주세요.')
        auth.logout()
        router.push('/login')
        throw new Error('토큰 만료')
      }

      return res
    } catch (err) {
      console.error('API 요청 중 오류 발생:', err)
      throw err
    }
  }

  return { request }
}
