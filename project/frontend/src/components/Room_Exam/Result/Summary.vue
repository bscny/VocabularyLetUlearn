<template>
    <div class="summary-flexbox">
        <div class="statistic">
            <div class="info">
                Correct Answer: {{ correctNum }}
            </div>

            <div class="info">
                Wrong Answer: {{ wrongNum }}
            </div>

            <div class="info">
                Correct Rate: {{ correctPercentage * 100 }} %
            </div>
        </div>
    </div>
</template>

<script>

export default{
    name: 'Summary',
    components: {

    },

    props: {
        testResult: Array,
    },
    
    data(){
        return{
            correctNum: 0,
            wrongNum: 0,
            correctPercentage: 0,
        };
    },

    methods: {

    },

    created(){
        for(let i = 0; i < this.testResult.length; i ++){
            if(this.testResult[i].Is_correct == true){
                this.correctNum ++;
            }else{
                this.wrongNum ++;
            }
        }

        this.correctPercentage = this.correctNum / this.testResult.length;
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
.summary-flexbox {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: start;

    width: 80vw;
    min-height: 10vh;
    margin-top: 3vh;
    margin-bottom: 3vh;

    background-color: gray;
    border-radius: 10px;
}

.statistic {
    display: flex;

    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    width: 100%;
}

.info {
    font-size: 1.5vw;
}
</style>