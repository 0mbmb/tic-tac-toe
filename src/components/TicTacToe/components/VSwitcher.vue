<script lang="ts">
export default {
  props: {
    modelValue: {
      type: Boolean,
    },
    // TODO: slot?
    labelLeft: {
      type: String,
    },
    labelRight: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    onSwitcherChange() {
      this.$emit("update:modelValue", !this.modelValue);
    },
    onLeftClick() {
      this.$emit("update:modelValue", false);
    },
    onRightClick() {
      this.$emit("update:modelValue", true);
    },
  },
};
</script>

<template>
  <div class="switcher">
    <button
      v-if="labelLeft"
      class="switcher__button"
      type="button"
      @click="onLeftClick"
    >
      {{ labelLeft }}
    </button>
    <div class="switcher__toggle">
      <input
        :checked="modelValue"
        @change="onSwitcherChange"
        class="switcher__input"
        type="checkbox"
        id="switcher"
      />
      <label class="switcher__label" for="switcher"></label>
    </div>
    <button
      v-if="labelRight"
      class="switcher__button"
      type="button"
      @click="onRightClick"
    >
      {{ labelRight }}
    </button>
  </div>
</template>

<style lang="scss">
.switcher {
  display: flex;
  align-items: center;

  &__button {
    border: none;
    cursor: pointer;
    background: none;
    color: inherit;
    font-size: inherit;
    padding: 0;
    font-weight: bold;
    transition: opacity ease 150ms;

    &:hover {
      opacity: 0.6;
    }
  }
}

.switcher__toggle {
  border: 2px solid var(--color-text);
  height: 25px;
  width: 48px;
  border-radius: 16px;
  background-color: var(--color-board);
  display: flex;

  margin: 0 calc(var(--grid-step) * 2);

  transition: opacity ease 150ms;

  &:hover {
    opacity: 0.6;
  }
}

.switcher__label {
  cursor: pointer;
  position: relative;
  width: 100%;
  height: 100%;

  &::before {
    content: "";
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: var(--color-text);
    top: 50%;
    transform: translateY(-50%);
    transition: all 200ms ease;
    left: 2px;
  }
}

.switcher__input {
  display: none;
}

.switcher__input:checked + .switcher__label::before {
  left: calc(100% - 2px);
  transform: translate(-100%, -50%);
}
</style>
