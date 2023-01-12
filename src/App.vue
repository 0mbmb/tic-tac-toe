<script lang="ts">
import TicTacToe from "./components/TicTacToe/TicTacToe.vue";

export default {
  components: {
    TicTacToe,
  },
};
</script>

<template>
  <main class="main-page">
    <div class="main-page__container">
      <section class="main-page__tic-tac-toe">
        <TicTacToe />
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.main-page {
  flex-grow: 1;
  display: flex;
  flex-direction: column;

  background-image: linear-gradient(
    to right bottom,
    #748ff0,
    #00a7f4,
    #00b5d4,
    #00bb9f,
    #6cbb6b
  );

  &__container {
    padding: 0 calc(var(--grid-step) * 5);
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }

  &__tic-tac-toe {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
