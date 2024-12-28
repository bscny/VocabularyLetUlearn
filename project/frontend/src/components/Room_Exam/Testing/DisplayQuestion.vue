<template>
    <div class="q-num">
        {{ testSheet[curDisplaying - 1].Question_number }}
    </div>

    <div class="container-flexbox">
        <div class="question">
            <div class="definition">
                Definition: {{ testSheet[curDisplaying - 1].Ans_definition }}
            </div>
    
            <div class="opton-grid">
                <div class="option" v-if="choseAns[curDisplaying - 1] != testSheet[curDisplaying - 1].OptionA" 
                                    @click="Choose(testSheet[curDisplaying - 1].OptionA)">
                    {{ testSheet[curDisplaying - 1].OptionA }}
                </div>
                <div class="option-border" v-else>
                    {{ testSheet[curDisplaying - 1].OptionA }}
                </div>
    
                <div class="option" v-if="choseAns[curDisplaying - 1] != testSheet[curDisplaying - 1].OptionB" 
                                    @click="Choose(testSheet[curDisplaying - 1].OptionB)">
                    {{ testSheet[curDisplaying - 1].OptionB }}
                </div>
                <div class="option-border" v-else>
                    {{ testSheet[curDisplaying - 1].OptionB }}
                </div>
    
                <div class="option" v-if="choseAns[curDisplaying - 1] != testSheet[curDisplaying - 1].OptionC" 
                                    @click="Choose(testSheet[curDisplaying - 1].OptionC)">
                    {{ testSheet[curDisplaying - 1].OptionC }}
                </div>
                <div class="option-border" v-else>
                    {{ testSheet[curDisplaying - 1].OptionC }}
                </div>
    
                <div class="option" v-if="choseAns[curDisplaying - 1] != testSheet[curDisplaying - 1].OptionD" 
                                    @click="Choose(testSheet[curDisplaying - 1].OptionD)">
                    {{ testSheet[curDisplaying - 1].OptionD }}
                </div>
                <div class="option-border" v-else>
                    {{ testSheet[curDisplaying - 1].OptionD }}
                </div>
            </div>
        </div>
    
        <div class="button-flexbox">
            <button class="prev-button" @click="PrevQuestion()">
                Prev
            </button>

            <button class="submit-button" v-if="canSubmitTest" @click="Submit()">
                Submit Test!
            </button>

            <button class="next-button" @click="NextQuestion()">
                Next
            </button>
        </div>
    </div>


</template>

<script>

export default{
    name: 'DisplayQuestion',
    components: {

    },

    props: {
        testSheet: Array,
        choseAns: Array,
        curDisplaying: Number,
        answeredQuestionNum: Number,
    },
    
    data(){
        return{
            canSubmitTest: false,
        };
    },

    methods: {
        NextQuestion(){
            this.$emit("NextQuestion");
        },

        PrevQuestion(){
            this.$emit("PrevQuestion");
        },

        Submit(){
            this.$emit("Submit");
        },

        Choose(chooseAns){
            this.$emit("Choose", chooseAns);
        }
    },

    created(){

    },

    async mounted(){

    },

    watch: {
        answeredQuestionNum(val){
            if(val == this.testSheet.length){
                this.canSubmitTest = true;
            }
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
    left: 8vw;

    font-size: 1.5vw;

    background-color: rgb(93, 66, 214);
    padding: 0 0.5vw;

    border-radius: 0.9vw;
}

.container-flexbox {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: start;

    width: 100vw;
}

.question {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    margin-top: 1.5vh;
    min-height: 75vh;
    width: 100vw;

    background-color: rgb(194, 194, 194);
}

.definition {
    font-size: 1.5vw;
    text-align: center;
    
    margin-bottom: 2vh;
    padding-top: 2vh;
    border-radius: 10px;

    width: 70vw;
    height: 40vh;

    background-color: #fbfaf8;
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
    border: 5px solid transparent;

    background-color: rgb(95, 95, 248);
}

.option:hover {
    cursor: pointer;
    background-color: rgb(112, 112, 243);
}

.option-border {
    font-size: 1.5vw;
    text-align: center;

    margin-top: 1vh;
    border-radius: 10px;
    border: 5px solid;
    border-color: green;
    
    background-color: blue;
}

.option-border:hover {
    cursor: pointer;
    background-color: rgb(73, 73, 241);
}

.button-flexbox {
    display: flex;

    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    margin-top: 1vh;

    width: 95%;
}

.next-button {
    /* position: fixed;

    right: 1vw;
    bottom: 3vh; */

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

.submit-button {
    padding: 1vh 1vw;
    background-color: #3efa3e;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 1.2vw;
}

.submit-button:hover {
    background-color: #62e68a;
}

.prev-button {
    /* margin-left: 5vw; */
    padding: 1vh 1vw;
    background-color: #3e4afa;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 1.2vw;
}

.prev-button:hover {
    background-color: #6276e6;
}
</style>