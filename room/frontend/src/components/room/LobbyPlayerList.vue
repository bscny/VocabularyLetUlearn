<template>
  <div class="player-list">
    <h3>Lobby player names</h3>
    <ul>
      <li v-for="(player, index) in players" :key="index">{{ player }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      players: ['Player1', 'Player2', 'Player3'],
    };
  },
  methods: {
    invitePlayer() {
      alert('Invite Player功能觸發');
    },
    kickPlayer() {
      alert('Kick Player功能觸發');
    },
  },
};
</script>

<style scoped>
.player-list {
  background: #f0f0f0;
  padding: 20px;
  border: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 內容和按鈕分散排列 */
  height: 100%; /* 填滿容器高度 */
  box-sizing: border-box;
  position: relative; /* 定位按鈕區域 */
}

ul {
  flex: 1; /* 占據剩餘空間 */
  margin: 0;
  padding: 0;
  list-style: none;
}

</style>
