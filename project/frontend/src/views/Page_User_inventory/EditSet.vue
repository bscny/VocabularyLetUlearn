<template>
    <Navbar />

    <div v-if="canCreateVocab">
        <VocabCreate  :SET_ID="SET_ID"
                      @VocabCreationDone="resetCanCreateVocab()"/>
    </div>

    <div v-if="canEditVocab">
        <VocabEdit  :vocabulary="curWord"
                    @VocabEditionDone="resetCanEditVocab()"/>
    </div>

    <button class="done-button"  @click="DoneEditSet()">Done</button>
    <button class="cancle-button"  @click="CancleEditSet()">Cancle</button>

    <header>
        Set Name:
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
    </header>

    <main>
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

        <button class="delete-set"  @click="DeleteThisSet()">
            Delete this Set
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
            this.canCreateVocab = false;
        },

        SetCanEditVocab(vocab){
            this.curWord = vocab;

            this.canEditVocab = true;
        },

        resetCanEditVocab(){
            location.reload(); // reload the page for new folders
            this.canEditVocab = false;
        },
    },

    async mounted(){
        this.words = await getWordsBySetId(this.SET_ID);
        this.set = await getSet(this.SET_ID);
    }

}

</script>

<style scoped>
.done-button {
    position: fixed;
    top: 80px;
    right: 20px;
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

.cancle-button {
    position: fixed;
    top: 80px;
    left: 20px;
    padding: 10px 20px 10px 20px;
    background-color: #ec2a5b;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.cancle-button:hover {
    background-color: #f0154c;
}

header {
    display: block;
    margin: 80px 0 10px 0;
    font-size: 40px;
    text-align: center;
}

header div {
    display: inline;
}

.setName-box {
    display: inline;
    vertical-align: middle;
    padding: 5px 10px;
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
    display: inline;
    margin: 0 0 0 50px;
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
}

.vocabulary {
    display: block;
    margin: 50px 0 50px 0;

    font-size: 20px;
}

.edit-word-def-grid {
    display: grid;
    grid-template-columns: 100px 1fr 1fr;
}

.edit-vocab-button {
    padding: 10px 20px 10px 20px;
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

    margin: 50px 0 0 100px;
}

.category {
    display: block;
    margin: 0 0 10px 120px;
}

.content {
    display: block;
    margin: 0 0 0 120px;
    width: 700px;
    font-size: 20px;
}

.create-vocab-button {
    display: block;
    margin: auto;
    margin-bottom: 100px;
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

.delete-set {
    display: block;
    margin: 0 0 100px 100px;
    padding: 10px 20px 10px 20px;
    background-color: #fc2c2c;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.delete-set:hover {
    background-color: #f70e0e;
}
</style>