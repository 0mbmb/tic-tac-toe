<script setup lang="ts">
import TheGame from "./components/TheGame.vue";

defineProps<{
  msg: string;
}>();
</script>

<template>
  <header>
    <h1>Tic Tac Toe</h1>
  </header>

  <main>
    <TheGame />
  </main>
</template>

<style scoped></style>
