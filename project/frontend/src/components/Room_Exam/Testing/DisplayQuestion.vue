<template>
    <div class="question">
        <div class="definition">
            {{ displayQnum }}
        </div>

        <div class="opton-grid">
            <div class="option" v-for="i in 4" :key="i">
                {{ displayQnum }}
            </div>
        </div>
    </div>
</template>

<script>

export default{
    name: 'DisplayQuestion',
    components: {

    },

    props: {
        displayQnum: Number,
    },
    
    data(){
        return{
            
        };
    },

    methods: {

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
.question {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: start;

    margin-top: 1.5vh;

    background-color: rgb(194, 194, 194);
}

.definition {
    font-size: 1.5vw;
    
    margin-bottom: 2vh;

    min-width: 70vw;
    min-height: 40vh;

    background-color: aqua;
}

.opton-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;

    width: 80%;

    background-color: blue;
}

.option {
    font-size: 1.5vw;

    margin-top: 1vh;
}
</style>