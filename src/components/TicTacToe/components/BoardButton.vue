<script lang="ts">
import IconX from "../icons/IconX.vue";
import IconO from "../icons/IconO.vue";
import type { PropType } from "vue";
import { Mark, Player } from "../types";

export default {
  setup() {
    return {
      Mark,
    };
  },
  props: {
    cell: {
      type: null as unknown as PropType<String | null>,
    },
    mark: {
      type: String,
    },
    firstPlayer: {
      type: String,
    },
    disabled: {
      type: Boolean,
    },
    isAIMove: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    IconX,
    IconO,
  },
  computed: {
    iconXStyle() {
      return `color: var(--color-${
        this.firstPlayer === Player.ONE ? "one" : "two"
      })`;
    },
    iconOStyle() {
      return `color: var(--color-${
        this.firstPlayer === Player.ONE ? "two" : "one"
      })`;
    },
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
    <IconX
      v-if="cell === Mark.X"
      :style="iconXStyle"
      class="board__icon board__icon--icon-x"
    />
    <IconO
      v-else-if="cell === Mark.O"
      :style="iconOStyle"
      class="board__icon board__icon--icon-o"
    />
    <IconX
      v-else-if="mark === Mark.X && !isAIMove"
      :style="iconXStyle"
      class="board__icon board__icon--ghost board__icon--ghost-x"
    />
    <IconO
      v-else-if="mark === Mark.O && !isAIMove"
      :style="iconOStyle"
      class="board__icon board__icon--ghost board__icon--ghost-o"
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
  transition: opacity 200ms ease;

  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

  &:disabled {
    cursor: not-allowed;
  }

  @media (hover: hover) {
    &:hover {
      .board__icon--ghost {
        opacity: 0.1;
      }
    }
  }
}

.board__icon {
  max-width: 100px;
  max-height: 100px;

  &--icon-x {
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
    circle {
      stroke-dasharray: 252px;
      stroke-dashoffset: 252px;
      animation: anim-path 0.2s ease forwards;
    }
  }

  &--ghost {
    opacity: 0;
    transition: opacity 0.1s ease;
  }
}

@keyframes anim-path {
  to {
    stroke-dashoffset: 0px;
  }
}
</style>
