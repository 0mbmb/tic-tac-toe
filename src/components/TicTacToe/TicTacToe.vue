<script lang="ts">
import CrossLine from "./components/CrossLine.vue";
import BoardButton from "./components/BoardButton.vue";
import WinnerOverlay from "./components/WinnerOverlay.vue";
import VOverlay from "./components/VOverlay.vue";
import VButton from "./components/VButton.vue";
import TicTacToe from "./core";
import VSwitcher from "./components/VSwitcher.vue";
import VRadio from "./components/VRadio.vue";
import IconX from "./icons/IconX.vue";
import IconO from "./icons/IconO.vue";

import { toFirstLetterUpperCase } from "./utils/utils";

import "./base.css";

import { Winner, Difficulty, Player } from "./types";

const AI_MOVE_DELAY_MS = 200;
const AI_INIT_MOVE_DELAY_MS = 500;

export default {
  components: {
    CrossLine,
    BoardButton,
    WinnerOverlay,
    VSwitcher,
    VRadio,
    VOverlay,
    VButton,
    IconX,
    IconO,
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
        isSecondPlayerAI: false,
        difficulty: Difficulty.HARD,
        AIMoveDelay: AI_MOVE_DELAY_MS,
      }),
      opacity: 1,
      isSecondPlayerAI: true,
      difficulty: Difficulty.HARD,
      AIMoveDelay: AI_MOVE_DELAY_MS,
      isInitialized: false,
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
        this.game.startGame();
      });
    },
    difficulty(newVal: Difficulty) {
      this.onFadeout(() => {
        this.game = new TicTacToe({
          isSecondPlayerAI: this.isSecondPlayerAI,
          difficulty: newVal,
          AIMoveDelay: AI_MOVE_DELAY_MS,
        });
        this.game.startGame();
      });
    },
  },
  methods: {
    onInit(isSecondPlayerAI: boolean) {
      this.isSecondPlayerAI = isSecondPlayerAI;
      this.game = new TicTacToe({
        isSecondPlayerAI: this.isSecondPlayerAI,
        difficulty: Difficulty.HARD,
        AIMoveDelay: AI_MOVE_DELAY_MS,
      });
      this.isInitialized = true;
      setTimeout(() => {
        this.game.startGame();
      }, AI_INIT_MOVE_DELAY_MS);
    },
    onNext() {
      this.game.resetGame();
      setTimeout(() => {
        this.game.startGame();
      }, AI_MOVE_DELAY_MS);
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
      <VOverlay :is-open="!isInitialized" is-preopened>
        <div class="board__init-settings init-settings">
          <div class="init-settings__icon-wrapper">
            <IconX class="init-settings__icon" />
            <IconO class="init-settings__icon" />
          </div>
          <h3 class="init-settings__heading">Play:</h3>
          <div class="init-settings__buttons">
            <VButton @onClick="onInit(true)">AI</VButton>
            <VButton @onClick="onInit(false)">Human</VButton>
          </div>
        </div>
      </VOverlay>
      <WinnerOverlay :winner="game.winner" @onNext="onNext()" />
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
    <div
      class="tic-tac-toe__settings settings"
      ref="settings"
      :style="{
        ...(isInitialized ? {} : { padding: 0, width: 0, height: 0 }),
      }"
    >
      <div class="settings__wrapper">
        <div class="settings__section">
          <p>
            Next:
            <span
              :style="{
                color: `var(--color-${game.move.player})`,
                opacity: !game.winner ? opacity : 0,
              }"
            >
              {{ nextText }}
            </span>
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
  -webkit-mask-image: -webkit-radial-gradient(white, black);

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

  &__init-settings {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.tic-tac-toe__settings {
  justify-self: start;
  margin-top: calc(var(--grid-step) * 5);

  @media (min-width: 768px) {
    transition: width 200ms ease-out, padding-left 200ms ease-out;
    width: calc(var(--grid-step) * 50);
    margin-top: 0;
    margin-left: calc(var(--grid-step) * 5);
  }

  @media (max-width: 767px) {
    transition: height 200ms ease-out;
  }
}

.init-settings {
  &__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: stretch;

    margin-bottom: calc(var(--grid-step) * 8);
  }

  &__icon {
    width: 15%;
    max-width: 75px;
  }

  &__heading {
    margin-bottom: calc(var(--grid-step) * 4);
  }

  &__buttons {
    display: flex;
  }

  &__buttons > {
    *:not(:last-child) {
      margin-right: calc(var(--grid-step) * 4);
    }
  }
}

.settings {
  border-radius: calc(var(--grid-step) * 5);
  background-color: var(--color-bg);
  padding: calc(var(--grid-step) * 5);
  overflow: hidden;

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

  @media (max-width: 767px) {
    width: 100%;
    max-width: calc(var(--grid-step) * 105);
  }

  @media (min-width: 768px) {
    &__wrapper {
      width: calc(var(--grid-step) * 50);
    }
  }
}
</style>
