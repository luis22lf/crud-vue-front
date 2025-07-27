import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    logado: false,
  }),
  actions: {
    login() {
      this.logado = true
    },
    logout() {
      this.logado = false
    },
  },
})