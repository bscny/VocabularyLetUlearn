<template>
    <div class="content">
        <div class="question-bg" v-for="i in testResult.length" :key="i">
            <div class="question" v-if="!showingWrong || showingWrong == !testResult[i - 1].Is_correct">
                <div class="definition-container">
                    <div class="definition">
                        Definition: {{ testResult[i - 1].Ans_definition }}
                    </div>
                    <div class="q-num-inline">
                        {{ testResult[i - 1].Question_number }}
                    </div>
                </div>
    
                <div class="opton-grid">
                    <div class="option-border-correct" v-if="testResult[i - 1].Correct_ans == testResult[i - 1].OptionA">
                        {{ testResult[i - 1].OptionA }}
                    </div>
                    <div class="option-border-wrong" v-else-if="testResult[i - 1].Choosed_ans == testResult[i - 1].OptionA && !testResult[i - 1].Is_correct">
                        {{ testResult[i - 1].OptionA }}
                    </div>
                    <div class="option" v-else>
                        {{ testResult[i - 1].OptionA }}
                    </div>
    
                    <div class="option-border-correct" v-if="testResult[i - 1].Correct_ans == testResult[i - 1].OptionB">
                        {{ testResult[i - 1].OptionB }}
                    </div>
                    <div class="option-border-wrong" v-else-if="testResult[i - 1].Choosed_ans == testResult[i - 1].OptionB && !testResult[i - 1].Is_correct">
                        {{ testResult[i - 1].OptionB }}
                    </div>
                    <div class="option" v-else>
                        {{ testResult[i - 1].OptionB }}
                    </div>
    
                    <div class="option-border-correct" v-if="testResult[i - 1].Correct_ans == testResult[i - 1].OptionC">
                        {{ testResult[i - 1].OptionC }}
                    </div>
                    <div class="option-border-wrong" v-else-if="testResult[i - 1].Choosed_ans == testResult[i - 1].OptionC && !testResult[i - 1].Is_correct">
                        {{ testResult[i - 1].OptionC }}
                    </div>
                    <div class="option" v-else>
                        {{ testResult[i - 1].OptionC }}
                    </div>
    
                    <div class="option-border-correct" v-if="testResult[i - 1].Correct_ans == testResult[i - 1].OptionD">
                        {{ testResult[i - 1].OptionD }}
                    </div>
                    <div class="option-border-wrong" v-else-if="testResult[i - 1].Choosed_ans == testResult[i - 1].OptionD && !testResult[i - 1].Is_correct">
                        {{ testResult[i - 1].OptionD }}
                    </div>
                    <div class="option" v-else>
                        {{ testResult[i - 1].OptionD }}
                    </div>
                </div>
    
                <div class="sentence">
                    Example Sentence: {{ testResult[i - 1].Sentence }}
                </div>
            </div>
        </div>    
    </div>
</template>

<script>

export default {
    name: 'DisplayResult',
    components: {

    },

    props: {
        testResult: Array,
        showingWrong: Boolean,
    },

    data() {
        return {

        };
    },

    methods: {

    },

    created() {

    },

    mounted() {

    },

    watch: {
        
    },

    computed: {

    }
}
</script>

<style scoped>
.content {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: start;

    width: 90vw;
}

.container-flexbox {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: start;

    width: 100vw;
}

.question-bg {
    width: 100%;
}

.question {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    margin: 1.5vh 0 3vh 0;
    width: 100%;

    background-color: rgb(194, 194, 194);
    border-radius: 10px;
}

.definition-container {
    position: relative;
    display: flex;

    text-align: center;
    justify-content: center;
    align-items: start;
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

.q-num-inline {
    position: absolute;
    left: -5vw;
    font-size: 1.5vw;
    font-weight: bold;

    background-color: rgb(93, 66, 214);
    padding: 0 0.5vw;

    border-radius: 0.9vw;
}

.opton-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;

    align-items: center;
    justify-content: center;

    width: 80%;
    grid-gap: 1vw 1vh;
}

.option-border-correct {
    font-size: 1.5vw;
    text-align: center;

    margin-top: 1vh;
    border-radius: 10px;
    border: 5px solid;
    border-color: green;

    background-color: blue;
}

.option {
    font-size: 1.5vw;
    text-align: center;

    margin-top: 1vh;
    border-radius: 10px;
    border: 5px solid transparent;

    background-color: rgb(95, 95, 248);
}

.option-border-wrong {
    font-size: 1.5vw;
    text-align: center;

    margin-top: 1vh;
    border-radius: 10px;
    border: 5px solid;
    border-color: rgb(255, 0, 0);

    background-color: blue;
}

.sentence {
    font-size: 1.5vw;
    text-align: center;

    margin-top: 2vh;
    border-radius: 10px;

    min-width: 90%;
    min-height: 20vh;

    background-color: #fffbe6;
}

.extra-space {
    margin: 5vh;
}
</style>