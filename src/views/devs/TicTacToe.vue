<template>
  <v-container>
    <v-card>
      <v-card-title style="display: flex;justify-content: space-between;">
        Крестики-нолики
      </v-card-title>
      <v-card-text>
        <template v-if="winner == null">
          <span>Ходит {{ player }}</span>
          <br><br>
        </template>
        <template v-else-if="winner == 0">
          <span>Игра окончена - ничья!</span>
          <br><br>
          <v-btn
            @click="newGame()"
            variant="tonal"
            color="primary"
          >Начать заново</v-btn>
          <br><br>
        </template>
        <template v-else>
          <span>Игрок {{ winner }} победил! Игра окончена</span>
          <br><br>
          <v-btn
            @click="newGame()"
            variant="tonal"
            color="primary"
          >Начать заново</v-btn>
          <br><br>
        </template>
        <table>
          <tr v-for="i in 3">
            <td v-for="j in 3">
              <v-btn
                @click="stepPlayer(i, j)"
                color="primary"
                :id="'button'+i+j"
              ><!--{{ i }}  {{ j }}--></v-btn>
            </td>
          </tr>
          
        </table>
      </v-card-text>
    </v-card>
  </v-container>
  
</template>
<script>
export default {
  name: 'App',
  data: () => ({
    winner: null,
    player: 'X',
    x: [],
    o: [],
    index: 0,
    win: [
      [{i: 1, j: 1}, {i: 1, j: 2}, {i: 1, j: 3}],// горизонталь
      [{i: 2, j: 1}, {i: 2, j: 2}, {i: 2, j: 3}],
      [{i: 3, j: 1}, {i: 3, j: 2}, {i: 3, j: 3}],

      
      [{i: 1, j: 1}, {i: 2, j: 1}, {i: 3, j: 1}],//вертикаль
      [{i: 1, j: 2}, {i: 2, j: 2}, {i: 3, j: 2}],
      [{i: 1, j: 3}, {i: 2, j: 3}, {i: 3, j: 3}],

      
      [{i: 1, j: 1}, {i: 2, j: 2}, {i: 3, j: 3}],//диагональ
      [{i: 1, j: 3}, {i: 2, j: 2}, {i: 3, j: 1}],
    ],
  }),
  methods: {
    newGame(){
      this.winner = null;
      this.player = 'X';
      this.x = [];
      this.o = [];
      for(var i = 1; i < 4; i++) {
        for(var j = 1; j < 4; j++) {
          var el = document.getElementById('button' + i + j);
          //console.log(('button' + i + j))
          el.innerHTML = "";
          el.disabled = false;
        }
      }
      //console.log(this.x, this.o)
    },
    stepPlayer(i, j){
      var el = document.getElementById('button' + i + j);
      el.innerHTML = this.player;
      el.disabled = true;
      if (this.player == 'X') {
        this.x.push({i: i, j: j})
      }else {
        this.o.push({i: i, j: j})
      }
      var winner = this.getWinner();
      if (winner == null) this.reversPlayer();
      this.index++;
    },
    getWinner() {
      const player = (this.player == 'X') ? this.x : this.o;
      for (const variant of this.win){
        var counter = 0;
        for (const el of variant) {
          for(const p of player){
            if(JSON.stringify(el) == JSON.stringify(p)) counter++;
          }
        }
        
        if(counter >= 3) this.winner = this.player;
      }
      if(this.x.length + this.o.length == 9) this.winner = 0;
    },
    reversPlayer() {
      this.player = (this.player == 'X') ? 'O' : 'X';
    }
  },
}
  

</script>