<script lang="ts">
import { CrossLinePositions } from "../types";
import IconCrossline from "../icons/IconCrossline.vue";

export default {
  components: {
    IconCrossline,
  },
  props: {
    position: String,
  },
  computed: {
    lineCSS() {
      const lineWidth = "20px";

      const rowCommon = {
        left: "50%",
        width: "100%",
        transform: "translate(-50%, -50%)",
      };

      const colCommon = {
        width: "100%",
        top: "50%",
        transform: "translate(-50%, -50%) rotate(90deg)",
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
            // width: `calc(100% * ${Math.pow(2, 0.5)})`,
            // height: lineWidth,
            width: "100%",
            height: "100%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(45deg)",
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
  <div class="cross-line" :style="lineCSS">
    <IconCrossline class="cross-line__icon" />
  </div>
</template>

<style scoped lang="scss">
.cross-line {
  position: absolute;
  z-index: 2;
  color: var(--color-crossline);
  padding: calc(var(--grid-step) * 2);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 200ms ease;

  &__icon {
    max-width: 382px;
  }
}
</style>
