<template>
    <div class="left-sidebar">
        <li class="items" v-for="item in menuItems" :key="item.name" @click="navigate(item.route)">
            <div>
                <img :src="item.icon" alt="" class="icon" />
            </div>
            <div class="text">
                {{ item.name }}
            </div>
        </li>
    </div>
</template>

<script>
export default {
    name: 'LeftSidebar',
    data() {
        return {
            menuItems: [
                { name: 'Search', route: 'HomeLoggedIn', icon: '/icons/search-icon.png' },
                { name: 'My Set', route: 'UserInventory', icon: '/icons/my_set-icon.png' },
                //{ name: 'Ranking Exam', route: '/ranking-exam', icon: '/icons/ranking_exam-icon.png' },
                { name: 'Room', route: 'CreateJoinRoom', icon: '/icons/room-icon.png' },
            ]
        };
    },
    methods: {
        navigate(route) {
            this.$router.push({
                name: route
            });
        }
    }
};
</script>

<style scoped>
.left-sidebar {
    position: fixed;
    display: flex;

    flex-direction: column;
    align-items: start;
    justify-content: start;

    top: 10vh;
    bottom: 0;
    left: 0;
    width: 15vw;
    padding-top: 2vh;
    background-color: #f7f7f7;
    height: 100vh;
    border-right: 1px solid #ddd;
}

.items {
    display: flex;

    flex-direction: row;
    align-items: center;
    justify-content: center;

    margin-bottom: 5vh;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.items:hover {
    background-color: #e0e0e0;
}

.icon {
    margin-right: 1vw;
    margin-left: 1vw;
    width: 20px;
    height: 20px;
}

.text{
    font-size: 1.2vw;
}
</style>