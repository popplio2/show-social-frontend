import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    username: "",
    email: "",
    profilePic: "",
    searchInput: "",
    myShows: [],
    showCounter: 0,
    posts: [],
    friendRequests: [],
    friends: [],
  }),
  actions: {
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