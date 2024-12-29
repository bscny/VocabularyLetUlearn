<template>
    <h2 class="category">建立房間</h2>
    <form @submit.prevent="createRoom">
        <div>
            <label class="body-text" for="roomName">房間名稱：</label>
            <input class="body-text" type="text" v-model="roomName" required />
        </div>
        <div>
            <label class="body-text" for="isPublic">公開房間：</label>
            <input class="body-text" type="checkbox" v-model="isPublic" />
        </div>
        <div v-if="!isPublic">
            <label class="body-text" for="password">房間密碼：</label>
            <input class="body-text" type="password" v-model="password" />
        </div>
        <button class="submit-button" type="submit">創建房間</button>
    </form>
</template>

<script>
import {
    CreateRoom,
    JoinRoom
} from '@/services/Create_Join_Room_API/roomAPI.js';

import {
    CreateUser
} from '@/services/Create_Join_Room_API/userAPI.js';

import { useUserStore } from '@/stores/User/userStore.js';
import { useRoomStore } from '@/stores/Room/RoomStore.js';

export default {
    data() {
        return {
            roomName: '',
            userId: '',
            userName: '',
            isPublic: true,
            password: ''
        };
    },

    setup() {
        const userStore = useUserStore(); // 使用 Pinia Store
        const roomStore = useRoomStore();

        // init user
        userStore.setUser(JSON.parse(localStorage.getItem("USER_ID")),
            JSON.parse(localStorage.getItem("name")),
            JSON.parse(localStorage.getItem("email")));

        return { userStore, roomStore };
    },

    methods: {
        async createRoom() {
            let roomId
            try {
                const response = await CreateRoom(this.roomName, this.isPublic, this.password);
                alert("已建立房間，roomID：" + response.roomId);
                roomId = response.roomId;
            } catch (error) {
                alert("房間創建失敗，請重試！");
            }
            this.userName = this.userStore.userName;
            this.userId = this.userStore.userId;
            const user = await CreateUser(this.userId, this.userName);
            const response = await JoinRoom(roomId, user.userId, user.userName, this.password); // 創建者先加入房間
            this.roomStore.ROOM_ID = response.roomId;
            localStorage.setItem("ROOM_ID", JSON.stringify(response.roomId));

            this.$router.push({
                name: 'Room'
            });
        }
    }
};
</script>

<style scoped>
.category{
    font-size: 2vw;
}

.body-text{
    font-size: 1.2vw;
}

.submit-button {
    padding: 1vh 2vw;
    font-size: 1vw;
    background-color: #24a74b;
    color: white;
    border: none;
    border-radius: 5px;
    margin-top: 1.5vh;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.submit-button:hover {
    background-color: #1de903;
}

.submit-button.active {
    background-color: #28a745;
}
</style>