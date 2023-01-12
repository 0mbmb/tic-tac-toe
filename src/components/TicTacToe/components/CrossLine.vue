<script lang="ts">
import { CrossLinePositions } from "../types";
import CrosslineHoriz from "../icons/IconCrossline.vue";
import CrosslineDiag from "../icons/IconCrosslineDiag.vue";

export default {
  setup() {
    return {
      CrossLinePositions,
    };
  },
  components: {
    CrosslineHoriz,
    CrosslineDiag,
  },
  props: {
    position: String,
  },
  computed: {
    lineCSS() {
      const rowCommon = {
        left: "50%",
        transform: "translate(-50%, -50%)",
      };
      const colCommon = {
        top: "50%",
        transform: "translate(-50%, -50%) rotate(90deg)",
      };
      const diagCommon = {
        height: "100%",
      };

      switch (this.position) {
        case CrossLinePositions.ROW1:
          return {
            top: "calc(100% / 6)",
            ...rowCommon,
          };
        case CrossLinePositions.ROW2:
          return {
            top: "50%",
            ...rowCommon,
          };
        case CrossLinePositions.ROW3:
          return {
            top: "calc(100% * (5 / 6))",
            ...rowCommon,
          };
        case CrossLinePositions.COL1:
          return {
            left: "calc(100% / 6)",
            ...colCommon,
          };
        case CrossLinePositions.COL2:
          return {
            left: "50%",
            ...colCommon,
          };
        case CrossLinePositions.COL3:
          return {
            left: "calc(100% * (5 / 6))",
            ...colCommon,
          };
        case CrossLinePositions.DIAG1:
          return {
            ...diagCommon,
          };
        case CrossLinePositions.DIAG2:
          return {
            ...diagCommon,
            transform: "rotate(90deg)",
          };
        default:
          return {};
      }
    },
  },
};
</script>

<template>
  <div class="cross-line" :style="lineCSS">
    <CrosslineDiag
      v-if="
        position === CrossLinePositions.DIAG1 ||
        position === CrossLinePositions.DIAG2
      "
      class="cross-line__icon cross-line__icon--diag"
    />
    <CrosslineHoriz v-else class="cross-line__icon cross-line__icon--horiz" />
  </div>
</template>

<style lang="scss">
.cross-line {
  position: absolute;
  z-index: 2;
  color: var(--color-crossline);
  padding: calc(var(--grid-step) * 2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 200ms ease;
  width: 100%;

  &__icon {
    max-width: 382px;

    path {
      animation: anim-path 0.2s ease forwards;
    }

    &--horiz {
      path {
        stroke-dasharray: 362px;
        stroke-dashoffset: -362px;
      }
    }

    &--diag {
      path {
        stroke-dasharray: 510px;
        stroke-dashoffset: -510px;
      }
    }
  }
}

@keyframes anim-path {
  to {
    stroke-dashoffset: 0px;
  }
}
</style>
