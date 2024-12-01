<template>
    <Navbar />
    <button class="done-button">Done</button>
    <button class="cancle-button">Cancle</button>

</template>


<script>
import Navbar from '@/components/Navbar.vue';
import {
    getSet
} from '@/services/setAPI';
import {
    getWordsBySetId
} from '@/services/wordAPI.js';

export default {
    name: 'EditSet',
    components: {
        Navbar,
    },

    data(){
        return{
            SET_ID: this.$route.params.SET_ID,

            words: [],
            set: {},
        };
    },

    methods: {
        
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
    background-color: #d84141;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.cancle-button:hover {
    background-color: #be1f1f;
}
</style>