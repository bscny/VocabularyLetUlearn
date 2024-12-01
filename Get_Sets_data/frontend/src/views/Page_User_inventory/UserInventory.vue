<template>
    <Navbar />

    <LeftBarFolders  @displayWords="setCanShow($event)"  @editFolder="setCanEditFolder($event)"
                     @createFolder="setCanCreateFolder()"/>

    <div v-if="canCreate">
        <FolderCreate  @creationDone="resetCanCreateFolder()"/>
    </div>

    <div v-if="canEdit">
        <FolderEdit  :folder="curLookingFolder"
                     @EditionDone="resetCanEditFolder()"/>
    </div>

    <main style="height: 3000px;"> 

        <div v-if="canShow" class="flex-buttons">
            <button class="quiz-button">
                Local Quiz
            </button>

            <button class="edit-set-button"  @click="EditSet()">
                Edit Set
            </button>
        </div>

        <input v-if="canShow" class="search-box" type="text" v-model="search" />    

        <ul class="grid-each-word" v-if="canShow" v-for="vocabulary in SearchFilterWords" :key="vocabulary.WORD">
            <div>
                {{ vocabulary.WORD }}
            </div>

            <div>
                {{ vocabulary.Definitions }}
            </div>

            <div>
                {{ vocabulary.Sentence }}
            </div>
        </ul>

    </main>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import LeftBarFolders from '@/components/User_Inventory/LeftBarFolders.vue';
import FolderCreate from '@/components/User_Inventory/FolderCreate.vue';
import FolderEdit from "@/components/User_Inventory/FolderEdit.vue";

import {
    getWordsBySetId
} from '@/services/User_Inventory_API/wordAPI.js'

export default {
    name: 'UserInventory',
    components: {
        Navbar,
        LeftBarFolders,
        FolderCreate,
        FolderEdit,
    },

    data(){
        return{
            // variables for words display
            canShow: false,
            curDisplaySetId: null,

            words: [],

            search: '',

            // variables for folder actions
            canCreate: false,
            canEdit: false,
            curLookingFolder: null,
        };
    },

    methods: {
        setCanShow(setId){
            this.canShow = true;
            this.curDisplaySetId = setId;

            this.getWords();
        },

        setCanEditFolder(f){
            this.curLookingFolder = f;

            this.canEdit = true;
        },

        setCanCreateFolder(){
            this.canCreate = true;
        },

        resetCanCreateFolder(){
            location.reload(); // reload the page for new folders
            this.canCreate = false;
        },

        resetCanEditFolder(){
            location.reload(); // reload the page for new folders
            this.canEdit = false;
        },

        EditSet(){
            this.$router.push({
                name: 'EditSet',
                params: {
                    SET_ID: this.curDisplaySetId
                }
            });
        },

        async getWords(){
            this.words = await getWordsBySetId(this.curDisplaySetId);
        },
    },

    computed: {
        SearchFilterWords(){
            return this.words.filter((vocabulary) => {
                return vocabulary.WORD.toLowerCase().includes(this.search.toLocaleLowerCase());
            });
        }
    },

}
</script>

<style scoped>
.flex-buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin: 100px 0 0 250px;
}

.quiz-button {
    display: block;
    margin: 0 0 0 0;
    padding: 10px 20px 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.quiz-button:hover {
    background-color: #288d2e;
}

.edit-set-button {
    display: block;
    margin: 0 20px 0 0;
    padding: 10px 20px 10px 20px;
    background-color: #cc3a46;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.edit-set-button:hover {
    background-color: #c96f99;
}

.search-box {
    display: block;
    margin: 10px 0 0 250px;
    padding: 5px 10px;
    font-size: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-box:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.grid-each-word {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 0 0 300px;
    margin: 0 0 0 0;

    font-size: 20px;
}

.grid-each-word div{
    margin: 30px 0 0 0;
}
</style>