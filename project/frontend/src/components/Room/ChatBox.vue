<template>
    <div class="chat-box">
        <h3>Room ID : {{ ROOM_ID }}</h3>
        <div class="message-list" ref="chatContainer">
            <ul v-if="messages.length > 0">
                <li v-for="(msg, index) in messages" :key="index"
                    :class="{ self: msg.User_id === USER_ID, other: msg.User_id !== USER_ID }">
                    <strong>{{ msg.User_name }}:</strong> {{ msg.Content }}
                </li>
            </ul>
        </div>
        <div class="message-input">
            <input v-model="newMessage" type="text" placeholder="Send a message..." @keyup.enter="SendMessage" />
            <button @click="SendMessage">Send</button>
        </div>
    </div>
</template>

<script>

export default {
    name: "ChatBox",
    
    data(){
        return{
            newMessage: "",

            USER_ID: JSON.parse(localStorage.getItem("USER_ID")),
        };
    },

    props: {
        ROOM_ID: Number,
        messages: Array,
    },

    methods: {
        async SendMessage(){
            if (this.newMessage != "") {
                this.$emit("AddNewMessage", this.newMessage);
                
                this.newMessage = ""; // 清空輸入框 
            }
        },

        scrollToBottom(){
            const chatContainer = this.$refs.chatContainer;
            if (chatContainer) {
                chatContainer.scrollTop = chatContainer.scrollHeight;
            }
        },
    },

    mounted(){
        this.scrollToBottom();
    },

    watch: {
        // Watch for changes in the messages prop and scroll to the bottom
        messages: {
            handler() {
                this.$nextTick(() => {
                    this.scrollToBottom();
                });
            },
            deep: true, // Ensure nested changes in messages are detected
        },
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
