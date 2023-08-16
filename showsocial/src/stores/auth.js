import { defineStore } from 'pinia'
import { useUserStore } from './user'
import axios from 'axios';
import router from '../router/index'

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
    },
    async getAccess() {
      const accessData = {
        refresh: this.refresh
      }
      try {
        const response = await axios.post('http://127.0.0.1:8000/auth/jwt/refresh/', accessData);
        console.log(response);
        const access = response.data.access;
        localStorage.setItem('access', access);
        this.setAccess(access);
      } catch (error) {
        console.log(error);
        alert('Please log in to view this.');
        router.push('/');
      }
    },
    async getMe() {
      try {
        const response = await axios.get("http://127.0.0.1:8000/auth/users/me");
        console.log(response);
        useUserStore().id = response.data.id;
        useUserStore().username = response.data.username;
        useUserStore().myShows = response.data.user_shows;
        useUserStore().posts = response.data.user_posts;
        console.log(useUserStore().myShows)
      } catch(error) {
          console.log(error);
          alert('Please log in to view this.');
          router.push('/');
      }
    }
  }
})