<template>
    <nav class="left-sidebar">
        <button class="create-folder-button"  @click="createFolder()">
            Create Folder
        </button>

        <ul v-for="folder in folders" :key="folder.FOLDER_ID">
            <button class="edit-folder-button"  @click="editFolder(folder)">
                Edit Folder
            </button>
            
            <div class="folders"  @click="toggleShow(folder)">
                {{ folder.Folder_name }}
            </div>
            

            <div v-if="folder.isShow">
                <ul v-for="set in folder.sets" :key="set.SET_ID"  @click="displayWords(set.SET_ID)">
                    <div class="sets">
                        {{ set.Set_name }}
                    </div>
                </ul>
            </div>
        </ul>
    </nav>
</template>

<script>
import { shallowReactive, toDisplayString } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import {
    getFoldersByUserId
} from '@/services/folderAPI'
import {
    getSetsByFolderId
} from '@/services/setAPI'

export default {
    name: 'LeftBarfolders',

    data() {
        return {
            folders: [],

            // user id variables here
            userId: 1
        };
    },

    methods: {
        toggleShow(folder) {
            folder.isShow = !folder.isShow;
        },

        displayWords(setId) {
            this.$emit("displayWords", setId);
        },

        editFolder(f){
            this.$emit("editFolder", f);
        },

        createFolder(){
            this.$emit("createFolder");
        }
    },

    async mounted(){
        this.folders = await getFoldersByUserId(this.userId)

        this.folders.forEach(async function(folder) {
            const setsInFolder = await getSetsByFolderId(folder.FOLDER_ID)

            Object.assign(folder, {
                sets: setsInFolder,
                isShow: false
            });
        })
    }
};
</script>


<style scoped>
.left-sidebar {
    position: fixed;
    top: 50px;
    left: 0;
    bottom: 0;
    width: 200px;
    padding: 0;
    background-color: #f7f7f7;
    border-right: 1px solid #ddd;
}

.create-folder-button {
    display: block;
    margin: 30px 40px 0 20px;
    padding: 0 10px 0 10px;
    font-size: 18px;
    background-color: rgb(177, 187, 240);
    color: rgb(255, 255, 255);
    border: none;
    border-radius: 5px;

    cursor: pointer;
    transition: background-color 0.3s;
}

.create-folder-button:hover {
  background-color: #ccc7eb;
}

.folders {
    display: block;
    margin: 5px 0 30px 20px;
    padding: 0 0 0 0;
    font-size: 20px;
}

.folders:hover {
    background-color: #e0e0e0;
    cursor: pointer;
}

.edit-folder-button {
    display: block;
    margin: 60px 0 0 10px;
    padding: 5px 5px 5px 5px;
    background-color: #db5d67;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.edit-folder-button:hover {
    background-color: #e2647f;
    cursor: pointer;
}

.sets {
    margin: 10px 0 30px 20px;
    font-size: 18px;
}

.sets:hover {
    background-color: #9c9c9c;
    cursor: pointer;
}
</style>

