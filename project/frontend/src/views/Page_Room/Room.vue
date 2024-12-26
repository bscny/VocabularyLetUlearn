<template>
  <!-- Navbar -->
  <Navbar 
    :isLoggedIn="isLoggedIn" 
    :userName="userName"
    :userEmail="userEmail" 
    @toggleLoginModal="showLoginModal = true" 
    @toggleRegisterModal="showRegisterModal = true" 
    @logout="logout" 
  />

  <div class="container">
    <div class="main-content">
      <SubmittedSets class="submitted-sets" />
      <ChatBox class="chat-box" />
      <LobbyPlayerList class="lobby-player-list" />

      <div class="ready-button">
        <ReadyButton />
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import SubmittedSets from '@/components/Room/SubmittedSets.vue';
import ChatBox from '@/components/Room/ChatBox.vue';
import LobbyPlayerList from '@/components/Room/LobbyPlayerList.vue';
import socketAPI from '@/services/Room_API/socketAPI';
import { useUserStore } from "@/stores/Room/userStore";

export default {
  name: 'Room',
  components: {
    Navbar,
    SubmittedSets,
    ChatBox,
    LobbyPlayerList,
  },
  setup() {
  const userStore = useUserStore();

  socketAPI.initRoom((roomData) => {
    userStore.setRoom(roomData.room);
    console.log("Room initialized:", roomData.room);

    socketAPI.initUser((userData) => {
      userStore.setUser(userData);
      console.log("User initialized:", userData);

      socketAPI.joinRoom(userStore.room);
    });
  });
  
  return { userStore };
  },
  methods: {
    logout() {
      alert("Logged out successfully!");
    },
  },
};
</script>

<style scoped>

.container {
  font-family: Arial, sans-serif;
  margin: 0 auto;
  margin-top: 50px;
  max-width: 1200px;
  height: calc(100vh - 60px); /* 填滿整個視窗，扣除 Navbar 高度 */
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 2fr; /* 調整左2份，右1份寬度 */
  grid-template-rows: 1fr 1fr;   /* 第一行自動高度，第二行填滿剩餘空間 */
  gap: 20px;                     /* 區塊間距 */
  margin-top: 20px;              /* 上方間距 */
  flex: 1; /* 填滿剩餘高度 */
}

.submitted-sets {
  grid-column: 1 / 2;  /* 左側第一列 */
  grid-row: 2 / 3;     /* 第一行 */
  background-color: #e6f7ff;
  padding: 20px;
  border: 1px solid #b3d8ff;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.lobby-player-list {
  grid-column: 1 / 2; /* 移到左側第一列 */
  grid-row: 1 / 2;    /* 第二行 */
  background-color: #f5f5f5;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  overflow-y: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  height: 100%; /* 填滿高度 */
}

.chat-box {
  grid-column: 2 / 3; /* 移到右側第二列 */
  grid-row: 1 / 3;    /* 占滿第一、二行 */
  background-color: #fffae6;
  padding: 20px;
  border: 1px solid #ffd591;
  border-radius: 10px;
  overflow-y: auto;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  height: 100%; /* 填滿高度 */
}


@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr; /* 單欄佈局 */
    grid-template-rows: auto;   /* 自動高度 */
  }

  .submitted-sets,
  .chat-box,
  .lobby-player-list {
    grid-column: 1 / 2;
    grid-row: auto;
  }
}
</style>
