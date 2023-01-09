<script lang="ts">
import { CrossLinePositions } from "../types";

export default {
  props: {
    position: String,
  },
  computed: {
    lineCSS() {
      const lineWidth = 20;
      const maxLength = 382;

      switch (this.position) {
        case CrossLinePositions.ROW1:
          return {
            width: "100%",
            height: lineWidth,
            top: "calc(100% / 6 -10px)",
          };
        case CrossLinePositions.ROW2:
          return {
            width: "100%",
            top: "calc(100% / 6)",
            height: `calc(100% * ${lineWidth} / ${maxLength})`,
            // transform: "translateY(-50%)",
          };
        case CrossLinePositions.ROW3:
          return {
            width: "100%",
            height: lineWidth,
            top: "calc(100% - (100% / 6))",
          };
        case CrossLinePositions.COL1:
          return {
            width: lineWidth,
            height: "100%",
            left: "calc(100% / 6)",
          };
        case CrossLinePositions.COL2:
          return {
            width: lineWidth,
            height: "100%",
            left: "50%",
          };
        case CrossLinePositions.COL3:
          return {
            width: lineWidth,
            height: "100%",
            left: "calc(100% - (100% / 6))",
          };
        case CrossLinePositions.DIAG1:
          return {
            width: `calc(100% * ${Math.pow(2, 0.5)})`,
            height: lineWidth,
            top: "50%",
            left: "50%",
            transform: "translateX(-50%) rotate(45deg)",
          };
        case CrossLinePositions.DIAG2:
          return {
            width: `calc(100% * ${Math.pow(2, 0.5)})`,
            height: lineWidth,
            top: "50%",
            left: "50%",
            transform: "translateX(-50%) rotate(-45deg)",
          };
        default:
          return {};
      }
    },
  },
};
</script>

<template>
  <div class="cross-line">
    <div class="cross-line__inner" :style="lineCSS"></div>
  </div>
</template>

<style scoped lang="scss">
.cross-line {
  position: absolute;
  z-index: 2;
  // padding: calc(var(--grid-step) * 2);
  width: 100%;
  height: 100%;

  // pointer-events: none;

  display: flex;
  align-items: center;
  justify-content: center;

  // background-color: var(--color-crossline);
  // border-radius: 10px;
  // max-width: 382px;
  // max-height: 382px;

  &__inner {
    background-color: var(--color-crossline);
    border-radius: 10px;
    max-width: 382px;
    max-height: 382px;

    // position: relative;
  }
}
</style>
