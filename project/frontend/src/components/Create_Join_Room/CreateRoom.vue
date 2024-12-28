<template>
    <div class="create-room">
        <h2>建立房間</h2>
        <form @submit.prevent="createRoom">
            <div>
                <label for="roomName">房間名稱：</label>
                <input type="text" v-model="roomName" required />
            </div>
            <div>
                <label for="isPublic">公開房間：</label>
                <input type="checkbox" v-model="isPublic" />
            </div>
            <div v-if="!isPublic">
                <label for="password">房間密碼：</label>
                <input type="password" v-model="password" />
            </div>
            <button type="submit">創建房間</button>
        </form>
    </div>
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
            isPublic: false,
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
                console.error("房間創建成功：", response);
                alert("已建立房間，roomID：" + response.roomId);
                this.$emit("creationDone");
                roomId = response.roomId;
            } catch (error) {
                console.error("創建房間失敗：", error.message);
                alert("房間創建失敗，請重試！");
            }
            this.userName = this.userStore.userName;
            this.userId = this.userStore.userId;
            const user = await CreateUser(this.userId, this.userName);
            const response = await JoinRoom(roomId, user.userId, user.userName, this.password); // 創建者先加入房間
            this.roomStore.ROOM_ID = response.roomId;
        }
    }
};
</script>

<style scoped>
/* Add custom styling here */
</style>