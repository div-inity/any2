<template>
  <v-app>
    <v-card color="header" style="border-bottom: 3px solid #4e9644;">
      <v-container style="padding-top: 0; padding-bottom: 0;">
        <v-toolbar
          color="header"
        >
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>


          <v-toolbar-title>ANY<span style="color: var(--primary)">.com</span></v-toolbar-title>

          
          <div class="header_links">
            <v-btn 
              variant="plain" 
              v-for="route in routes"  
              :to="route.path" 
              style="height: inherit;"
              >
              {{ route.name }}
            </v-btn>
          </div>

          <v-spacer></v-spacer>
          <v-btn
            variant="tonal"
            class="ma-1"
            color="primary"
            icon="mdi-cloud-upload"
            size="small"
          ></v-btn>
          <v-btn
            variant="tonal"
            class="ma-1"
            color="primary"
            icon="mdi-cloud-upload"
            size="small"
          ></v-btn>
          <v-btn
            variant="tonal"
            class="ma-1"
            color="primary"
            icon="mdi-cloud-upload"
            size="small"
          ></v-btn>
          
          <v-spacer></v-spacer>
          <template v-if="(profile && profile.id == 0) || !profile">
            <v-btn 
              icon
              @click="openModalAuth()"
              >
              <v-icon>mdi-export</v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-btn
              color="primary"
              variant="text"
              style="height: calc(var(--v-btn-height) + 15px);"
            >
              <v-avatar >
                <template v-if="!profile.ava">
                  <span 
                    class="text-h5" 
                    color="primary"
                    >
                    {{ profile.initials }}
                  </span>
                </template>
                <template v-else>
                  <v-img
                    alt="Avatar"
                    :src="profile.ava"
                  ></v-img>
                </template>
              </v-avatar>&nbsp;
              <span v-html="profile.login" style="text-transform: none;"></span>
            </v-btn>
          </template>
        </v-toolbar>
      </v-container>
    </v-card>

    
    <v-main class="main">
      
      <v-navigation-drawer
        v-model="drawer"
        temporary
      >
        <v-list>
          <v-list-item
            prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
            title="Sandra Adams"
            subtitle="sandra_a88@gmailcom"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-btn 
            v-for="r in routes"
            variant="plain" 
            :to="r.path" 
          >
            <v-list-item :prepend-icon="r.icon" :title="r.name">
            </v-list-item>
          </v-btn>
        </v-list>
      </v-navigation-drawer>
      <v-container>
        <v-row >
          <v-col cols="8">
            <v-card>
              <router-view/>
            </v-card>
          </v-col>
          <v-col class="sidebar" cols="4">
            <template v-if="profile && profile.id != 0">
              <v-card>
                <v-btn
                  color="primary"
                  variant="text"
                  style="height: calc(var(--v-btn-height) + 15px);"
                >
                  <v-avatar>
                    <template v-if="!profile.ava">
                      <span 
                        class="text-h5" 
                        color="primary"
                        >
                        {{ profile.initials }}
                      </span>
                    </template>
                    <template v-else>
                      <v-img
                        alt="Avatar"
                        :src="profile.ava"
                      ></v-img>
                    </template>
                  </v-avatar>&nbsp;
                  <span v-html="profile.login" style="text-transform: none;"></span>
                </v-btn>
              </v-card>
              <br>
            </template>
            <Sidebar/>
          </v-col>
        </v-row>
      </v-container>
      <Modal ref="modalReg">
        <template v-slot:title>Регистрация</template>
        <template v-slot:body>
          <v-form
            ref="form"
            v-model="$refs.modalReg.rules.valid"
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Логин*"
                  hint="Придумайте оригинальный логин"
                  maxlength="20"
                  :counter="20"
                  v-model="loginreg"
                  :rules="$refs.modalReg.rules.reg.loginRules"
                  :error-messages="errorLoginReg"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  hint="Введите Email"
                  v-model="$refs.modalReg.inputs.mail"
                  :rules="$refs.modalReg.rules.reg.mailRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="password"
                  label="Пароль*"
                  hint="Придумайте пароль"
                  v-model="$refs.modalReg.inputs.pass"
                  :rules="$refs.modalReg.rules.reg.passRules"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="password"
                  label="Пароль*"
                  hint="Повторите пароль"
                  v-model="$refs.modalReg.inputs.repass"
                  :rules="$refs.modalReg.rules.reg.repassRules"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </template>
      </Modal>
      <Modal ref="modalAuth">
        <template v-slot:title>Авторизация</template>
        <template v-slot:body>
          <v-form
            ref="form"
            v-model="$refs.modalAuth.rules.valid"
          >
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Логин*"
                  hint="Введите логин"
                  v-model="$refs.modalAuth.inputs.login"
                  :rules="[$refs.modalAuth.rules.auth.error ?? $refs.modalAuth.rules.required]"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  type="password"
                  hint="Введите пароль"
                  v-model="$refs.modalAuth.inputs.pass"
                  :rules="[$refs.modalAuth.rules.required]"
                  label="Пароль*"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-btn
                  color="primary"
                  variant="outlined"
                  @click="$refs.modalAuth.close();openModalReg()"
                >
                  Я не зарегистрирован
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </template>
      </Modal>
    </v-main>

  </v-app>
</template>

<script>
import background from '@/assets/back.jpg'
import { mapGetters, mapMutations, mapActions, storeKey } from 'vuex';
import Sidebar from '@/components/Blocks/Sidebar.vue'
import Modal from '@/components/Modal.vue'
import { mergeProps } from 'vue';
import { useLocale } from 'vuetify/lib/framework.mjs';
export default {
  name: 'App',
  components: {
    Modal,
    Sidebar,
  },
  data: () => ({
    drawer: null,
    profile: null,
    routes: [
      {
        path: '/',
        name: 'Главная',
        icon: 'mdi-folder',
      },
      {
        path: '/about',
        name: 'Еще что-то',
        icon: 'mdi-account-multiple',
      },
      {
        path: '/devs',
        name: 'Разработки',
        icon: 'mdi-star',
      },
    ],
    loginreg: null,
    timeout: null,
    tmp: null,
    errorLoginReg: null, // Для поля логина в регистрации
  }),
  watch: {
    loginreg(newVal, oldVal) {
      this.searchUserID(newVal)
    ////console.log(newVal);
    ////console.log(oldVal);
    },
  },
  mounted(){
  },
  methods:{
    async searchUserID(newVal) {
      const me = this;
      me.timeout && clearTimeout(me.timeout);
      me.timeout = setTimeout(async ()=>{
        //переместить в глобалс 
        var result = await this.queryUserID({Username: newVal});
        if (result && result.error){
            me.errorLoginReg = "Данный логин занят другим пользователем";
            ////console.log(result.error.message.ID)
            return;
        }
        me.errorLoginReg = null;
      }, 1000);
    },
    reset () {
      this.$refs.form.reset()
    },
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    async rulesErr (ref, text) {
      ref.error = text;
    },
    openModalAuth: function (login = null) {
      const me = this,
      ref = me.$refs.modalAuth;
      if (login) ref.inputs.login = login;
      ref.buttons = [
        {
          label: 'Авторизоваться',
          handler: async function() {
            var login = ref.inputs.login,
            pass = ref.inputs.pass;
            
            if (Object.keys(ref.inputs).length == 2){
              ////console.log("Отправлен запрос", {login: login,pass: pass})
              var result = await me.ajaxPost("http://ashatova.ru/api/user/login", {username: login, password: pass});
              // Если ошибка, отправляем ее к полю
              //console.log(result)
              if (result.error) await me.rulesErr(ref.rules.auth, "Неправильный логин или пароль");
              else {
                ref.close();
                var cookie = result.data;
                document.cookie = "user="+cookie+";path=/;max-age="+me.CookieLifetime+";samesite=lax";
                me.SetUser({login: login, cookie: cookie}); //Запись в store
                me.profile = me.GetUser;
                ////console.log(document.cookie)
                location.reload();
              }
            }
            
            if (login == '') await me.rulesErr(ref.rules.auth, null); // Подтираем ошибку
            me.validate()
            ////console.log(me)
          },
        },
        {
          label: 'Отмена',
          handler: function() {
            me.reset();
            ref.close()
          },
        }
      ]
      ref.modal.open = true;
      ////console.log(this.$refs)
    },
    openModalReg: function () {
      const me = this,
      ref = me.$refs.modalReg;
      ref.buttons = [
        {
          label: 'Зарегистрироваться',
          handler: async function() {
            var login = me.loginreg,
            pass = ref.inputs.pass,
            repass = ref.inputs.repass,
            mail = ref.inputs.mail;
            var error = 0;
            
            for (var i = 0; i < 9; i++) {
              if(ref.rules.reg.error[i] == true) error++
            }
            
            if (login != null && Object.keys(ref.inputs).length == 3 && error == 0 && me.errorLoginReg == null){
              var result = await me.ajaxPost("http://ashatova.ru/api/user/register", {username: login, password: pass, retrypass: repass, email: mail});
              //console.log(result)
              
              if (result) {
                if (!result.error) {
                  ref.close();
                  me.openModalAuth(login);
                }
              }
            }
            me.validate()
          },
        },
        {
          label: 'Отмена',
          handler: function() {
            me.reset();
            ref.close()
          },
        }
      ]
      ref.modal.open = true;
    },
    ...mapMutations([
      'SetUser',
    ]),
  },
  async created() {
    await this.setProfile();
    this.profile = this.GetUser;
    //console.log(this.profile);
    await this.searchEvents(this.GetUser.id); //Поиск ивентов, запись в стор через глобалс
  },
  computed: {
    ...mapGetters([
      'GetUser',
      'GetEvents'
    ]),
  },
}
</script>