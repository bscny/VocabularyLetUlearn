<template>
  <div id="app">
    <router-view /> 
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
#app {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
