import { defineStore } from 'pinia'

export const usePostStore = defineStore({
  id: 'posts',
  state: () => ({
    community: [],
    friends: [],
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
  actions: {
    addToFriends(post) {
      this.friends.push(post);
    },
    addToCommunity(post) {
      this.friends.push(post);
    },
    addToBoth(post) {
      this.addToCommunity(post);
      this.addToFriends(post);
    }
  }
})