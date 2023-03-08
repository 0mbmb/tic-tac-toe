<script lang="ts">
export default {
  props: {
    isOpen: { type: Boolean, required: true },
    isPreopened: { type: Boolean, required: false },
  },
  data() {
    return {
      opacity: this.isPreopened ? 1 : 0,
      isVisible: this.isPreopened ? true : false,
    };
  },
  watch: {
    isOpen(newVal) {
      this.opacity = newVal ? 1 : 0;
      setTimeout(() => {
        this.isVisible = newVal;
      }, 200);
    },
  },
  mounted() {
    this.isVisible = this.isOpen;
    setTimeout(() => {
      this.opacity = this.isOpen ? 1 : 0;
    }, 0);
  },
};
</script>

<template>
  <div
    v-if="isVisible"
    class="overlay"
    :style="{
      opacity,
    }"
  >
    <div class="overlay__content"><slot /></div>
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
  color: var(--color-text-overlay);

  &__content {
    padding: calc(var(--grid-step) * 4);
    height: 100%;
  }
}
</style>
