<script lang="ts">
import CrossLine from "./components/CrossLine.vue";
import BoardButton from "./components/BoardButton.vue";
import WinnerOverlay from "./components/WinnerOverlay.vue";
import TicTacToe from "./core";
import VSwitcher from "./components/VSwitcher.vue";
import VRadio from "./components/VRadio.vue";

import { toFirstLetterUpperCase } from "./utils/utils";

import "./base.css";

import { Winner, Difficulty, Player } from "./types";

const AI_MOVE_DELAY_MS = 200;

export default {
  components: {
    CrossLine,
    BoardButton,
    WinnerOverlay,
    VSwitcher,
    VRadio,
  },
  setup() {
    return {
      Winner,
      Difficulty,
      Player,
    };
  },
  data() {
    return {
      game: new TicTacToe({
        isSecondPlayerAI: true,
        difficulty: Difficulty.HARD,
        AIMoveDelay: AI_MOVE_DELAY_MS,
      }),
      opacity: 1,
      isSecondPlayerAI: true,
      difficulty: Difficulty.HARD,
      AIMoveDelay: AI_MOVE_DELAY_MS,
    };
  },
  watch: {
    isSecondPlayerAI(newVal: boolean) {
      this.onFadeout(() => {
        this.game = new TicTacToe({
          isSecondPlayerAI: newVal,
          difficulty: this.difficulty,
          AIMoveDelay: AI_MOVE_DELAY_MS,
        });
      });
    },
    difficulty(newVal: Difficulty) {
      this.onFadeout(() => {
        this.game = new TicTacToe({
          isSecondPlayerAI: this.isSecondPlayerAI,
          difficulty: newVal,
          AIMoveDelay: AI_MOVE_DELAY_MS,
        });
      });
    },
  },
  methods: {
    onNext() {
      this.onFadeout(() => {
        this.game.resetGame();
      });
    },
    onKeyDown(e: KeyboardEvent) {
      this.game.onKeyDown(e);
    },
    toFirstLetterUpperCase,
    onFadeout(cb?: () => void) {
      this.opacity = 0;
      setTimeout(() => {
        this.opacity = 1;
        if (cb) cb();
      }, 200);
    },
  },
  computed: {
    difficultyHeight() {
      const difficultyRef = this.$refs.difficulty as HTMLDivElement;
      return this.isSecondPlayerAI
        ? `${difficultyRef?.scrollHeight}px` || "0px"
        : "0px";
    },
    nextText() {
      if (this.isSecondPlayerAI) {
        return this.game.move.player === Player.ONE
          ? `Player (${this.game.move.mark.toUpperCase()})`
          : `Computer (${this.game.move.mark.toUpperCase()})`;
      }
      return this.game.move.player === Player.ONE
        ? `Player 1 (${this.game.move.mark.toUpperCase()})`
        : `Player 2 (${this.game.move.mark.toUpperCase()})`;
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
    <div class="tic-tac-toe__board board">
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
        :mark="game.move.mark"
        :firstPlayer="game.firstPlayer"
        :disabled="game.isAIMove || !!game.winner || game.cells[index] !== null"
        :style="{ opacity }"
        :isAIMove="game.isAIMove"
        @makeMove="game.makeMove(index)"
      />
    </div>
    <div class="tic-tac-toe__settings settings">
      <div class="settings__section">
        <h3 class="settings__heading">Next:</h3>
        <p
          :style="{
            color: `var(--color-${game.move.player})`,
            opacity: !game.winner ? opacity : 0,
          }"
        >
          {{ nextText }}
        </p>
      </div>
      <div class="settings__section">
        <h3 class="settings__heading">Play with:</h3>
        <VSwitcher v-model="isSecondPlayerAI">
          <template #buttonLeft>Human</template>
          <template #buttonRight>AI</template>
        </VSwitcher>
      </div>
      <div
        class="settings__section"
        ref="difficulty"
        :style="{
          height: difficultyHeight,
        }"
      >
        <h3 class="settings__heading">Difficulty:</h3>
        <div v-for="diff in Difficulty" :key="diff">
          <VRadio
            :id="diff"
            :value="diff"
            :label="toFirstLetterUpperCase(diff)"
            name="difficulty"
            v-model="difficulty"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.tic-tac-toe {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
  }
}

.board {
  flex-grow: 1;
  width: 100%;

  box-sizing: content-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  overflow: hidden;

  max-width: calc(var(--grid-step) * 105);

  position: relative;
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
.tic-tac-toe__settings {
  justify-self: start;
  margin-top: calc(var(--grid-step) * 5);
  flex-grow: 1;
  max-width: calc(var(--grid-step) * 105 + 4px);
  width: 100%;

  @media (min-width: 768px) {
    max-width: calc(var(--grid-step) * 50);
    margin-top: 0;
    margin-left: calc(var(--grid-step) * 5);
  }
}

.settings {
  border-radius: calc(var(--grid-step) * 5);
  background-color: var(--color-bg);
  padding: calc(var(--grid-step) * 5);

  &__section {
    overflow: hidden;
    transition: height 100ms linear;

    &:not(:last-child) {
      margin-bottom: calc(var(--grid-step) * 5);
    }
  }

  &__heading {
    margin-bottom: calc(var(--grid-step) * 2);
  }
}
</style>
