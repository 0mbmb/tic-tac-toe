<script lang="ts">
export default {
  props: {
    modelValue: {
      type: Boolean,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    onSwitcherChange() {
      this.$emit("update:modelValue", !this.modelValue);
    },
  },
};
</script>

<template>
  <div class="switcher">
    <input
      :checked="modelValue"
      @change="onSwitcherChange"
      class="switcher__input"
      type="checkbox"
      id="switcher"
    />
    <label class="switcher__label" for="switcher"></label>
  </div>
</template>

<style lang="scss">
.switcher {
  border: 2px solid var(--color-text);
  height: 32px;
  width: 55px;
  border-radius: 16px;
  background-color: var(--color-board);
  display: flex;
}

.switcher__label {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: var(--color-text);
    top: 50%;
    transform: translateY(-50%);
    transition: all 200ms ease;
    left: 3px;
  }
}

.switcher__input {
  display: none;
}

.switcher__input:checked + .switcher__label::before {
  left: calc(100% - 3px);
  transform: translate(-100%, -50%);
}
</style>
