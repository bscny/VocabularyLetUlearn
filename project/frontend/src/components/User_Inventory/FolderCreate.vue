<template>
    <div class="BG">
        <div class="window">
            <button class="done-button"  @click="creationDone()">
                Crate Folder
            </button>

            <button class="cancel-button"  @click="cancel()">
                Cancel
            </button>
            
            <p>
                Give New Folder a Name
            </p>

            <input class="folder-name-input" type="text"  v-model="folderName"  @keydown.enter="creationDone()"/>
        </div>
    </div>
</template>

<script>
import {
    CreateFolder
} from '@/services/User_Inventory_API/folderAPI.js'

export default {
    name: 'FolderCreate',

    data() {
        return {
            folderName: '',
            userId: JSON.parse(localStorage.getItem('USER_ID')),
        };
    },

    methods: {
        async creationDone(){
            if(this.folderName != ''){
                await CreateFolder(this.folderName, this.userId);
            }

            this.$emit("creationDone");
        },

        cancel(){
            this.$emit("cancelCreateFolder");
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
    bottom: 60vh;
    left: 20vw;

    background-color: rgb(43, 22, 77);
    color: white;

    z-index: 101;
}

.done-button {
    position: absolute;

    right: 5px;
    bottom: 5px;

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

.cancel-button {
    position: absolute;

    left: 5px;
    bottom: 5px;

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

.window p{
    display: block;

    margin: 1vh 1vw;

    font-size: 30px;
}

.folder-name-input {
    display: block;
    margin: 3vh 1vw;

    font-size: 30px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.folder-name-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}
</style>