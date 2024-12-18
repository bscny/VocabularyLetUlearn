<template>
  <div class="ready-button">
    <button @click="setReady">Ready</button>
  </div>
</template>

<script>
export default {
  methods: {
    setReady() {
      alert('You are Ready!');
    },
  },
};
</script>

<style scoped>
.ready-button {
  text-align: center;
  margin-buttom: 10px;
}

button {
  background: #ff4d4f;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background: #d9363e;
}
</style>
