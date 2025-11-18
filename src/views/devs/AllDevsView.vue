<template>
  <!--EventsCalendarView v-if="$route.params.any == 'events_calendar'">events_calendar</EventsCalendarView>
  <span v-else>ANY {{ $route.params.any }}</span-->
  <v-card>
    <v-card v-for="link in links" link :to="link.path"  class="ma-4">
      <v-img
        class="align-end text-white"
        height="200"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
        cover
      >
      <v-card-title>
        {{ link.name }}
      </v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
      Number 10
    </v-card-subtitle>

    <v-card-text>
      <div>Whitehaven Beach</div>

      <div>Whitsunday Island, Whitsunday Islands</div>
    </v-card-text>

    <v-card-actions>
      <v-container>
        <v-row>
          <v-col cols="2">
            <v-icon
              color="#616161"
              icon="mdi-eye-outline"
              size="small"
            ></v-icon>
            <span class="counter_card_actions">33</span>
          </v-col>
          <v-col cols="2">
            <v-icon
              color="#616161"
              icon="mdi-thumb-up"
              size="small"
            ></v-icon>
            <span class="counter_card_actions">33</span>
          </v-col>
          <v-col cols="2">
            <v-icon
              color="#616161"
              icon="mdi-thumb-down"
              size="small"
            ></v-icon>
            <span class="counter_card_actions">33</span>
          </v-col>
        </v-row>
      </v-container>
      
    </v-card-actions>
  </v-card>
  </v-card>
</template>
<script>
import EventsCalendarView from '@/views/devs/EventsCalendarView.vue'
export default {
  data: () => ({
    links: [
      {
        name: 'Календарь событий',
        path: '/devs/events_calendar'
      },
      {
        name: 'Крестики-нолики',
        path: '/devs/tictactoe'
      },
    ]
    
  }),
  
  components: {
    EventsCalendarView,
  },
  methods() {
  },
  mounted() {
    ////console.log(this.links)
  },
}

</script>