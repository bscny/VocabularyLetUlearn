<template>
    <div class="BG">
        <div class="window">
            <p1>
                Current Folder: {{ folder.Folder_name }}
            </p1>

            <p2>
                give a new name if you want to:
            </p2>

            <input class="folder-name-input" type="text"  v-model="folderName"/>

            <p3>
                Want a new set?  Give New Set a Name:
            </p3>

            <input class="set-name-input" type="text"  v-model="setName"/>

            <button class="done-button"  @click="EditionDone(1)">
                Save Changes
            </button>

            <button class="delete-button" @click="EditionDone(0)">
                Delete This Folder
            </button>

            <button class="cancel-button" @click="cancel()">
                Cancel
            </button>

        </div>
    </div>
</template>

<script>
import {
    DeleteFolder,
    ModifyFolder
} from '@/services/User_Inventory_API/folderAPI.js'
import {
    CreateSet
} from '@/services/User_Inventory_API/setAPI.js'

export default {
    name: 'FolderEdit',

    props: {
        folder: Object,
    },

    data() {
        return {
            folderName: this.folder.Folder_name,
            setName: '',
            userId: JSON.parse(localStorage.getItem('USER_ID')),
        };
    },

    methods: {
        async EditionDone(mode){
            // mode == 1 means save changes, mode == 0 means try to delete folder
            if(mode == 1){
                if(this.setName != ''){
                    // post set req
                    await CreateSet(this.setName, 1, this.folder.FOLDER_ID);
                }

                if(this.folderName != '' && this.folderName != this.folder.Folder_name){
                    // put folder req
                    await ModifyFolder(this.folder.FOLDER_ID, this.folderName, this.userId);
                }
            } else if (mode == 0) {
                // delete folder req
                await DeleteFolder(this.folder.FOLDER_ID);
            }

            this.$emit("EditionDone");
        },

        cancel(){
            this.$emit("CancelEditFolder");
        }
    },

    computed: {
    },

    mounted(){
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
    bottom: 1px;

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

.delete-button {
    position: absolute;

    left: 1px;
    bottom: 1px;

    padding: 10px 20px 10px 20px;
    background-color: #d82d2d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 30px;
}

.delete-button:hover {
    background-color: #c52323;
}

.cancel-button {
    position: absolute;

    left: 1px;
    bottom: 70px;

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

.window p1{
    display: block;
    margin: 1vh 1vw;

    font-size: 30px;
}

.window p2{
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

.window p3{
    display: block;
    margin: 10vh 1vw 0 1vw;

    font-size: 30px;
}

.set-name-input {
    display: block;
    margin: 5vh 1vw;

    font-size: 30px;
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.set-name-input:focus {
    border-color: #4caf50;
    outline: none;
    box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}
</style>