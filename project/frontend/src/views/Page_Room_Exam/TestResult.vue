<template>
    <Navbar />

    <main class="blocks">
        <Header />

        <Summary />

        <DisplayResult />
    </main>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Header from '@/components/Room_Exam/Result/Header.vue';
import Summary from '@/components/Room_Exam/Result/Summary.vue';
import DisplayResult from '@/components/Room_Exam/Result/DisplayResult.vue';

import { io } from 'socket.io-client'

export default {
    name: 'TestResult',
    components: {
        Navbar,
        Header,
        Summary,
        DisplayResult,
    },

    data() {
        return {
            testObj: null,
            socket: null,
        };
    },

    methods: {

    },

    async created() {
        // optional--------------------------------------------------------
        // this.socket = io(import.meta.env.VITE_API_BASE_URL);

        // // get the current Room_id from pinia store
        // // fake data:
        // let curRoomID = 1;

        // // re-join this socket
        // await this.socket.emit("join-room-exam", curRoomID);

        // // send request to get the test sheet
        // this.testObj = await new Promise((resolve, reject) => {
        //     this.socket.on("send-testsheet", (obj) => {
        //         resolve(obj);
        //     });
        // });

        // console.error(this.testObj);-------------------------------------

    },

    async mounted() {

    },

    watch: {

    },

    computed: {

    },


    beforeUnmount() {
        // Disconnect the socket when the component is destroyed
        this.socket.disconnect();
    },
}
</script>

<style scoped>
.blocks{
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: start;

    margin-top: 10vh;

    width: 100vw;
}
</style>