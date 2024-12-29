<template>
    <div class="header">
        <div class="info">
            Total Answered: {{ answeredQuestionNum }} / {{ totalQuestionNum }}
        </div>
    </div>

    <button class="exit-button" @click="GoHomePage()">
        Exit Test
    </button>
</template>

<script>

export default{
    name: 'Header',
    components: {

    },

    props: {
        answeredQuestionNum: Number,
        totalQuestionNum: Number,
    },
    
    data(){
        return{
            
        };
    },

    methods: {
        GoHomePage(){
            this.$router.push({
                name: 'Room'
            });
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
.header {
    display: flex;

    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin-top: 12vh;
}

.info {
    font-size: 1.4vw;
}

.exit-button {
    position: absolute;

    right: 1vw;
    top: 11vh;

    padding: 1vh 1vw;
    background-color: #ff0000;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 1.2vw;
}

.exit-button:hover {
    background-color: #e43d3d;
}
</style>