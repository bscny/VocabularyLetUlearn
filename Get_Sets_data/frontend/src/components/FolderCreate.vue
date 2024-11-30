<template>
    <div class="BG">
        <div class="window">
            <button class="done-button"  @click="creationDone()">
                Done
            </button>
        </div>
    </div>
</template>

<script>

export default {
    name: 'FolderCreate',

    data() {
        return {
            
        };
    },

    methods: {
        creationDone(){
            this.$emit("creationDone")
        }
    },
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
</style>