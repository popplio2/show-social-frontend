import { defineStore } from 'pinia'

export const usePostStore = defineStore({
  id: 'posts',
  state: () => ({
    community: [
      {"author":"","showName":"Fukumen D","showID":65703,"showImage":"https://static.tvmaze.com/uploads/images/original_untouched/434/1086485.jpg","text":"meh i actually never watched this so i wouldnt know how it is but i guess i am excited to try watching it maybe actually no","datePosted":"2023-07-04","timePosted":"1:56","toCommunity":true,"toFriends":false},
      {"author":"","showName":"Initial D","showID":9740,"showImage":"https://static.tvmaze.com/uploads/images/original_untouched/459/1148933.jpg","text":"cool shit","datePosted":"2023-07-04","timePosted":"1:55","toCommunity":true,"toFriends":false}
    ],
    friends: [],
  }),
  actions: {
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