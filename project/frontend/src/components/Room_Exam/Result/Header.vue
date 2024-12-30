<template>
    <button class="retake-button" @click="RetakeTest()">
        Retake Test
    </button>

    <button class="back-button" @click="BackToRoom()">
        Back To Room
    </button>

    <div class="text">
        Test Result
    </div>

    <button v-if="!showingWrong" class="toggle-wrong-button" @click="ToggleShowWrong()">
        Show Wrong
    </button>
    <button v-else class="toggle-wrong-button" @click="ToggleShowWrong()">
        Show All
    </button>
</template>

<script>

export default{
    name: 'Header',
    components: {

    },

    props: {
        showingWrong: Boolean,
    },
    
    data(){
        return{

        };
    },

    methods: {
        ToggleShowWrong(){
            this.$emit("ToggleShowWrong");
        },

        RetakeTest(){
            this.$emit("RetakeTest");
        },

        BackToRoom(){
            this.$emit("BackToRoom");
        }
    },

    async created(){

    },

    async mounted(){

    },

    watch: {

    },

    computed: {
        
    }
}
</script>

<style scoped>
.retake-button {
    position: absolute;

    right: 1vw;
    top: 11vh;

    padding: 1vh 1vw;
    background-color: #3600f8;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 1.2vw;
}

.retake-button:hover {
    background-color: #6f3de4;
}

.back-button {
    position: absolute;

    left: 1vw;
    top: 11vh;

    padding: 1vh 1vw;
    background-color: #f80000;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 1.2vw;
}

.back-button:hover {
    background-color: #e43d3d;
}

.header-flexbox {
    display: flex;

    flex-direction: row;
    align-items: center;
    justify-content: center;

    padding-top: 2vh;
    margin-bottom: 2vh;
}

.text {
    display: inline;
    font-size: 2.5vw;
    text-align: center;

    margin-bottom: 1vh;
}

.toggle-wrong-button {
    /* position: absolute;
    top: 12.5vh;
    left: 60vw; */
    padding: 1vh 1vw;
    background-color: #00b2f8;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 1.2vw;
}

.toggle-wrong-button:hover {
    background-color: #3dcbe4;
}
</style>