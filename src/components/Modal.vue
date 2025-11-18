<template>
<v-row justify="center" v-if="modal.open">
  <v-dialog
    v-model="dialog"
    persistent
    width="450"
    attach="body"
  >
    <v-card class="px-6 py-6">
      <v-card-title>
        <span class="text-h5">
          <slot name="title">Без заголовка</slot>
        </span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <slot name="body">
              Ничего не указано
            </slot>
          </v-row>
        </v-container>
        <small>* Поля, обязательные к заполнению</small>
      </v-card-text>
      <v-card-actions v-if="buttons">
        <v-spacer></v-spacer>
        <v-btn
          v-for="btn, key in buttons" :key="key"
          :class="btn.class"
          :color="btn.color ?? btncolordefault"
          variant="text"
          @click="btn.handler()"
        >
          {{ btn.label }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</v-row>
</template>
<script>
import { mapGetters, mapMutations, mapActions, storeKey } from 'vuex';

export default {
  name: 'Modal',
  data: function(){
    return {
      dialog: true,
      modal: {
        open: false,
      },
      buttons: [],
      inputs: [],
      rules: {
        valid: true,
        required: value => !!value || 'Поле обязательно к заполнению',
        auth: {
          error: null,
        },
        reg: {
          loginRules: [
            v => {
              return (!v) ? 
              this.rulesError(0, true, 'Поле обязательно к заполнению') : 
              this.rulesError(0, false, true)
            },
            v => {
              return (v && v.length > 20) ?
              this.rulesError(1, true, 'Логин не может быть короче 2 или длиннее 20 символов. Если Ваш логин длиннее, то он будет обрезан до необходимого размера. Подумайте хорошенько.') :
              this.rulesError(1, false, true)
            },
            v => {
              return (/^[a-zA-Z]+([a-zA-Z0-9])+$/.test(v) || /^[а-яА-Я]+[а-яА-Я0-9]+$/.test(v)) ?
              this.rulesError(2, false, true) :
              this.rulesError(2, true, 'Логин может включать в себя буквы русского или латинского алфавита и цифры')
            },
          ],
          mailRules: [
            v => {
              return (!v) ? 
              this.rulesError(3, true, 'Поле обязательно к заполнению') : 
              this.rulesError(3, false, true)
            },
            v => {
              return (/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/.test(v)) ?
              this.rulesError(4, false, true) :
              this.rulesError(4, true, 'Введен неверный email')
            }
          ],
          passRules: [
            v => {
              return (!v) ? 
              this.rulesError(5, true, 'Поле обязательно к заполнению') : 
              this.rulesError(5, false, true)
            },
            v => {
              return (v && v.length < 6) ?
              this.rulesError(6, true, 'Слишком простой пароль') :
              this.rulesError(6, false, true)
            },
          ],
          repassRules: [
            v => {
              return (!v) ? 
              this.rulesError(7, true, 'Поле обязательно к заполнению') : 
              this.rulesError(7, false, true)
            },
            v => {
              return (v != this.inputs.pass) ?
              this.rulesError(8, true, 'Пароли должны быть одинаковы') :
              this.rulesError(8, false, true)
            },
          ],
          error: {
          },
        },    
      },
    }
  },
  methods: {
    close: function () {
      this.modal.open = false;
      this.inputs = [];
    },
    rulesError(i, bl, t){ //index, bool, text
      this.rules.reg.error[i] = bl;
      return t;
    },
  },
  mounted(){
  },
}
</script>