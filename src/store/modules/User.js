import image from '@/assets/logo.svg'
const User = {
  state: {
    user : {
      id: 0,
      login: null,
      //login: 'VeselayaDevka',
      cookie: null,
      initials: 'VD',
      ava: image,
    }
  },
  mutations: {
    SetUser (state, data) {
      state.user.id = data.id;
      state.user.login = data.login;
      state.user.cookie = data.cookie;
    },
    
  },
  actions: {
  },
  getters: {
    GetUser: function (state) {
      return state.user;
    }
  },
};

export default User;