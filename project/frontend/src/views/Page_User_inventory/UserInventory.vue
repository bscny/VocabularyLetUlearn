<template>
    <Navbar 
            :isLoggedIn="isLoggedIn" 
            :userName="userName"
            :userEmail="userEmail" 
            @toggleLoginModal="showLoginModal = true" 
            @toggleRegisterModal="showRegisterModal = true" 
            @logout="logout()" 
    />

    <LeftBarFolders  @displayWords="setCanShow($event)"  @editFolder="setCanEditFolder($event)"
                     @createFolder="setCanCreateFolder()"/>

    <div v-if="canCreate">
        <FolderCreate  @creationDone="resetCanCreateFolder()" @cancelCreateFolder="cancel()"/>
    </div>

    <div v-if="canEdit">
        <FolderEdit  :folder="curLookingFolder"
                     @EditionDone="resetCanEditFolder()"  @CancelEditFolder="cancel()"/>
    </div>

    <main> 
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
            alert("Folder Created");
            this.canCreate = false;
        },

        cancel(){
            this.canCreate = false;
            this.canEdit = false;
        },

        resetCanEditFolder(){
            location.reload(); // reload the page for new folders
            alert("Changes Saved");
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

        logout() {
            localStorage.removeItem('USER_ID');
            localStorage.removeItem('name');
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            this.isLoggedIn = false;
            this.userName = '';
            this.userEmail = '';

            this.$router.push({
                name: 'Home'
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

    created() {
        const token = JSON.parse(localStorage.getItem('token'));
        this.isLoggedIn = !!token;
        if (this.isLoggedIn) {
            this.userName = JSON.parse(localStorage.getItem('name'));
            this.userEmail = JSON.parse(localStorage.getItem('email'));
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

    margin: 10vh 0 0 20vw;
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
    margin: 2vh 0 0 20vw;
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