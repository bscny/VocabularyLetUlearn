<template>
    <nav class="left-sidebar">
        <button class="create-folder-button"  @click="createFolder()">
            Create Folder
        </button>

        <ul class="grid-container" v-for="folder in folders" :key="folder.FOLDER_ID">
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
import {
    getFoldersByUserId
} from '@/services/User_Inventory_API/folderAPI.js'
import {
    getSetsByFolderId
} from '@/services/User_Inventory_API/setAPI.js'

export default {
    name: 'LeftBarfolders',

    data() {
        return {
            folders: [],

            // user id variables here
            userId: JSON.parse(localStorage.getItem('USER_ID')),
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
    position: absolute;
    top: 10vh;
    left: 0;
    bottom: 0;
    width: 17vw;
    padding: 0;
    background-color: #f7f7f7;
    border-right: 1px solid #ddd;
}

.create-folder-button {
    display: block;
    margin: 2.5vh 0 0 2.5vw;
    padding: 0 10px 0 10px;
    font-size: 1.4vw;
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

/* .grid-container {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    justify-content: center;
} */

.folders {
    display: block;
    margin: 1vh 0 1vh 1vw;
    padding: 0 0 0 0;
    width: auto;
    font-size: 1.2vw;

    background-color: rgba(0, 0, 0, 0.137);
}

.folders:hover {
    background-color: #e0e0e0;
    cursor: pointer;
}

.edit-folder-button {
    display: block;
    margin: 3.5vh 0 0 1vw;
    padding: 5px 5px 5px 5px;
    background-color: #db5d67;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    font-size: 1vw;
}

.edit-folder-button:hover {
    background-color: #e2647f;
    cursor: pointer;
}

.sets {
    margin: 1vh 0 1vh 2vw;
    font-size: 1.1vw;
}

.sets:hover {
    background-color: #9c9c9c;
    cursor: pointer;
}
</style>

