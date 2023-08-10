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
    showCounter: 0, 
    posts: [],
    friendRequests: [
      // {
      //   sender: 'Dan202',
      //   receiver: 'Dan'
      // }
    ],
    friends: [],
  }),
  // getters: {
  //   isFriend: (state, username) => state.friends.includes(username),
  // },
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
    addShow(show) {
      this.myShows.push(show);
      this.showCounter++;
      show.count = this.showCounter; //allows us to keep track of order in which shows were added
      console.log(this.myShows);
      console.log(this.showCounter);
      alert(`${show.name} added to your shows!`);
    },
    sortByName() {
      this.myShows.sort((a, b) => a.name.localeCompare(b.name, 'en', {'sensitivity': 'base'}));
    },
    sortByFirst() {
      this.myShows.sort((a,b) => a.count - b.count);
    },
    sortByLast() {
      this.myShows.sort((a,b) => b.count - a.count);
    },
  }
})