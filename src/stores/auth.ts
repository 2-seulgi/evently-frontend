// src/stores/auth.js

import { defineStore } from 'pinia'
// import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role'),
    userId: localStorage.getItem('userId'),      // 추가
    userName: localStorage.getItem('userName'),   // 추가
    userSn: localStorage.getItem('userSn'),
    point : 0
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    login(token, role, userId, userName, userSn) {
      this.token = token
      this.role = role
      this.userId = userId
      this.userName = userName  
      this.userSn = userSn

      localStorage.setItem('token', token)
      localStorage.setItem('role', role)
      localStorage.setItem('userId', userId)
      localStorage.setItem('userName', userName)
      localStorage.setItem('userSn', userSn)

    },
    async getPoint() {
      if (!this.token) return;
      const response = await fetch('http://localhost:8080/api/users/points', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
      })
      if (response.ok) {
        const data = await response.json()
        this.points = data.point   
      }     
    },
    logout() {
      this.token = null
      this.role = null
      this.userId = null
      this.userName = null
      this.userSn = null
      this.point = 0 // 초기화

      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('userId')
      localStorage.removeItem('userName')
      localStorage.removeItem('userSn')

    }
  }
})

