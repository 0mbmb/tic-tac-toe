<script lang="ts">
export default {
  methods: {
    onClick() {
      this.$emit("onClick");
    },
  },
};
</script>

<template>
  <button class="button" @click="onClick">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.button {
  padding: calc(var(--grid-step) * 2) calc(var(--grid-step) * 8);
  font-size: 1.1rem;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: inherit;
  background-color: var(--color-button);
  transition: background-color 200ms ease;
  &:hover {
    background-color: var(--color-button-hover);
  }
}
</style>
