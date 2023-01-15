<script lang="ts">
import type { PropType } from "vue";
import IconX from "../icons/IconX.vue";
import IconO from "../icons/IconO.vue";
import { Winner } from "../types";

interface IWinner {
  mark: string;
  player: string;
}

export default {
  setup() {
    return {
      Winner,
    };
  },
  props: {
    winner: { type: Object as PropType<IWinner>, required: true },
  },
  data() {
    return {
      opacity: 0,
    };
  },
  components: {
    IconX,
    IconO,
  },
  methods: {
    onNext() {
      this.opacity = 0;
      this.$emit("onNext");
    },
    onEscKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") this.onNext();
    },
  },
  created() {
    window.addEventListener("keydown", this.onEscKeydown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.onEscKeydown);
  },
  mounted() {
    const onNextButton = this.$refs.onNextButton as HTMLButtonElement;
    if (onNextButton) onNextButton.focus();
    setTimeout(() => {
      this.opacity = 1;
    }, 200);
  },
};
</script>

<template>
  <div class="overlay" :style="{ opacity }">
    <div class="overlay__icon-wrapper">
      <IconX
        v-if="winner.mark === Winner.X || winner.player === Winner.DRAW"
        class="overlay__icon"
      />
      <IconO
        v-if="winner.mark === Winner.O || winner.player === Winner.DRAW"
        class="overlay__icon"
      />
    </div>
    <span class="overlay__message">{{
      winner.player === Winner.DRAW ? "DRAW" : "WINS"
    }}</span>
    <button class="overlay__button button" @click="onNext" ref="onNextButton">
      Next
    </button>
  </div>
</template>

<style scoped lang="scss">
.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;

  transition: opacity 200ms ease;

  background-color: var(--color-bg-overlay);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;

  color: var(--color-text-overlay);

  &__icon-wrapper {
    display: flex;
    justify-content: center;
  }

  &__icon {
    width: 20%;
    max-width: 75px;
  }

  &__message {
    align-self: center;
    margin-top: calc(var(--grid-step) * 5);
    font-size: 2rem;
  }

  &__button {
    align-self: center;
    margin-top: calc(var(--grid-step) * 7);
  }
}

.button {
  padding: calc(var(--grid-step) * 2) calc(var(--grid-step) * 10);
  font-size: 1.1rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: inherit;
}
</style>
