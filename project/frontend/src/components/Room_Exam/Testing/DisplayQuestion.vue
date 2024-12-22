<template>
    <div class="q-num" v-if="_displayQuestion !== undefined">
        {{ _displayQuestion.Ans_definition }}
    </div>

    <div class="question" v-if="_displayQuestion !== undefined">
        <div class="definition">
            {{ _displayQuestion.Ans_definition }}
        </div>

        <div class="opton-grid">
            <div class="option-border">
                {{ _displayQuestion.OptionA }}
            </div>

            <div class="option">
                {{ _displayQuestion.OptionB }}
            </div>

            <div class="option">
                {{ _displayQuestion.OptionC }}
            </div>

            <div class="option">
                {{ _displayQuestion.OptionD }}
            </div>
        </div>
    </div>

    <button class="next-button" v-if="_displayQuestion !== undefined">
        Next
    </button>
</template>

<script>

export default{
    name: 'DisplayQuestion',
    components: {

    },

    props: {
        displayQuestion: Object,
    },
    
    data(){
        return{
            _displayQuestion: this.displayQuestion,
        };
    },

    methods: {

    },

    async created(){

    },

    async mounted(){

    },

    watch: {
        _displayQuestion(val){
            console.error(val);
        }
    },

    computed: {
        
    }
}
</script>

<style scoped>
.q-num {
    position: absolute;

    top: 18vh;
    left: 10vw;

    font-size: 1.5vw;

    background-color: rgb(93, 66, 214);
    padding: 0 0.5vw;

    border-radius: 0.9vw;
}
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
    text-align: center;
    
    margin-bottom: 2vh;
    border-radius: 10px;

    width: 70vw;
    height: 40vh;

    background-color: aqua;
}

.opton-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;

    align-items: center;
    justify-content: center;

    width: 80%;
    grid-gap: 1vw 1vh;
}

.option {
    font-size: 1.5vw;
    text-align: center;

    margin-top: 1vh;
    border-radius: 10px;

    background-color: blue;
}

.option:hover {
    cursor: pointer;
    background-color: rgb(73, 73, 241);
}

.option-border {
    font-size: 1.5vw;
    text-align: center;

    margin-top: 1vh;
    border-radius: 10px;
    
    background-color: blue;
}

.option-border:hover {
    /* border-style: solid; */
    border-width: 2px;
    border-color: green;
    cursor: pointer;
    background-color: rgb(73, 73, 241);
}

.border {
    border-style: solid;
}

.next-button {
    position: fixed;

    right: 1vw;
    bottom: 5vh;

    padding: 1vh 1vw;
    background-color: #3e4afa;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 1.2vw;
}

.next-button:hover {
    background-color: #6276e6;
}
</style>