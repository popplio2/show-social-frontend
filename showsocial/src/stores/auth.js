import { defineStore } from 'pinia'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    access: "",
    refresh: "",
  }),
  actions: {
    initializeStore() {
      if (localStorage.getItem("access")) {
        this.access = localStorage.getItem("access");
        this.refresh = localStorage.getItem("refresh");
      } else {
        this.access = "";
        this.refresh = "";
      }
    },
    setAccess(access) {
      this.access = access;
    },
    setRefresh(refresh) {
      this.refresh = refresh;
    }
  }
})