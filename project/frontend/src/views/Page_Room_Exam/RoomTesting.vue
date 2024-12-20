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

    },

    async mounted() {
        this.socket = io(import.meta.env.VITE_API_BASE_URL);
    },

    watch: {

    },

    computed: {

    }
}
</script>

<style scoped></style>