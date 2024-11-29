<template>
    <nav class="left-sidebar">
        <ul class="folders" v-for="folder in folders" :key="folder.FOLDER_ID"  @click="toggleShow(folder)">
            {{ folder.Folder_name }}    

            <div v-if="folder.isShow">
                <ul class="sets" v-for="set in folder.sets" :key="set.SET_ID"  @click="displaySetContent(set.SET_ID)">
                    {{ set.SET_name }}
                </ul>
            </div>
        </ul>
    </nav>
</template>

<script>
import { shallowReactive, toDisplayString } from 'vue';
import axios from 'axios';

export default {
    name: 'LeftBarfolders',

    data() {
        return {
            folders: [],

            // curDisplaySetId: null
        };
    },

    methods: {
        toggleShow(folder) {
            folder.isShow = !folder.isShow;
        },

        displaySetContent(setId) {
            // display it from DB
            this.$emit("displayWords", setId);
        }
    },

    async mounted(){
        const initFolderDatas = await axios.get("http://localhost:3000/users/1/folders");

        this.folders = initFolderDatas.data;

        this.folders.forEach(async function(folder) {
            const setsInFolderDatas = await axios.get(`http://localhost:3000/users/folders/${folder.FOLDER_ID}/sets`);

            Object.assign(folder, {
                sets: setsInFolderDatas.data,
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

.folders {
    margin: 30px 0 0 0;
    padding: 0 0 0 70px;
    font-size: 20px;
}

.folders:hover {
    background-color: #e0e0e0;
    cursor: pointer;
}

.sets {
    margin: 30px 0 0 10px;
}

.sets:hover {
    background-color: #9c9c9c;
    cursor: pointer;
}
</style>

