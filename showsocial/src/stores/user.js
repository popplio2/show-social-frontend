import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    id: "",
    username: "",
    email: "",
    profilePic: "",
    searchInput: "", 
    myShows: [],
    posts: [],
    friendRequests: [
    ],
    friends: [],
  }),
  actions: {
    isFriend(username) {
      return this.friends.includes(username);
    },
    approveRequest(username) {
      this.addFriend(username);
      this.deleteRequest(username);
    },
    deleteRequest(username) {
      const request = this.friendRequests.findIndex(request => request.sender === username);
      this.friendRequests.splice(request, 1);
    },
    addFriend(username) {
      this.friends.push(username);
    },
    deleteFriend(username) { //havent tested
      const friend = this.userStore.friends.findIndex(friend => friend === username);
      this.friends.splice(friend, 1);
    },
    addToPosts(post) {
      this.posts.unshift(post);
    },
    sortByName() {
      this.myShows.sort((a, b) => a.show.name.localeCompare(b.show.name, 'en', {'sensitivity': 'base'}));
    },
    sortByFirst() {
      this.myShows.sort((a,b) => new Date(a.added_at) - new Date(b.added_at));
    },
    sortByLast() {
      this.myShows.sort((a,b) => new Date(b.added_at) - new Date(a.added_at));
    },
  }
})