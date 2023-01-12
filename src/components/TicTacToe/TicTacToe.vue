<script lang="ts">
import CrossLine from "./components/CrossLine.vue";
import BoardButton from "./components/BoardButton.vue";
import WinnerOverlay from "./components/WinnerOverlay.vue";

import "./base.css";

import { Player, CrossLinePositions, Winner } from "./types";

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
    CrossLine,
    BoardButton,
    WinnerOverlay,
  },
  setup() {
    return {
      Player,
      Winner,
    };
  },
  data() {
    return {
      move: gameDefault.move,
      playerMove: gameDefault.playerMove,
      cells: [...gameDefault.cells] as Array<string | null>,
      winner: gameDefault.winner as string | null,
      crossLinePosition: CrossLinePositions.ROW1,
      opacity: 1,
    };
  },
  created() {
    window.addEventListener("keydown", this.onKeyDown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
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
      this.opacity = 0;
      setTimeout(() => {
        this.opacity = 1;
        this.playerMove = gameDefault.playerMove;
        this.cells = [...gameDefault.cells];
        this.move = gameDefault.move;
        this.winner = gameDefault.winner;
      }, 200);
    },
    determineWinner() {
      if (this.move < 4) return;

      for (const item of winningIndexes) {
        if (
          this.cells[item.indexes[0]] !== null &&
          this.cells[item.indexes[0]] === this.cells[item.indexes[1]] &&
          this.cells[item.indexes[0]] === this.cells[item.indexes[2]]
        ) {
          this.crossLinePosition = item.position;
          this.winner = this.playerMove;
          return;
        }
      }

      if (this.move === 8 && !this.winner) {
        this.winner = Winner.draw;
      }
    },
    onKeyDown(e: KeyboardEvent) {
      const controlKeyCodes = [
        "KeyQ",
        "KeyW",
        "KeyE",
        "KeyA",
        "KeyS",
        "KeyD",
        "KeyZ",
        "KeyX",
        "KeyC",
      ];
      const indexOfKey = controlKeyCodes.indexOf(e?.code);
      if (
        indexOfKey !== -1 &&
        this.cells[indexOfKey] === null &&
        !this.winner
      ) {
        this.makeMove(indexOfKey);
      }
    },
  },
};
</script>

<template>
  <div class="tic-tac-toe">
    <WinnerOverlay v-if="!!winner" :winner="winner" @onNext="resetGame()" />
    <CrossLine
      v-if="!!winner && winner !== Winner.draw"
      :position="crossLinePosition"
      :style="{ opacity }"
    />
    <BoardButton
      v-for="(cell, index) in cells"
      :key="index"
      :cell="cell"
      :playerMove="playerMove"
      :disabled="!!winner || cells[index] !== null"
      :style="{ opacity }"
      @makeMove="makeMove(index)"
    />
  </div>
</template>

<style scoped lang="scss">
.tic-tac-toe {
  box-sizing: content-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  overflow: hidden;

  width: 100%;
  height: 100%;
  max-width: calc(var(--grid-step) * 105);

  position: relative;
  border: 2px solid var(--color-board-border);
  border-radius: calc(var(--grid-step) * 5);
  background-color: var(--color-bg);

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
