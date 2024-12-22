<template>
    <Navbar />
    
    <LeftBar    :totalQuestionNum="totalQuestionNum" 
                @SelectQuestion="DisplaySelectedQuestion($event)" />
    
    <Header :answeredQuestionNum="answeredQuestionNum" 
            :totalQuestionNum="totalQuestionNum" />

    <DisplayQuestion    :displayQuestion="testSheet[curDisplaying - 1]" />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Header from "@/components/Room_Exam/Testing/Header.vue";
import LeftBar from "@/components/Room_Exam/Testing/LeftBar.vue";
import DisplayQuestion from "@/components/Room_Exam/Testing/DisplayQuestion.vue";

import {
    GetTestSheet,
} from "@/services/Room_Exam_API/testingAPI.js"

export default {
    name: 'RoomTesting',
    components: {
        Navbar,
        Header,
        LeftBar,
        DisplayQuestion,
    },

    data() {
        return {
            testSheet: [],
            answeredQuestionNum: 0,
            totalQuestionNum: 0,

            curDisplaying: 1,
        };
    },

    methods: {
        DisplaySelectedQuestion(qNum){
            this.curDisplaying = qNum;
        },
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

<style scoped>
.main{
    margin: 10vh 0 0 6vh;
}
</style>