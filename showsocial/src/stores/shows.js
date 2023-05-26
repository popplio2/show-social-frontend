import { defineStore } from 'pinia'

export const useShowStore = defineStore({
  id: 'shows',
  state: () => ({
    searchInput: "",
    myShows: [],
    showCounter: 0,
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2
  },
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