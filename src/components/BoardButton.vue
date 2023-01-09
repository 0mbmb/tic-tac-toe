<script lang="ts">
import IconX from "../icons/IconX.vue";
import IconO from "../icons/IconO.vue";
import type { PropType } from "vue";
import { Player } from "../types";

export default {
  setup() {
    return {
      Player,
    };
  },
  props: {
    cell: {
      type: null as unknown as PropType<String | null>,
    },
    disabled: {
      type: Boolean,
    },
  },
  components: {
    IconX,
    IconO,
  },
  methods: {
    makeMove() {
      this.$emit("makeMove");
    },
  },
};
</script>

<template>
  <button
    class="board__button"
    type="button"
    @click="makeMove"
    :disabled="disabled"
  >
    <IconX v-if="cell === Player.x" class="board__icon board__icon--icon-x" />
    <IconO
      v-else-if="cell === Player.o"
      class="board__icon board__icon--icon-o"
    />
  </button>
</template>

<style lang="scss">
.board__button {
  border: none;
  cursor: pointer;
  aspect-ratio: 1 / 1;
  padding: calc(var(--grid-step) * 2);
  line-height: 0;
  background-color: var(--color-board);

  &:disabled {
    cursor: not-allowed;
  }
}

.board__icon {
  max-width: 100px;
  max-height: 100px;

  &--icon-x {
    color: var(--color-x);

    path {
      stroke-dasharray: 111px;
      stroke-dashoffset: 111px;
    }
    path:nth-child(1) {
      animation: anim-path 0.1s ease forwards;
    }
    path:nth-child(2) {
      animation: anim-path 0.1s ease 0.1s forwards;
    }
  }

  &--icon-o {
    color: var(--color-o);
  }
}

@keyframes anim-path {
  to {
    stroke-dashoffset: 0px;
  }
}
</style>
