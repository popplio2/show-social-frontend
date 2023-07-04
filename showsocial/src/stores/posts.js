import { defineStore } from 'pinia'

export const usePostStore = defineStore({
  id: 'posts',
  state: () => ({
    community: [
      {"id":"7618be44-e02d-4f6e-bc02-7cffaff6fa9e","author":"","showName":"Fukumen D","showID":65703,"showImage":"https://static.tvmaze.com/uploads/images/original_untouched/434/1086485.jpg","text":"meh","datePosted":"2023-07-04","timePosted":"3:15","toCommunity":true,"toFriends":false},
      {"id":"b87c107b-0dbe-479b-abfd-edf7fcb29e91","author":"","showName":"Initial D","showID":9740,"showImage":"https://static.tvmaze.com/uploads/images/original_untouched/459/1148933.jpg","text":"loveeee","datePosted":"2023-07-04","timePosted":"3:15","toCommunity":true,"toFriends":false}],
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