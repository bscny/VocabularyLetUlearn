<template>
    <Navbar 
            :isLoggedIn="isLoggedIn" 
            :userName="userName"
            :userEmail="userEmail" 
            @toggleLoginModal="showLoginModal = true" 
            @toggleRegisterModal="showRegisterModal = true" 
            @logout="logout()" 
    />

    <div v-if="canCreateVocab">
        <VocabCreate  :SET_ID="SET_ID"
                      @VocabCreationDone="resetCanCreateVocab()"  @VocabCreationCancel="cancel()"/>
    </div>

    <div v-if="canEditVocab">
        <VocabEdit  :vocabulary="curWord"
                    @VocabEditionDone="resetCanEditVocab()"  @VocabEditionCancel="cancel()"/>
    </div>

    <div class="header">
        <div>
            Set Name:
        </div>
        
        <input class="setName-box" type="text"  v-model="set.Set_name">

        <div v-if="set.Is_public">
            <button class="public-private-button"  @click="ToggleIsPublic()">
                Set to Private
            </button>
        </div>
        <div v-else>
            <button class="public-private-button"  @click="ToggleIsPublic()">
                Set to Public
            </button>
        </div>

    </div>

    <main>
        <button class="done-button"  @click="DoneEditSet()">Done</button>
        <button class="delete-button"  @click="DeleteThisSet()">Delete Set</button>

        <ul class="vocabulary" v-for="vocabulary in words" :key="vocabulary.WORD">
            <div class="edit-word-def-grid">
                <button class="edit-vocab-button"  @click="SetCanEditVocab(vocabulary)">
                    edit
                </button>

                <div>
                    <div class="category">
                        Word:
                    </div>
                    <div class="content">
                        {{ vocabulary.WORD }}
                    </div>
                </div>

                <div>
                    <div class="category">
                        Definition:
                    </div>
                    <div class="content">
                        {{ vocabulary.Definitions }}
                    </div>
                </div>

            </div>

            <div class="sentence">
                <div class="category">
                    Sentence:
                </div>
                <div class="content">
                    {{ vocabulary.Sentence }}
                </div>
            </div>
        </ul>

        <button class="create-vocab-button"  @click="SetCanCreateVocab()">
            Create New Vocabulary
        </button>
    </main>
</template>


<script>
import Navbar from '@/components/Navbar.vue';
import VocabCreate from '@/components/User_Inventory/VocabCreate.vue';
import VocabEdit from '@/components/User_Inventory/VocabEdit.vue';
import {
    getSet,
    ModifySet,
    DeleteSet
} from '@/services/User_Inventory_API/setAPI.js';
import {
    getWordsBySetId
} from '@/services/User_Inventory_API/wordAPI.js';

export default {
    name: 'EditSet',

    components: {
        Navbar,
        VocabCreate,
        VocabEdit,
    },

    data(){
        return{
            // variables for set actions
            SET_ID: this.$route.params.SET_ID,

            words: [],
            set: {},

            // variables for vocabulary actions
            canCreateVocab: false,
            canEditVocab: false,

            curWord: null,
        };
    },

    methods: {
        // methods for set actions
        async DoneEditSet(){
            await ModifySet(this.set.SET_ID, this.set.Set_name, this.set.Is_public, this.set.In_folder_id);

            this.$router.push({
                name: 'UserInventory',
            });
        },

        CancleEditSet(){
            this.$router.push({
                name: 'UserInventory',
            });
        },

        ToggleIsPublic(){
            this.set.Is_public = !this.set.Is_public;
        },

        async DeleteThisSet(){
            await DeleteSet(this.set.SET_ID);

            this.$router.push({
                name: 'UserInventory',
            });
        },


        // methods for vocab actions
        SetCanCreateVocab(){
            this.canCreateVocab = true;
        },

        resetCanCreateVocab(){
            location.reload(); // reload the page for new folders
            alert("Word created!");
            this.canCreateVocab = false;
        },

        cancel(){
            this.canCreateVocab = false;
            this.canEditVocab = false;
        },

        SetCanEditVocab(vocab){
            this.curWord = vocab;

            this.canEditVocab = true;
        },

        resetCanEditVocab(){
            location.reload(); // reload the page for new folders
            alert("Changes Saved!");
            this.canEditVocab = false;
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
    },

    async mounted(){
        this.words = await getWordsBySetId(this.SET_ID);
        this.set = await getSet(this.SET_ID);
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
.done-button {
    position: absolute;
    top: -10vh;
    right: 2vw;
    padding: 10px 20px 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.done-button:hover {
    background-color: #288d2e;
}

.delete-button {
    position: absolute;
    top: -10vh;
    left: 2vw;
    padding: 10px 20px 10px 20px;
    background-color: #fc2c2c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.delete-button:hover {
    background-color: #f70e0e;
}

.header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10vh 0 3vh 0;
    font-size: 40px;
    /* text-align: center; */
}

.header div {
    display: block;
    margin: 0 3vw;
}

.setName-box {
    display: block;
    padding: 5px 10px;
    margin: 0;
    font-size: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.setName-box:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.public-private-button {
    display: block;
    padding: 10px 20px 10px 20px;
    background-color: #20acd6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.public-private-button:hover {
    background-color: #0397c4;
}

main {
    display: block;
    position: relative;
}

.vocabulary {
    display: block;
    margin: 6vh 0;

    font-size: 20px;
}

.edit-word-def-grid {
    display: grid;
    grid-template-columns: 10vw 1fr 1fr;

    border-top: solid;
    border-width: 2px;
    border-color: black;
}

.edit-vocab-button {
    display: block;
    padding: 10px 20px 10px 20px;
    margin: 2vh 2vw;
    background-color: #db45b6;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.edit-vocab-button:hover {
    background-color: #c7239e;
}

.sentence {
    display: block;

    margin: 4vh 0 0 10vw;
}

.category {
    display: block;
    margin: 0 0 2vh 4vw;

    text-decoration: underline;
    font-size: 30px;
}

.content {
    display: block;
    margin: 0 0 0 4vw;
    font-size: 25px;
}

.create-vocab-button {
    display: block;
    margin: auto;
    margin-bottom: 10vh;
    padding: 10px 20px 10px 20px;
    background-color: #6145db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.create-vocab-button:hover {
    background-color: #411de0;
}
</style>