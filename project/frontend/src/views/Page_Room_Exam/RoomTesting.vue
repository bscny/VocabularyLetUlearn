<template>
    <Navbar 
            :isLoggedIn="isLoggedIn" 
            :userName="userName"
            :userEmail="userEmail" 
            @toggleLoginModal="showLoginModal = true" 
            @toggleRegisterModal="showRegisterModal = true" 
            @logout="logout()" 
    />
</template>

<script>
import Navbar from "@/components/Navbar.vue";

import {
    GetTestSheet,
} from "@/services/Room_Exam_API/testingAPI.js"

export default {
    name: 'RoomTesting',
    components: {
        Navbar,
    },

    data() {
        return {
            testSheet: null,
        };
    },

    methods: {
        
    },

    async created() {
        // get the current Room_id from pinia store
        // fake data:
        let curRoomID = 1;

        // get test sheet
        this.testSheet = await GetTestSheet(curRoomID);
    },

    async mounted() {

    },

    watch: {

    },

    computed: {

    },


    beforeUnmount() {

    },
}
</script>

<style scoped></style>