<template>
     <h2 class="category">加入房間</h2>
    <form @submit.prevent="joinRoom">
        <div>
            <label class="body-text" for="roomId">房間 ID：</label>
            <input class="body-text" type="number" v-model="roomId" required />
        </div>
        <div>
            <label class="body-text" for="password">密碼：</label>
            <input class="body-text" type="password" v-model="password" />
        </div>
        <button class="submit-button" type="submit">加入房間</button>
    </form>
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
            roomId: null,
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
                localStorage.setItem("ROOM_ID", JSON.stringify(response.roomId));
                alert("成功加入房間");
                this.$router.push({
                    name: 'Room'
                });
            } catch (error) {
                alert("加入房間失敗，請重試！");
            }
        }
    }
};
</script>

<style scoped>
.category {
    font-size: 2vw;
}

.body-text {
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