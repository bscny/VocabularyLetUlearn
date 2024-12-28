<template>
    <div class="lobby-player-list">
        <div class="lobby-header">
            <h3>Lobby Player Names</h3>
            <button @click="ToggleReady" :class="isReady ? 'cancel-ready-button' : 'ready-button'">
                {{ isReady ? "Cancel Ready" : "Click to Ready" }}
            </button>
        </div>

        <!-- 玩家列表 -->
        <ul v-if="players.length > 0">
            <li v-for="player in players" :key="player.User_id">
                <span v-if="player.isReady">✅</span>
                <span v-else>❌</span>
                {{ player.User_name }}
            </li>
        </ul>

        <!-- 若使用者是房主，顯示 Start Game 與準備狀態 -->
        <div v-if="USER_ID == players[0].User_id" class="owner-action">
            <button @click="StartGame" :disabled="!CanStart" class="start-button">
                Start Game
            </button>
        </div>
        <p class="ready-count">
            {{ readyCount }} / {{ players.length }} players are ready.
        </p>
    </div>
</template>

<script>

export default {
    data() {
        return {
            USER_ID: JSON.parse(localStorage.getItem("USER_ID")),

            isReady: false,
        };
    },
    
    props: {
        players: Array,
        readyCount: Number,
    },

    created() {
        // 收到玩家列表更新
        // socketAPI.onPlayersUpdate((data) => {
        //     console.log("Received player updates:", data);
        //     if (data?.players) {
        //         this.players = data.players;
        //         this.readyCount = this.players.filter((p) => p.isReady).length;
        //     }
        // });

        // socketAPI.onGameStarted(() => {
        //     alert("The game has started!");
        // });
    },

    methods: {
        ToggleReady() {
            // socketAPI.emitReady((res) => {
            //     if (res.success) {
            //         this.isReady = !this.isReady;
            //     } else {
            //         alert(`Failed to toggle ready: ${res.message}`);
            //     }
            // });
            this.isReady = !this.isReady;
            this.$emit("ToggleReady", this.isReady);
        },

        StartGame() {
            // socketAPI.emitStartGame((res) => {
            //     if (!res.success) {
            //         alert(`Failed to start game: ${res.message}`);
            //     }
            // });

            this.$emit("StartGame");
        },
    },
    computed: {
        // 只有全部玩家都 ready 時，才可開始遊戲
        CanStart() {
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
    background-color: #ccc;
    /* 灰色 */
    color: black;
    cursor: pointer;
}

.cancel-ready-button:hover {
    background-color: #b3b3b3;
    /* 淺灰色 */
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
