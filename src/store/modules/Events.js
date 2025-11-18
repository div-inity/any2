const Events = {
  state: {
    events: {
      userevents: null,
      generalevents: null,
    },
  },
  mutations: {
    SetEvents (state, data) {
      state.events.userevents = data.userevents;
      state.events.generalevents = data.generalevents;
      ////console.log(state)
    },
    
  },
  actions: {
  },
  getters: {
    GetEvents: function (state) {
      return state.events;
    }
  },
};

export default Events;