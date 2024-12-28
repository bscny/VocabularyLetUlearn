<template>
    <div class="chat-box">
        <h3>Room ID : {{ userStore.room }}</h3>
        <div class="message-list" ref="chatContainer">
            <ul>
                <li v-for="(msg, index) in messages" :key="index"
                    :class="{ self: msg.User_name === userStore.User_name, other: msg.User_name !== userStore.User_name }">
                    <strong>{{ msg.User_name }}:</strong> {{ msg.Content }}
                </li>
            </ul>
        </div>
        <div class="message-input">
            <input v-model="newMessage" type="text" placeholder="Send a message..." @keyup.enter="sendMessage" />
            <button @click="sendMessage">Send</button>
        </div>
    </div>
</template>

<script>
import { ref, nextTick } from "vue";
import socketAPI from "@/services/Room_API/socketAPI";
import { useUserStore } from "@/stores/Room/userStore";

export default {
    data(){
        return{
            userStore: useUserStore(),
            messages: [],
            newMessage: "",
        };
    },

    methods: {
        async sendMessage(){
            if (this.newMessage != "") {
                // fake data:
                const messageData = {
                    room: 1,
                    User_id: JSON.parse(localStorage.getItem("USER_ID")),
                    User_name: JSON.parse(localStorage.getItem("name")),
                    Content: this.newMessage,
                };

                const newMessage = { 
                    User_id: JSON.parse(localStorage.getItem("USER_ID")),
                    User_name: JSON.parse(localStorage.getItem("name")),
                    Content: this.newMessage,
                };
        
                try {
                    await socketAPI.sendMessage(messageData);

                    // add new msg to sender's own array
                    this.messages.push(newMessage);

                    console.log("Message sent successfully");
                } catch (error) {
                    console.error("Error sending message:", error.message);
                }
        
                this.newMessage = ""; // 清空輸入框 
            } else {
                console.log("No message to send.");
            }
        },

        scrollToBottom(){
            const chatContainer = document.querySelector(".message-list");
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        },
    },

    async created() {
        socketAPI.onMessage((msg) => {
            this.messages.push(msg);
            nextTick(() => this.scrollToBottom());
        });
    },
};
</script>

<style scoped>
.chat-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    max-height: 630px;
    overflow-y: auto;
    background-color: #fffbe6;
    border: 1px solid #ffecb3;
    border-radius: 10px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    padding: 15px;
    box-sizing: border-box;
}

h3 {
    margin-top: 0;
    text-align: center;
}

.message-list {
    flex: 1;
    overflow-y: auto;
    background-color: #fdfdfd;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #e6e6e6;
    list-style: none;
}

.message-list li {
    width: fit-content;
    padding: 8px 12px;
    margin: 5px 0;
    border-radius: 8px;
    max-width: 60%;
    word-wrap: break-word;
    list-style: none;
}

.message-list li.self {
    background-color: #dcf8c6;
    text-align: right;
    margin-left: auto;
}

.message-list li.other {
    background-color: #f1f0f0;
    text-align: left;
    margin-right: auto;
}

.message-input {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.message-input input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
}

.message-input button {
    padding: 10px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.message-input button:hover {
    background-color: #0056b3;
}
</style>
