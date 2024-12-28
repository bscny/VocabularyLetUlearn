<template>
    <Navbar />

    <div class="container">
        <div class="main-content">
            <SubmittedSets class="submitted-sets" v-if="renderFlag" :submittedSets="setsUsed"
                                                                    :availableSets="availableSets"
                                                                    @SubmitSet="AddSubmitSet($event)" />

            <ChatBox class="chat-box" v-if="renderFlag" :messages="messages"
                                                        :ROOM_ID="roomStore.ROOM_ID"
                                                        :Room_name="roomInfo.Room_name"
                                                        @AddNewMessage="AddNewMessage($event)" />

            <LobbyPlayerList class="lobby-player-list" v-if="renderFlag"    :players="players"
                                                                            :readyCount="readyCount"
                                                                            @ToggleReady="UpdateReadyCount($event)"
                                                                            @LeaveRoom="LeaveRoom()"
                                                                            @StartGame="StartGame()" />
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import SubmittedSets from '@/components/Room/SubmittedSets.vue';
import ChatBox from '@/components/Room/ChatBox.vue';
import LobbyPlayerList from '@/components/Room/LobbyPlayerList.vue';

import { io } from "socket.io-client";

import {
    GetInitRoom,
    GetPlayerInRoom,
    GetSetsInRoom,
    GetMessagesInRoom,
} from '@/services/Room_API/roomAPI';

import {
    getSetsByUserID,
} from '@/services/User_Inventory_API/setAPI.js'

import {
    useRoomStore,
} from "@/stores/Room/RoomStore.js";
import { LeaveRoom } from '@/services/Create_Join_Room_API/roomAPI';

export default {
    name: 'Room',
    components: {
        Navbar,
        SubmittedSets,
        ChatBox,
        LobbyPlayerList,
    },

    data() {
        return {
            roomStore: useRoomStore(),
            USER_ID: JSON.parse(localStorage.getItem("USER_ID")),
            User_name: JSON.parse(localStorage.getItem("name")),

            socket: io(import.meta.env.VITE_API_BASE_URL),

            roomInfo: null,
            messages: [],
            setsUsed: [],
            players: [],

            availableSets: [],

            readyCount: 0,

            renderFlag: false,
        };
    },
    
    async created() {
        await this.FetchData();
        await this.GetAvailableSets();

        this.renderFlag = true;

        this.socket.emit("join-room", this.roomStore.ROOM_ID);
        
        // dealing with all socket listened events:
        // other user just join the room!
        this.socket.on("update-player-list", async () => {
            this.players = await GetPlayerInRoom(this.roomStore.ROOM_ID);
        });

        // other player just toggle the ready button!
        this.socket.on("set-ready-count", async (val) => {
            this.readyCount = val;
        });

        // other player just send amsg to chat box
        this.socket.on("update-chat-message", async () => {
            this.messages = await GetMessagesInRoom(this.roomStore.ROOM_ID);
        });

        // other player just submitted a set
        this.socket.on("update-used-sets", async () => {
            this.setsUsed = await GetSetsInRoom(this.roomStore.ROOM_ID);
        })
    },

    methods: {
        async FetchData() {
            if(localStorage.getItem("ROOM_ID") == undefined){
                return;
            }

            this.roomStore.ROOM_ID = JSON.parse(localStorage.getItem("ROOM_ID"));

            // get data from backend (redis) to know current room info
            this.roomInfo = await GetInitRoom(this.roomStore.ROOM_ID);
            this.players = await GetPlayerInRoom(this.roomStore.ROOM_ID);
            this.setsUsed = await GetSetsInRoom(this.roomStore.ROOM_ID);
            this.messages = await GetMessagesInRoom(this.roomStore.ROOM_ID);
        },

        async GetAvailableSets(){
            this.availableSets = await getSetsByUserID(this.USER_ID);
        },

        AddSubmitSet(newSet){
            // first, add set to sender's own array
            const newSetUsed = {
                Set_id: newSet.SET_ID,
                Set_name: newSet.Set_name,
            };

            this.setsUsed.push(newSetUsed);

            // then broadcast to other player to fetch data from the updated redis db
            this.socket.emit("submit-set", this.roomStore.ROOM_ID, newSetUsed);
        },

        AddNewMessage(newMsg){
            // first, add message to sender's own array
            const newChatMessage = {
                User_id: this.USER_ID,
                User_name: this.User_name,
                Content: newMsg
            }
            this.messages.push(newChatMessage);

            // then broadcast to other player to fetch data from the updated redis db
            this.socket.emit("send-chat-message", this.roomStore.ROOM_ID, newChatMessage);
        },

        UpdateReadyCount(val){
            if(val){
                // user just toggle to ready
                this.readyCount ++;
            }else{
                this.readyCount --;
            }

            // call socket to broadcast the new ready count
            this.socket.emit("update-ready-count", this.readyCount, this.roomStore.ROOM_ID, this.USER_ID);
        },

        LeaveRoom(){
            // broadcast to every that i'm leaving
            this.socket.emit("leave-room", this.roomStore.ROOM_ID, this.USER_ID, () => {
                // using call back to remove related variablesin frontend
                // since web connection takes latency

                // delete room related variables
                localStorage.removeItem('ROOM_ID');
                this.roomStore.ROOM_ID = null;
    
                this.$router.push({
                    name: 'HomeLoggedIn'
                });
            });
        },

        StartGame(){

        }
    },
};
</script>

<style scoped>
.container {
    font-family: Arial, sans-serif;
    margin: 0 auto;
    margin-top: 50px;
    max-width: 1200px;
    height: calc(100vh - 60px);
    /* 填滿整個視窗，扣除 Navbar 高度 */
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
}

.main-content {
    display: grid;
    grid-template-columns: 1fr 2fr;
    /* 調整左2份，右1份寬度 */
    grid-template-rows: 1fr 1fr;
    /* 第一行自動高度，第二行填滿剩餘空間 */
    gap: 20px;
    /* 區塊間距 */
    margin-top: 20px;
    /* 上方間距 */
    flex: 1;
    /* 填滿剩餘高度 */
}

.submitted-sets {
    grid-column: 1 / 2;
    /* 左側第一列 */
    grid-row: 2 / 3;
    /* 第一行 */
    background-color: #e6f7ff;
    padding: 20px;
    border: 1px solid #b3d8ff;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.lobby-player-list {
    grid-column: 1 / 2;
    /* 移到左側第一列 */
    grid-row: 1 / 2;
    /* 第二行 */
    background-color: #f5f5f5;
    padding: 20px;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    overflow-y: auto;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    height: 100%;
    /* 填滿高度 */
}

.chat-box {
    grid-column: 2 / 3;
    /* 移到右側第二列 */
    grid-row: 1 / 3;
    /* 占滿第一、二行 */
    background-color: #fffae6;
    padding: 20px;
    border: 1px solid #ffd591;
    border-radius: 10px;
    overflow-y: auto;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    height: 100%;
    /* 填滿高度 */
}

@media (max-width: 768px) {
    .main-content {
        grid-template-columns: 1fr;
        /* 單欄佈局 */
        grid-template-rows: auto;
        /* 自動高度 */
    }

    .submitted-sets,
    .chat-box,
    .lobby-player-list {
        grid-column: 1 / 2;
        grid-row: auto;
    }
}
</style>
