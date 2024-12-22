<template>
    <div class="left-sidebar">
        <ul class="sidebar-menu">
            <li v-for="item in menuItems" :key="item.name" @click="navigate(item.route)">
                <img :src="item.icon" alt="" class="icon" />
                {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'LeftSidebar',
    data() {
        return {
            menuItems: [
                { name: 'Search', route: '/home-logged-in', icon: '/icons/search-icon.png' },
                { name: 'My Set', route: '/userinventory', icon: '/icons/my_set-icon.png' },
                { name: 'Ranking Exam', route: '/ranking-exam', icon: '/icons/ranking_exam-icon.png' },
                { name: 'Room', route: '/create-join-room', icon: '/icons/room-icon.png' },
            ]
        };
    },
    methods: {
        navigate(route) {
            this.$router.push(route);
        }
    }
};
</script>

<style scoped>
.left-sidebar {
    position: fixed;
    width: 200px;
    padding: 1rem;
    background-color: #f7f7f7;
    height: 100vh;
    border-right: 1px solid #ddd;
}

.sidebar-menu {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: center;
    list-style: none;
    padding: 0;
}

.sidebar-menu li {
    display: block;
    /* align-items: center; */
    padding: 10px;
    margin-bottom: 30px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.sidebar-menu li:hover {
    background-color: #e0e0e0;
}

.icon {
    margin-right: 10px;
    width: 20px;
    height: 20px;
}
</style>