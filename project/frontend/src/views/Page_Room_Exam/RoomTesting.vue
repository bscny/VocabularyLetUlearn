<template>

</template>

<script>
import { io } from 'socket.io-client'

export default {
    name: 'RoomTesting',
    components: {

    },

    data() {
        return {
            socket: null,
        };
    },

    methods: {

    },

    async created() {
        this.socket = io(import.meta.env.VITE_API_BASE_URL);

        // get the current Room_id from pinia store

        // re-join this socket

        // send request to get the test sheet

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

<style scoped></style>