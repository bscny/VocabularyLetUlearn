<template>
    <div class="BG">
        <div class="window">
            <div class="title">
                Current Vocabulary: {{ vocabulary.WORD }}
            </div>

            <p>
                Word:
            </p>

            <input class="word-input" type="text"  v-model="word"/>
            
            <p>
                Definition: 
            </p>

            <input class="def-sen-input" type="text"  v-model="definitions"/>
            
            <p>
                Sentence: 
            </p>

            <input class="def-sen-input" type="text"  v-model="sentence"/>
            
            <button class="done-button"  @click="VocabEditionDone(1)">
                Save Changes
            </button>

            <button class="delete-button"  @click="VocabEditionDone(0)">
                Delete This Vocabulary
            </button>

            <button class="cancel-button"  @click="Cancel()">
                Cancel
            </button>

            <button v-if="isMarked" class="isMarked-button"  @click="ToggleIsMarked()">
                Set to Un-Marked
            </button>
            <button v-else class="isMarked-button"  @click="ToggleIsMarked()">
                Set to Marked
            </button>
        </div>
    </div>
</template>

<script>
import {
    ModifyWord,
    DeleteWord
} from '@/services/User_Inventory_API/wordAPI.js'

export default {
    name: 'VocabEdit',

    props: {
        vocabulary: Object,
    },

    data() {
        return {
            word: this.vocabulary.WORD,
            definitions: this.vocabulary.Definitions,
            sentence: this.vocabulary.Sentence,
            isMarked: this.vocabulary.Is_marked,
        };
    },

    methods: {
        async VocabEditionDone(mode){
            // mode == 1 means save changes, mode == 0 means to delete vocab
            if(mode == 1){
                // put vocab req
                if(this.word != "" && this.definitions != "" && this.sentence != ""){
                    await ModifyWord(this.vocabulary.SET_ID, this.vocabulary.WORD, this.word, this.definitions, this.sentence, this.isMarked);
                }
            } else if (mode == 0) {
                // delete vocab req
                await DeleteWord(this.vocabulary.SET_ID, this.vocabulary.WORD);
            }
              
            this.$emit("VocabEditionDone");
        },

        Cancel(){
            this.$emit("VocabEditionCancel");
        },

        ToggleIsMarked(){
            this.isMarked = !this.isMarked;
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
    top: 10vh;
    right: 20vw;
    bottom: 10vh;
    left: 20vw;

    background-color: rgb(43, 22, 77);
    color: white;

    z-index: 101;
}

.done-button {
    position: absolute;

    right: 1px;
    bottom: 2px;

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

.window p{
    display: block;

    margin: 2vh 0 0 1vw;

    font-size: 30px;
}

.word-input {
    display: block;

    margin: 2vh 0 0 1vw;

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

.def-sen-input {
    display: block;

    margin: 2vh 0 0 1vw;

    font-size: 30px;
    width: 600px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.def-sen-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.title {
    display: block;
    margin: 1vh 1vw;
    font-size: 30px;
}

.delete-button {
    position: absolute;

    left: 2px;
    bottom: 2px;

    padding: 10px 20px 10px 20px;
    background-color: #ee3030;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 30px;
}

.delete-button:hover {
    background-color: #f01212;
}

.cancel-button {
    position: absolute;

    left: 2px;
    bottom: 10vh;

    padding: 10px 20px 10px 20px;
    background-color: #32a9be;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 30px;
}

.cancel-button:hover {
    background-color: #12a3bd;
}

.isMarked-button {
    position: absolute;

    right: 1px;
    bottom: 10vh;

    padding: 10px 20px 10px 20px;
    background-color: #3082ee;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 30px;
}

.isMarked-button:hover {
    background-color: #1272f0;
}
</style>