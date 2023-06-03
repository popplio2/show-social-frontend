import { defineStore } from 'pinia'

export const usePostStore = defineStore({
  id: 'posts',
  state: () => ({
    community: [],
    friends: [],
    postCounter: 0,
  }),
  actions: {
    incrementPostCount() {
      this.postCounter++;
    },
    addToFriends(post) {
      this.friends.push(post);
    },
    addToCommunity(post) {
      this.community.push(post);
    },
    addToBoth(post) {
      this.addToCommunity(post);
      this.addToFriends(post);
    }
  }
})