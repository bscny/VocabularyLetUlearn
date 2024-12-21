<template>

</template>

<script>
import { io } from 'socket.io-client'

export default {
    name: 'TestResult',
    components: {

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
        this.socket = io(import.meta.env.VITE_API_BASE_URL);

        // get the current Room_id from pinia store
        // fake data:
        let curRoomID = 1;

        // re-join this socket
        await this.socket.emit("join-room-exam", curRoomID);

        // send request to get the test sheet
        this.testObj = await new Promise((resolve, reject) => {
            this.socket.on("send-testsheet", (obj) => {
                resolve(obj);
            });
        });

        console.error(this.testObj);

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

</style>