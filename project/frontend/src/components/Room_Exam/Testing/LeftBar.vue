<template>
    <nav class="side-bar">
        <div class="q-num" v-for="i in totalQuestionNum" :key="i"  @click="SelectQuestion(i)">
            {{ i }}
        </div>
    </nav>
</template>

<script>

export default{
    name: 'LeftBar',
    components: {

    },

    props: {
        totalQuestionNum: Number,
    },
    
    data(){
        return{
            
        };
    },

    methods: {
        SelectQuestion(qNum){
            this.$emit("SelectQuestion", qNum);
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
.side-bar {
    position: absolute;

    top: 10vh;
    left: 0;
    
    display: flex;

    flex-direction: column;
    align-items: start;
    justify-content: start;

    background-color: gray;
    padding-top: 1vh;

    min-height: 90vh;
    width: 6vw;
}

.q-num {
    margin-left: 1vw;
    margin-bottom: 1.5vh;
    font-size: 1.4vw;
}

.q-num:hover {
    cursor: pointer;
    background-color: rgb(107, 107, 107);
}
</style>