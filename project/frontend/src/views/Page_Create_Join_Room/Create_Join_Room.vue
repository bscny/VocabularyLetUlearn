<template>
    <div class="page1">
        <h1 class="title">請建立或加入房間</h1>
        <div class="button-group">
            <button @click="isCreateRoom = true" :class="{ 'active': isCreateRoom }">建立房間</button>
            <button @click="isCreateRoom = false" :class="{ 'active': !isCreateRoom }">加入房間</button>
        </div>

        <div v-if="isCreateRoom" class="form-container">
            <CreateRoom @create-room="handleCreateRoom" />
        </div>
        <div v-else class="form-container">
            <JoinRoom @join-room="handleJoinRoom" />
        </div>
        <button class="home-button" @click="goToHome">回到首頁</button>
    </div>
</template>

<script>
import CreateRoom from '@/components/Create_Join_Room/CreateRoom.vue';
import JoinRoom from '@/components/Create_Join_Room/JoinRoom.vue';

export default {
    components: {
        CreateRoom,
        JoinRoom
    },
    data() {
        return {
            isCreateRoom: true
        };
    },
    methods: {
        goToHome() {
            this.$router.push('/home-logged-in'); // 假設首頁路徑為 '/'
        },
    }
};
</script>

<style scoped>
.page1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100vw;
    background-color: #f5f5f5;
    padding: 2vw;
}

.title {
    font-size: 5vw;
    font-weight: bold;
    color: #333;
    margin-bottom: 4vw;
}

.button-group {
    display: flex;
    gap: 4vw;
    margin-bottom: 6vw;
}

button {
    padding: 2vw 4vw;
    font-size: 3vw;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 1vw;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #0056b3;
}

button.active {
    background-color: #28a745;
}

.form-container {
    width: 80vw;
    max-width: 60vw;
    background-color: white;
    padding: 4vw;
    box-shadow: 0 0.4vw 0.6vw rgba(0, 0, 0, 0.1);
    border-radius: 2vw;
    display: flex;
    flex-direction: column;
    gap: 2vw;
}
</style>