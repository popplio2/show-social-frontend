import { defineStore } from 'pinia'

export const usePostStore = defineStore({
  id: 'posts',
  state: () => ({
    community: [
      {"showName":"D-Day","showImage":"https://static.tvmaze.com/uploads/images/original_untouched/19/48598.jpg","text":"I hated it","date":"2023-06-23","toCommunity":true,"toFriends":false},
      {"showName":"D-Day","showImage":"https://static.tvmaze.com/uploads/images/original_untouched/19/48598.jpg","text":"I hated it","date":"2023-06-23","toCommunity":true,"toFriends":false},
      {"showName":"D-Day","showImage":"https://static.tvmaze.com/uploads/images/original_untouched/19/48598.jpg","text":"I hated it","date":"2023-06-23","toCommunity":true,"toFriends":false},
      {"showName":"D-Day","showImage":"https://static.tvmaze.com/uploads/images/original_untouched/19/48598.jpg","text":"I hated it","date":"2023-06-23","toCommunity":true,"toFriends":false},
      {"showName":"D-Day","showImage":"https://static.tvmaze.com/uploads/images/original_untouched/19/48598.jpg","text":"I hated it","date":"2023-06-23","toCommunity":true,"toFriends":false},
      {"showName":"D-Day","showImage":"https://static.tvmaze.com/uploads/images/original_untouched/19/48598.jpg","text":"I hated it","date":"2023-06-23","toCommunity":true,"toFriends":false},
      {"showName":"D-Day","showImage":"https://static.tvmaze.com/uploads/images/original_untouched/19/48598.jpg","text":"I hated it","date":"2023-06-23","toCommunity":true,"toFriends":false},
      
    ],
    friends: [],
  }),
  actions: {
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