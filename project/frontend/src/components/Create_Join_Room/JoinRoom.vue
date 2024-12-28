<template>
    <div class="join-room">
        <h2>加入房間</h2>
        <form @submit.prevent="joinRoom">
            <div>
                <label for="roomId">房間 ID：</label>
                <input type="text" v-model="roomId" required />
            </div>
            <div>
                <label for="password">密碼：</label>
                <input type="password" v-model="password" />
            </div>
            <button type="submit">加入房間</button>
        </form>
    </div>
</template>

<script>
import {
    JoinRoom
} from '@/services/Create_Join_Room_API/roomAPI.js';
import {
    CreateUser
} from '@/services/Create_Join_Room_API/userAPI.js';

import { useRoomStore } from '@/stores/Room/RoomStore';
import { useUserStore } from '@/stores/User/userStore.js';

export default {
    data() {
        return {
            roomId: '',
            userId: '',
            userName: '',
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
        async joinRoom() {
            this.userName = this.userStore.userName;
            this.userId = this.userStore.userId;

            const user = await CreateUser(this.userId, this.userName);
            try {
                const response = await JoinRoom(this.roomId, user.userId, user.userName, this.password);
                this.roomStore.ROOM_ID = response.roomId;
                console.error("加入房間成功：", response);
                alert("成功加入房間");
                this.$emit("joinDone"); // 通知父組件
            } catch (error) {
                console.error("加入房間失敗：", error.message);
                alert("加入房間失敗，請重試！");
            }
        }
    }
};
</script>

<style scoped>
/* Add custom styling here */
</style>