<template>
  <div class="start-button">
    <button @click="GameStart">Start</button>
  </div>
</template>

<script>
export default {
  methods: {
    GameStart() {
      alert('Game Start!');
    },
  },
};
</script>

<style scoped>
.start-button {
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
