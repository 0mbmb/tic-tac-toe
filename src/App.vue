<script lang="ts">
// import CrossLine from "./components/CrossLine.vue";
import CrossLineSVG from "./components/CrossLineSVG.vue";
import BoardButton from "./components/BoardButton.vue";

import { Player, CrossLinePositions } from "./types";

const winningIndexes = [
  { indexes: [0, 1, 2], position: CrossLinePositions.ROW1 },
  { indexes: [3, 4, 5], position: CrossLinePositions.ROW2 },
  { indexes: [6, 7, 8], position: CrossLinePositions.ROW3 },
  { indexes: [0, 3, 6], position: CrossLinePositions.COL1 },
  { indexes: [1, 4, 7], position: CrossLinePositions.COL2 },
  { indexes: [2, 5, 8], position: CrossLinePositions.COL3 },
  { indexes: [0, 4, 8], position: CrossLinePositions.DIAG1 },
  { indexes: [2, 4, 6], position: CrossLinePositions.DIAG2 },
];

const gameDefault = {
  move: 0,
  playerMove: Player.x,
  cells: [null, null, null, null, null, null, null, null, null],
  winner: null,
};

export default {
  components: {
    // CrossLine,
    CrossLineSVG,
    BoardButton,
  },
  setup() {
    return {
      Player,
    };
  },
  data() {
    return {
      move: gameDefault.move,
      playerMove: gameDefault.playerMove,
      cells: [...gameDefault.cells] as Array<string | null>,
      winner: gameDefault.winner as string | null,
      crossLinePosition: CrossLinePositions.ROW1,
    };
  },
  methods: {
    makeMove(index: number) {
      this.cells[index] = this.playerMove;
      this.determineWinner();
      if (!this.winner) {
        this.playerMove = this.playerMove === Player.x ? Player.o : Player.x;
        ++this.move;
      }
    },
    resetGame() {
      this.playerMove = gameDefault.playerMove;
      this.cells = [...gameDefault.cells];
      this.move = gameDefault.move;
      this.winner = gameDefault.winner;
    },
    determineWinner() {
      if (this.move < 4) return;

      winningIndexes.forEach((item) => {
        if (
          this.cells[item.indexes[0]] !== null &&
          this.cells[item.indexes[0]] === this.cells[item.indexes[1]] &&
          this.cells[item.indexes[0]] === this.cells[item.indexes[2]]
        ) {
          this.crossLinePosition = item.position;
          this.winner = this.playerMove;
          return;
        }
      });
    },
  },
};
</script>

<template>
  <header>
    <h1>Tic Tac Toe</h1>
  </header>

  <main>
    <div class="board">
      <!-- <CrossLine v-if="!!winner" :position="crossLinePosition" /> -->
      <!-- <CrossLine :position="'row-2'" /> -->
      <CrossLineSVG v-if="!!winner" :position="crossLinePosition" />
      <BoardButton
        v-for="(cell, index) in cells"
        :key="index"
        :cell="cell"
        :disabled="!!winner || cells[index] !== null"
        @makeMove="makeMove(index)"
      />
    </div>
    <button type="button" @click="resetGame()">Reset</button>
    <p v-if="winner">Winner: {{ winner }}</p>
  </main>
</template>

<style scoped lang="scss">
.board {
  box-sizing: content-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  overflow: hidden;

  max-width: calc(var(--grid-step) * 105);

  position: relative;
  background-color: var(--color-board-border);
  border: 2px solid var(--color-board-border);
  border-radius: calc(var(--grid-step) * 5);

  &::before,
  &::after {
    content: "";
    position: absolute;
    z-index: 1;
    pointer-events: none;

    border-color: var(--color-board-border);
    border-width: 2px;
  }

  &::before {
    width: 100%;
    height: calc(100% / 3);
    top: calc(100% / 3);

    border-top-style: solid;
    border-bottom-style: solid;
  }

  &::after {
    height: 100%;
    width: calc(100% / 3);
    left: calc(100% / 3);

    border-left-style: solid;
    border-right-style: solid;
  }
}
</style>
