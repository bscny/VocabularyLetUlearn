<template>
    <Navbar />

    <main class="blocks">
        <Header :showingWrong="showingWrong"
                @ToggleShowWrong="ToggleShowWrong()"
                @RetakeTest="RetakeTest()" />

        <Summary v-if="testResult.length > 0"   :testResult="testResult" />

        <DisplayResult v-if="testResult.length > 0" :testResult="testResult"
                                                    :showingWrong="showingWrong" />
    </main>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import Header from '@/components/Room_Exam/Result/Header.vue';
import Summary from '@/components/Room_Exam/Result/Summary.vue';
import DisplayResult from '@/components/Room_Exam/Result/DisplayResult.vue';

import { io } from 'socket.io-client';
import {
    GetTestResult,
} from "@/services/Room_Exam_API/testResultAPI.js"

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

            testResult: [],
            showingWrong: false,
        };
    },

    methods: {
        ToggleShowWrong(){
            this.showingWrong = !this.showingWrong;
        },

        RetakeTest(){
            this.$router.push({
                name: "RoomTesting"
            });
        }
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

        // get test result from backend API
        this.testResult = await GetTestResult(JSON.parse(localStorage.getItem("USER_ID")));
    },

    async mounted() {

    },

    watch: {

    },

    computed: {

    },


    beforeUnmount() {
        // Disconnect the socket when the component is destroyed
        // this.socket.disconnect();
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