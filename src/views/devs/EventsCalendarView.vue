<template>
  <v-container>
    <v-card>
      <v-card-title style="display: flex;justify-content: space-between;">
        Календарь событий
        <template v-if="u_items.length > 0">
          <v-btn 
            density="compact"  
            variant="plain" 
            icon="mdi-cog" 
            v-bind="props">
          </v-btn>
        </template>
      </v-card-title>
      <v-card-text>
        <p>
          Данная страница используется для записей приближающихся событий и дальнейшего напоминания о них. Сайт напомнит о событиях за две недели в блоке справа. 
        </p>
        <template v-if="u_items && u_items.length == 0">
          <p>
            Авторизуйтесь на сайте, если хотите получить возможность записи собственных событий, а также для добавления общественных событий<div class=""></div>
          </p>
          <br><br>
          <v-alert
            text="Общественные события, добавленные пользователями, проходят модерацию, прежде чем появятся на сайте. Модерация может проводиться до 2-х часов."
            title="Внимание!"
            type="info"
            variant="tonal"
          ></v-alert>
          <br><br>
        </template>
        {{ sortEvents /*Для вызова функции из computed */}}
        <template v-if="u_items && u_items.length > 0">
          <br><br>
          <v-card class="events u">
            <v-card-title style="display: flex;justify-content: space-between;">
              Пользовательские события
              <v-btn 
                density="compact" 
                variant="text" 
                icon="mdi-plus" 
                v-bind="props">
              </v-btn>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="u_items"
                item-key="name"
                items-per-page="5"
                class="event_table"
                style="font-size: 12px !important;"
              ></v-data-table>
            </v-card-text>
          </v-card>
          <br><br>
        </template>
        <template v-if="g_items && g_items.length > 0">
          <v-card class="events g">
            <v-card-title style="display: flex;justify-content: space-between;">
              Общественные события и праздники
              <template v-if="u_items.length > 0">
                <v-btn 
                  density="compact" 
                  variant="text" 
                  icon="mdi-plus" 
                  v-bind="props">
                </v-btn>
              </template>
            </v-card-title>
            <v-card-text>
              <v-data-table
                :headers="headers"
                :items="g_items"
                item-key="name"
                items-per-page="5"
                class="event_table"
                style="font-size: 12px !important;"
              ></v-data-table>
            </v-card-text>
          </v-card>
        </template>
      </v-card-text>
    </v-card>
  </v-container>
  
</template>
<script>
import { mapGetters, mapMutations, mapActions, storeKey } from 'vuex';
import Modal from '@/components/Modal.vue'
export default {
  name: 'App',
  components: {
    Modal,
  },
  data: () => ({
    headers: [
      {title: "ID", key: 'ID'},
      {title: "Название", key: 'Name'},
      {title: "Описание", key: 'Desc'},
      {title: "Тип события", key: 'ETypeName'},
      {title: "Дата начала", key: 'DateStart'},
      {title: "Дата окончания", key: 'DateEnd'},
      {title: "Повторение", key: 'Repeat'},
    ],
    g_items: [],
    u_items: [],
  }),
  computed: {
    ...mapGetters([
      'GetEvents',
    ]),
    sortEvents() {
      var e = this.GetEvents;
      const g = e.generalevents;
      const u = e.userevents;
      if(g && g.length) {
        this.g_items = this.ItemSet(g)
      }
      if(u && u.length) {
        this.u_items = this.ItemSet(u)
      }
      //console.log(this.u_items.length)
      //return e ?? [];
    }
  },
  methods:{
    ItemSet(arr) {
      var repeat, ret = [];
      for (var i = 0; i < arr.length; i++) {
        switch(arr[i].Repeat) {
          case 'yyyy': {
            repeat = 'Каждый год';
            break;
          };
          case null: {
            repeat = 'Без повторений';
            break;
          }
        }
        ret.push({
          ID: arr[i].ID,
          Name: arr[i].Name,
          Desc: arr[i].Desc,
          ETypeName: arr[i].ETypeName,
          DateStart: arr[i].DateStart,
          DateEnd: arr[i].DateEnd,
          Repeat: repeat,
        });
      }
      return ret;
    },
    ...mapMutations([
      //'SetEvents', 
    ]),
  },
  created(){

  }
}
</script>