<template>
    <Navbar />

    <LeftBar    :totalQuestionNum="totalQuestionNum" 
                @SelectQuestion="DisplaySelectedQuestion($event)" />

    <Header :answeredQuestionNum="answeredQuestionNum" 
            :totalQuestionNum="totalQuestionNum" />

    <DisplayQuestion v-if="testSheet.length > 0"    :testSheet="testSheet" 
                                                    :curDisplaying="curDisplaying"
                                                    :answeredQuestionNum="answeredQuestionNum" 
                                                    :choseAns="choseAns" 
                                                    @NextQuestion="NextQuestion()"
                                                    @PrevQuestion="PrevQuestion()"
                                                    @Submit="Submit()"
                                                    @Choose="Choose($event)" />
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Header from "@/components/Room_Exam/Testing/Header.vue";
import LeftBar from "@/components/Room_Exam/Testing/LeftBar.vue";
import DisplayQuestion from "@/components/Room_Exam/Testing/DisplayQuestion.vue";

import {
    GetTestSheet,
    SubmitTestSheet,
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
            curRoomID: JSON.parse(localStorage.getItem("ROOM_ID")),

            testSheet: [],
            choseAns: [],
            answeredQuestionNum: 0,
            totalQuestionNum: 0,

            curDisplaying: 1,
        };
    },

    methods: {
        DisplaySelectedQuestion(qNum) {
            this.curDisplaying = qNum;
        },

        NextQuestion() {
            if (this.curDisplaying < this.testSheet.length) {
                this.curDisplaying++;
            }
        },

        PrevQuestion(){
            if (this.curDisplaying > 1) {
                this.curDisplaying--;
            }
        },

        async Submit(){
            let ansSheet = {
                USER_ID: JSON.parse(localStorage.getItem("USER_ID")),
                User_name: JSON.parse(localStorage.getItem("name")),
                In_room_id: this.curRoomID,
                Chose_ans: this.choseAns
            }

            // set result to redis using backend API
            let ret = await SubmitTestSheet(ansSheet);
            if(ret){
                alert("Submit Successfully!");
                this.$router.push({
                    name: "TestResult"
                });
            }else{
                alert("Submit Failed, try again");
            }
        },

        Choose(chooseAns) {
            if (this.choseAns[this.curDisplaying - 1] === undefined) {
                // the first time submit ananswer for this question
                this.answeredQuestionNum++;
            }

            // make sure the child can detect this change
            this.choseAns = [
                ...this.choseAns.slice(0, this.curDisplaying - 1),
                chooseAns,
                ...this.choseAns.slice(this.curDisplaying),
            ];
        }
    },

    async created() {
        // get the current Room_id from pinia store
        // fake data:
        if (this.curRoomID == undefined) {
            this.$router.push({
                name: 'HomeLoggedIn'
            });
        }

        // get test sheet from backend API
        this.testSheet = await GetTestSheet(this.curRoomID);
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
.main {
    margin: 10vh 0 0 6vh;
}
</style>