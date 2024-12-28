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

        <div class="leave-button">
            <button @click="LeaveRoom()">Leave Room</button>
        </div>
    </div>
</template>

<script>

export default {
    name: "LobbyPlayerList",
    
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

    methods: {
        ToggleReady() {
            this.isReady = !this.isReady;
            this.$emit("ToggleReady", this.isReady);
        },

        StartGame() {
            this.$emit("StartGame");
        },

        LeaveRoom(){
            if(this.isReady){
                alert("Can not leave room when you're ready!");
            }else{
                this.$emit("LeaveRoom");
            }
        }
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

.leave-button button {
    position: fixed;
    right: 1vw;
    bottom: 1vh;
    background-color: #ff4d4f;
    color: white;
    padding: 12px 25px;
    font-size: 16px;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
}

.leave-button button:hover {
    background-color: #ff1a1c;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.5);
    transform: scale(1.05);
}
</style>
