import { defineStore } from 'pinia'

export const usePostStore = defineStore({
  id: 'posts',
  state: () => ({
    community: [
      {"id":"32e0a9ea-3531-4a7e-b254-5f7e8c089360","author":"Dan","showName":"Initial D","showID":9740,"showImage":"https://static.tvmaze.com/uploads/images/original_untouched/459/1148933.jpg","text":"d","datePosted":"[native Date Tue Jul 04 2023 05:02:45 GMT-0400 (Eastern Daylight Time)]","toCommunity":true,"toFriends":false}
    ],
    friends: [],
  }),
  actions: {
    // likePost(post) {
    //   post.likes++;
    // },
    addToFriends(post) {
      this.friends.unshift(post);
    },
    addToCommunity(post) {
      this.community.unshift(post);
    },
    addToBoth(post) {
      this.addToCommunity(post);
      this.addToFriends(post);
    }
  }
})