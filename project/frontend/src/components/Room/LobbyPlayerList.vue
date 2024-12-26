<template>
  <div class="lobby-player-list">
    <div class="lobby-header">
      <h3>Lobby Player Names</h3>
      <button
        @click="toggleReady"
        :class="isReady ? 'cancel-ready-button' : 'ready-button'"
      >
        {{ isReady ? "Cancel Ready" : "Click to Ready" }}
      </button>
    </div>

    <!-- 玩家列表 -->
    <ul v-if="players.length > 0">
      <li v-for="(player, index) in players" :key="player.User_id">
        <span v-if="player.isReady">✅</span>
        <span v-else>❌</span>
        {{ player.User_name }}
      </li>
    </ul>
    <p v-else>No players in the lobby yet.</p>

    <!-- 若使用者是房主，顯示 Start Game 與準備狀態 -->
    <div v-if="isOwner" class="owner-action">
      <button
        @click="startGame"
        :disabled="!canStart"
        class="start-button"
      >
        Start Game
      </button>
      <p class="ready-count">
        {{ readyCount }}/{{ players.length }} players are ready.
      </p>
    </div>
  </div>
</template>

<script>
import socketAPI from "@/services/Room_API/socketAPI";
import { useUserStore } from "@/stores/Room/userStore";

export default {
  data() {
    return {
      players: [],
      isReady: false,
      isOwner: false,
      readyCount: 0,
    };
  },
  created() {
    // 收到玩家列表更新
    socketAPI.onPlayersUpdate((data) => {
      console.log("Received player updates:", data);
      if (data?.players) {
        this.players = data.players;
        this.readyCount = this.players.filter((p) => p.isReady).length;
      }
    });

    socketAPI.onGameStarted(() => {
      alert("The game has started!");
    });

    socketAPI.onAssignOwner(() => {
      this.isOwner = true;
    });
  },
  methods: {
    toggleReady() {
      socketAPI.emitReady((res) => {
        if (res.success) {
          this.isReady = !this.isReady;
        } else {
          alert(`Failed to toggle ready: ${res.message}`);
        }
      });
    },
    startGame() {
      socketAPI.emitStartGame((res) => {
        if (!res.success) {
          alert(`Failed to start game: ${res.message}`);
        }
      });
    },
  },
  computed: {
    // 只有全部玩家都 ready 時，才可開始遊戲
    canStart() {
      return this.readyCount === this.players.length && this.players.length > 0;
    },
  },
};
</script>

<style scoped>
.lobby-player-list {
  background: #f9f9f9;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  max-height: 300px;
  overflow-y: auto;
}

.lobby-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.ready-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  cursor: pointer;
}

.cancel-ready-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: #ccc; /* 灰色 */
  color: black;
  cursor: pointer;
}

.cancel-ready-button:hover {
  background-color: #b3b3b3; /* 淺灰色 */
}

.start-button {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
}
.start-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.lobby-player-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ready-count {
  margin: 0;
}
</style>
