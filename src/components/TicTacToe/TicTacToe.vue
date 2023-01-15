<script lang="ts">
import CrossLine from "./components/CrossLine.vue";
import BoardButton from "./components/BoardButton.vue";
import WinnerOverlay from "./components/WinnerOverlay.vue";
import TicTacToe from "./core";

import "./base.css";

import { Winner } from "./types";

export default {
  components: {
    CrossLine,
    BoardButton,
    WinnerOverlay,
  },
  setup() {
    return {
      Winner,
    };
  },
  data() {
    return {
      game: new TicTacToe(),
      opacity: 1,
    };
  },
  methods: {
    onNext() {
      this.opacity = 0;
      setTimeout(() => {
        this.opacity = 1;
        this.game.resetGame();
      }, 200);
    },
    onKeyDown(e: KeyboardEvent) {
      this.game.onKeyDown(e);
    },
  },
  created() {
    window.addEventListener("keydown", this.onKeyDown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
  },
};
</script>

<template>
  <div class="tic-tac-toe">
    <WinnerOverlay
      v-if="!!game.winner"
      :winner="game.winner"
      @onNext="onNext()"
    />
    <CrossLine
      v-if="!!game.winner && game.winner.player !== Winner.DRAW"
      :position="game.crossLinePosition"
      :style="{ opacity }"
    />
    <BoardButton
      v-for="(cell, index) in game.cells"
      :key="index"
      :cell="cell"
      :mark="game.mark"
      :firstPlayer="game.firstPlayer"
      :disabled="!!game.winner || game.cells[index] !== null"
      :style="{ opacity }"
      @makeMove="game.makeMove(index)"
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
