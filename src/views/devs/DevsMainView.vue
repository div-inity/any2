<template>
  <EventsCalendarView v-if="$route.params.any == 'events_calendar'">events_calendar</EventsCalendarView>
  <TicTacToe v-else-if="$route.params.any == 'tictactoe'">TicTacToe</TicTacToe>
  <span v-else>ANNY {{ $route.params.any }}</span>
</template>
<script>
import EventsCalendarView from '@/views/devs/EventsCalendarView.vue'
import TicTacToe from '@/views/devs/TicTacToe.vue'
export default {
  data: () => ({
  }),
  
  components: {
    EventsCalendarView,
    TicTacToe,
  },
  methods() {
  }
}

</script>