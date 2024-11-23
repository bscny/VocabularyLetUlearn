<template>
    <nav class="left-sidebar">
        <ul class="folders" v-for="folder in folders" :key="folder.id"  @click="toggleShow(folder)">
            {{ folder.name }}

            <div v-if="folder.isShow">
                <ul class="sets" v-for="set in folder.sets" :key="set.id"  @click="displaySet(set.id)">
                    {{ set.name }}
                </ul>
            </div>
        </ul>
    </nav>
</template>

<script>
import { shallowReactive, toDisplayString } from 'vue';

export default {
    name: 'FolderSetSlide',
    data() {
        return {
            folders: [
                { id: 1, name: 'F1', route: '/search', isShow: false, sets: [
                    { id: 1, name: '1S1' },
                    { id: 2, name: '1S2' },
                    { id: 3, name: '1S3' },
                    { id: 4, name: '1S4' },
                ]},
                { id: 2, name: 'F2', route: '/my-set', isShow: false, sets: [
                    { id: 1, name: '2S1' },
                    { id: 2, name: '2S2' },
                    { id: 3, name: '2S3' },
                    { id: 4, name: '2S4' },
                ]},
                { id: 3, name: 'F3', route: '/ranking-exam', isShow: false, sets: [
                    { id: 1, name: '3S1' },
                    { id: 2, name: '3S2' },
                    { id: 3, name: '3S3' },
                    { id: 4, name: '3S4' },
                ]},
                { id: 4, name: 'F4', route: '/room', isShow: false, sets: [
                    { id: 1, name: '4S1' },
                    { id: 2, name: '4S2' },
                    { id: 3, name: '4S3' },
                    { id: 4, name: '4S4' },
                ]},
            ]
        };
    },
    methods: {
        toggleShow(folder) {
            folder.isShow = !folder.isShow;
        },

        displaySet(setId) {
            // display it from DB
            console.log("display" + setId);
        }
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

