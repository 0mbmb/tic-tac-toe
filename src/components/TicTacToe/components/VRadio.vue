<script lang="ts">
export default {
  props: {
    modelValue: {
      type: String,
    },
    value: {
      type: String,
    },
    id: {
      type: String,
    },
    label: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  emits: ["update:modelValue"],
  methods: {
    onInput() {
      this.$emit("update:modelValue", this.value);
    },
  },
};
</script>

<template>
  <div class="radio">
    <input
      class="radio__input"
      type="radio"
      :name="name"
      :value="value"
      :checked="value === modelValue"
      :id="id"
      @input="onInput"
    />
    <label class="radio__label" :for="id">{{ label }}</label>
  </div>
</template>

<style lang="scss" scoped>
.radio {
  padding: var(--grid-step) 0;

  transition: opacity ease 150ms;

  &:hover {
    opacity: 0.6;
  }

  &__input {
    display: none;

    &:checked + .radio__label::after {
      opacity: 1;
      visibility: visible;
    }
  }

  &__label {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;

    &::before {
      content: "";
      width: 20px;
      height: 20px;
      border: 2px solid var(--color-text);
      border-radius: 50%;
      margin-right: calc(var(--grid-step) * 2);
    }

    &::after {
      content: "";
      position: absolute;
      width: 12px;
      height: 12px;
      background-color: var(--color-text);
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
      left: 4px;
      visibility: hidden;
      opacity: 0;
      transition: opacity 200ms ease;
    }
  }
}
</style>
