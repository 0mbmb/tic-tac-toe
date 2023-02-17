<script lang="ts">
export default {
  props: {
    isOpen: { type: Boolean },
  },
  data() {
    return {
      opacity: 0,
    };
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
