<template>
    <div class="left-sidebar">
        <ul class="folder-menu">
            <li v-for="folder in folders" :key="folder.id">
                <div @click="toggleShow(folder)">
                    {{ folder.name }}
                </div>
                <ul class="set-menu"v-if="folder.isShow">
                    <li v-for="set in folder.sets" :key="set.id">
                        {{ set.name }}
                    </li>
                </ul>
            </li>
        </ul>
    </div>
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
        }
    }
};
</script>


<style scoped>
.left-sidebar {
    width: 200px;
    padding: 1rem;
    background-color: #f7f7f7;
    height: 100vh;
    border-right: 1px solid #ddd;
    overflow-y: auto;
}

.folder-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.folder-menu li {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    transition: background-color 0.3s;
}

.folder-name {
    display: flex;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.folder-name:hover {
    background-color: #e0e0e0;
}

.set-menu {
    list-style: none;
    margin: 0;
}

.set-menu li {
    display: flex;
    align-items: center;
    padding: 8px 10px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.set-menu li:hover {
    background-color: #e0e0e0;
}
</style>

