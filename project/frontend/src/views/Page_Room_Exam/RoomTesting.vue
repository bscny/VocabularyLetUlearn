<template>
    <Navbar />

    <Header :answeredQuestionNum="answeredQuestionNum" 
            :totalQuestionNum="totalQuestionNum" />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Header from "@/components/Room_Exam/Testing/Header.vue";

import {
    GetTestSheet,
} from "@/services/Room_Exam_API/testingAPI.js"

export default {
    name: 'RoomTesting',
    components: {
        Navbar,
        Header,
    },

    data() {
        return {
            testSheet: [],
            answeredQuestionNum: 0,
            totalQuestionNum: 0,

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
        this.totalQuestionNum = this.testSheet.length;
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