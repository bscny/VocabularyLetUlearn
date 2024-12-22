<template>
  <div class="player-list">
    <h3>Lobby player names</h3>
    <ul>
      <li v-for="(player, index) in players" :key="index">{{ player.User_name }}</li>
    </ul>
  </div>
</template>

<script>
import chatAPI from "@/services/Room_API/chatAPI";

export default {
  data() {
    return {
      players: [],
    };
  },
  created() {
    
    chatAPI.onPlayersUpdate((players) => {
      this.players = players;
    });
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
  justify-content: space-between;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  font-size: 10 px;
  max-height: 300px;
  overflow-y: auto;
}

h3 {
  margin-top: 0;
  text-align: center;
}

ul {
  flex: 1;
  margin: 0;
  padding: 0;
  list-style: none;
}

</style>
