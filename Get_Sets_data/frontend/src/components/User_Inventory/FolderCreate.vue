<template>
    <div class="BG">
        <div class="window">
            <button class="done-button"  @click="creationDone()">
                Crate Folder
            </button>
            
            <p>
                Give New Folder a Name
            </p>

            <input class="folder-name-input" type="text"  v-model="folderName"/>
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
            userId: 1,
        };
    },

    methods: {
        async creationDone(){
            if(this.folderName != ''){
                await CreateFolder(this.folderName, this.userId);
            }

            this.$emit("creationDone");
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
    bottom: 600px;
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

.window p{
    position: absolute;

    left: 10px;
    top: 10px;

    font-size: 30px;
}

.folder-name-input {
    position: absolute;

    left: 10px;
    top: 60px;

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