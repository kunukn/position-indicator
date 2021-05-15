<template>
  <PositionIndicatorDemo />
</template>

<script setup>
import PositionIndicatorDemo from './components/PositionIndicatorDemo.vue'
</script>

<style>
*,
::before,
::after {
  box-sizing: border-box;
}
html {
  font-size: 16px;
}
body {
  min-height: 100vh;
  font-family: 'Montserrat', sans-serif;
  position: relative;
  padding: 1rem;
}

#app {
  position: relative;
}
</style>
