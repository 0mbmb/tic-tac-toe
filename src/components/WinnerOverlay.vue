<script lang="ts">
import IconX from "../icons/IconX.vue";
import IconO from "../icons/IconO.vue";
import { Winner } from "../types";

export default {
  setup() {
    return {
      Winner,
    };
  },
  props: {
    winner: {
      type: String,
    },
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
  },
  mounted() {
    setTimeout(() => {
      this.opacity = 1;
    }, 200);
  },
};
</script>

<template>
  <div class="overlay" :style="{ opacity }">
    <div>
      <IconX
        v-if="winner === Winner.x || winner === Winner.draw"
        class="overlay__icon"
      />
      <IconO
        v-if="winner === Winner.o || winner === Winner.draw"
        class="overlay__icon"
      />
    </div>
    <span class="overlay__message">{{
      winner === Winner.draw ? "DRAW" : "WINS"
    }}</span>
    <button class="overlay__button button" @click="onNext">Next</button>
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
  align-items: center;
  justify-content: center;

  color: var(--color-text-overlay);

  &__icon {
    width: 75px;
    height: 75px;
  }

  &__message {
    margin-top: calc(var(--grid-step) * 5);
    font-size: 36px;
  }

  &__button {
    margin-top: calc(var(--grid-step) * 7);
  }
}

.button {
  padding: calc(var(--grid-step) * 2) calc(var(--grid-step) * 10);
  font-size: 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
}
</style>
