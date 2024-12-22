<template>
    <div class="header">
        <div class="info">
            Total Answered: {{ answeredQuestionNum }} / {{ totalQuestionNum }}
        </div>
    </div>
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

    margin-top: 10vh;
}
</style>