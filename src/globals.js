import axios from "axios";
import { mapGetters, mapMutations, mapActions, storeKey } from 'vuex';

export default {
  data(){
    return {
      testPath: '123123123',
      CookieLifetime: 10000, // Время жизни куки
      btncolordefault: 'primary',
      rootpath: 'http://localhost:8081',
      //events: null,
    }
  },
  methods: {
    ...mapMutations([
      'SetEvents', //
    ]),
    async searchEvents(uid){ // Прописываем в стор ивенты
      var e = {};
      var result = await this.ajaxPost("http://ashatova.ru/api/events/getevents", {uid: uid});
      if (result && result.error){ // при ошибке
        //console.log(result)
        return;
      }
      else if (result) {
        if (result.data.userevents) e.userevents = result.data.userevents;
        else e.userevents = null;
        e.generalevents = result.data.generalevents;
        this.SetEvents(e)
        ////console.log('1', result)
        ////console.log('1', e)
        //return result;
      }
    },
    queryUserID(params){
      return this.ajaxPost("http://ashatova.ru/api/user/searchlogin", params);
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    modalErrors (ref, error) {
      for (var i = 0; i < ref.errors.reg.length; i++) { // Функция для ошибок от сервера и фронта
        if (error == ref.errors.reg[i].code) { // Поиск ошибки по ее коду 
          ref.error = ref.errors.reg[i].message;
        }
      }
    },
    checkCookie(cookieName) { // Проверить куки по названию куки
      var name = cookieName + "=";
      var decodedCookie = decodeURIComponent(document.cookie);
      var ca = decodedCookie.split(';');
      for(var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') {
              c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
              return c.substring(name.length, c.length);
          }
      }
      return "";
    },
    setProfile: async function () {
      /*
      Проверить наличие куки
        Если есть - сверить куки по бд, подгрузить профиль юзера, вписать в store
      */
      var userCookie = this.checkCookie('user');
      if (userCookie) {
        var result = await this.ajaxPost("http://ashatova.ru/api/user/get-user", {session: userCookie});
        //console.log(result)
        if (result.data) {
          const user = {id: result.data.ID, login: result.data.Username, cookie: result.data.Session};
          this.SetUser(user);
          return user;
        }
      }
      else console.log('Нет куки') 
    },
    testRegex (regex, string) { 
      return regex.test(string);
    },
    ajaxGet: async function(url, params = {}){
      var result = null;
      await axios.get(`${url}`, { withCredentials: true })
      .then(function(response){
        result = response.data;
        ////console.log(result);
      }.bind(this))
      .catch(function(error){
        console.error('[GET]: ' + error);
      });
      return result;
    },
    async ajaxPost (url, params = {}) { // пример урла "http://ashatova.ru/api/user/login"
      var result;
      var json = params;
      ////console.log(json)
      await new Promise(async (res,rej) => {
        await axios.post(
          url,
          json,
          { 
            withCredentials: true
          }
        )
        .then(function(response){
          res(response.data);
          ////console.log(result);
        }.bind(this))
        .catch(function(error){
          console.error('[POST]: ' + error);
        });
      }).then((val)=>{
        result = val;
      });
      //console.log('test', result);
      return result;
    },
    random (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    sort (arr) { // Сортировка json по полю id
      arr.sort(function(a, b) { 
        if (a.id < b.id) {
          return -1;
        }
      });
    },
  }
}
