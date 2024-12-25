<template>
    <Navbar :isLoggedIn="isLoggedIn" :userName="userName" :userEmail="userEmail"
        @toggleLoginModal="showLoginModal = true" @toggleRegisterModal="showRegisterModal = true" @logout="logout()" />

    <LeftSideBar />
    <div class="home">
        <div class="search-component">
            <SearchResult />
        </div>

        <div class="user-dashboard">
            <UserDashboard />
        </div>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import LeftSideBar from '@/components/Landing/LeftSideBar.vue';
import SearchResult from '@/components/Landing/SearchResult.vue';
import UserDashboard from '@/components/Landing/UserDashboard.vue';

export default {
    components: {
        Navbar,
        LeftSideBar,
        SearchResult,
        UserDashboard,
    },
    data() {
        return {
            isLoggedIn: false,
            userName: '',
            userEmail: '',
            showLoginModal: false,
            showRegisterModal: false,
            showForgetPasswordModal: false,
            showVerifyPrompt: false,
            loginError: '',
            registerError: ''
        };
    },
    created() {
        const token = JSON.parse(localStorage.getItem('token'));
        this.isLoggedIn = !!token;
        if (this.isLoggedIn) {
            this.userName = JSON.parse(localStorage.getItem('name'));
            this.userEmail = JSON.parse(localStorage.getItem('email'));
        }
    },
    methods: {
        logout() {
            localStorage.removeItem('USER_ID');
            localStorage.removeItem('name');
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            this.isLoggedIn = false;
            this.userName = '';
            this.userEmail = '';

            this.$router.push({
                name: 'Home'
            });
        },
    }
};
</script>

<style scoped>
.home {
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: start;

    margin-top: 10vh;
    margin-left: 15vw;
}

.search-component {
    display: block;
}

.user-dashboard {
    display: block;
}
</style>