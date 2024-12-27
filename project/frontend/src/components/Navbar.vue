<template>
    <nav class="navbar">
        <div class="logo"  @click="GotoHomePage()">
            VocabularyLetULearn
        </div>

        <nav class="icons">
            <div v-if="!_isLoggedIn" class="login-button"  @click="$emit('toggleLoginModal')">
                登入
            </div>
            <div v-else class="user-info">
                <span class="username">{{ _userName }}</span>
                <button class="logout-button" @click="Logout()">登出</button>
            </div>

            <div v-if="!_isLoggedIn" class="register-button"  @click="$emit('toggleRegisterModal')">
                註冊
            </div>

            <i class="icon">
                🏠
            </i>

            <i class="icon">
                📝
            </i>

            <i class="icon">
                💬
            </i>

            <i class="icon">
                ⚙️
            </i>
        </nav>
    </nav>
</template>

<script>
import { useUserStore } from '@/stores/User/userStore.js';
export default {
    props: {
        isLoggedIn: Boolean,
        userName: String,
        userEmail: String
    },

    data(){
        return{
            _isLoggedIn: this.isLoggedIn,
            _userName: this.userName,
            _userEmail: this.userEmail
        };
    },
    setup() {
        const userStore = useUserStore(); // 使用 Pinia Store
        return { userStore };
    },
    methods: {
        GotoHomePage() {
            if(this._isLoggedIn){
                this.$router.push({
                    name: 'HomeLoggedIn'
                });
            } else {
                this.$router.push({
                    name: 'Home'
                });
            }
        },

        Logout(){
            localStorage.removeItem('name');
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            this.userStore.clearUser();
            /*this._isLoggedIn = false;
            this._userName = '';
            this._userEmail = '';*/

            this.$router.push({
                name: 'Home'
            });
        }
    },

    created(){
        if(localStorage.getItem('name') !== null){
            this._isLoggedIn = true;
            this._userName = JSON.parse(localStorage.getItem('name'));
            this._userEmail = JSON.parse(localStorage.getItem('email'));
        }
    }
};
</script>

<style scoped>
.navbar {
    display: flex;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 10vh;
    padding: 0 20px 0 20px;
    background-color: #333;

    z-index: 10000;
}

.logo {
    font-size: 1.5em;
    color: white;

    cursor: pointer;
}

.icons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    font-size: 1.2em;
}

.icon,
.login-button,
.register-button,
.username {
    margin: 0 0px 0 20px;
    padding: 0 0 0 0;
    cursor: pointer;
    line-height: 50px;

    color: white;
}

.logout-button {
    margin: 0 0px 0 20px;
    padding: 0 0 0 0;
    cursor: pointer;
    line-height: 50px;

    border: none;

    background-color: #333;
    color: white;
}

.user-info {
    margin: 0 0px 0 0px;
    padding: 0 0 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>