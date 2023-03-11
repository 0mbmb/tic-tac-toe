<script lang="ts">
import type { PropType } from "vue";
import IconX from "../icons/IconX.vue";
import IconO from "../icons/IconO.vue";
import VOverlay from "./VOverlay.vue";
import VButton from "./VButton.vue";
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
    winner: { type: Object as PropType<IWinner | null> },
  },
  components: {
    IconX,
    IconO,
    VOverlay,
    VButton,
  },
  methods: {
    onNext() {
      this.$emit("onNext");
    },
    onEscKeydown(e: KeyboardEvent) {
      if (e.key === "Escape" && this.winner) this.onNext();
    },
  },
  created() {
    window.addEventListener("keydown", this.onEscKeydown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.onEscKeydown);
  },
  watch: {
    winner(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          const onNextButton = this.$refs.onNextButton as any;
          if (onNextButton) onNextButton.$el.focus();
        });
      }
    },
  },
};
</script>

<template>
  <VOverlay :is-open="!!winner" :open-delay="300">
    <div class="winner-overlay__content" v-if="!!winner">
      <div class="winner-overlay__icon-wrapper">
        <IconX
          v-if="winner.mark === Winner.X || winner.player === Winner.DRAW"
          class="winner-overlay__icon"
        />
        <IconO
          v-if="winner.mark === Winner.O || winner.player === Winner.DRAW"
          class="winner-overlay__icon"
        />
      </div>
      <span class="winner-overlay__message">{{
        winner.player === Winner.DRAW ? "DRAW" : "WINS"
      }}</span>
      <div class="winner-overlay__button-wrapper">
        <VButton @onClick="onNext" ref="onNextButton"> Next </VButton>
      </div>
    </div>
  </VOverlay>
</template>

<style scoped lang="scss">
.winner-overlay {
  &__content {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
    height: 100%;
  }

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

  &__button-wrapper {
    align-self: center;
    margin-top: calc(var(--grid-step) * 7);
  }
}
</style>
