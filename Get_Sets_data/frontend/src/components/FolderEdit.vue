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
        </div>
    </div>
</template>

<script>
import {
    DeleteFolder,
    ModifyFolder
} from '@/services/folderAPI.js'
import {
    CreateSet
} from '@/services/setAPI.js'

export default {
    name: 'FolderEdit',

    props: {
        folder: Object,
    },

    data() {
        return {
            folderName: this.folder.Folder_name,
            setName: '',
            userId: 1,
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

.delete-button {
    position: absolute;

    left: 0;
    bottom: 0;

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

.window p1{
    position: absolute;

    left: 10px;
    top: 10px;

    font-size: 30px;
}

.window p2{
    position: absolute;

    left: 10px;
    top: 50px;

    font-size: 30px;
}

.folder-name-input {
    position: absolute;

    left: 10px;
    top: 100px;

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
    position: absolute;

    left: 10px;
    top: 250px;

    font-size: 30px;
}

.set-name-input {
    position: absolute;

    left: 10px;
    top: 300px;

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