<template>
    <div class="BG">
        <div class="window">
            <button class="done-button"  @click="VocabCreationDone()">
                Crate Vocabulary
            </button>
            
            <p1>
                Word: 
            </p1>

            <input class="word-input" type="text"  v-model="word"/>
            
            <p2>
                Definition: 
            </p2>

            <input class="def-input" type="text"  v-model="definitions"/>
            
            <p3>
                Sentence: 
            </p3>

            <input class="sentence-input" type="text"  v-model="sentence"/>
        </div>
    </div>
</template>

<script>
import {
    CreateWord
} from '@/services/wordAPI.js'

export default {
    name: 'VocabCreate',

    props: {
        SET_ID: Number,
    },

    data() {
        return {
            word: "",
            definitions: "",
            sentence: "",
        };
    },

    methods: {
        async VocabCreationDone(){
            if(this.word != "" && this.definitions != "" && this.sentence != ""){
                await CreateWord(this.SET_ID, this.word, this.definitions, this.sentence);
            }
              
            this.$emit("VocabCreationDone");
        }
    },

    computed: {

    }
}
</script>

<style scoped>
.BG {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    background-color: rgba(255, 255, 255, 0.301);

    z-index: 100;
}

.window {
    position: fixed;
    top: 100px;
    right: 300px;
    bottom: 100px;
    left: 300px;

    background-color: rgb(43, 22, 77);
    color: white;

    z-index: 101;
}

.done-button {
    position: absolute;

    right: 0;
    bottom: 0;

    padding: 10px 20px 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 30px;
}

.done-button:hover {
    background-color: #288d2e;
}

.window p1{
    position: absolute;

    left: 10px;
    top: 10px;

    font-size: 30px;
}

.word-input {
    position: absolute;

    left: 10px;
    top: 60px;

    font-size: 30px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.word-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.window p2{
    position: absolute;

    left: 10px;
    top: 110px;

    font-size: 30px;
}

.def-input {
    position: absolute;

    left: 10px;
    top: 160px;

    font-size: 30px;
    width: 600px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.def-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.window p3{
    position: absolute;

    left: 10px;
    top: 210px;

    font-size: 30px;
}

.sentence-input {
    position: absolute;

    left: 10px;
    top: 260px;

    font-size: 30px;
    padding: 5px 10px;
    width: 600px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.sentence-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}
</style>