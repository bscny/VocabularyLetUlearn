<template>
    <div class="home">
        <Navbar 
            :isLoggedIn="userStore.isLoggedIn" 
            :userName="userStore.userName"
            :userEmail="userStore.userEmail" 
            @toggleLoginModal="showLoginModal = true" 
            @toggleRegisterModal="showRegisterModal = true" 
            @logout="logout" 
        />

        <div class="main-layout">
            <Content :isLoggedIn="userStore.isLoggedIn" :userEmail="userStore.userEmail" :userName="userStore.userName" />
        </div>
        
        <LoginModal 
            :show="showLoginModal" 
            :loginError="loginError" 
            @close="showLoginModal = false" 
            @login="handleLogin" 
            @openForgetPasswordModal="switchToForgetPasswordModal"
            @openRegisterModal="switchToRegisterModal" 
        />
        
        <RegisterModal 
            :show="showRegisterModal" 
            :registerError="registerError" 
            @close="showRegisterModal = false" 
            @register="handleRegister" 
        />

        <ForgetPasswordModal
            :show="showForgetPasswordModal"
            @close="showForgetPasswordModal = false"
        />

        <VerifyPrompt 
            v-if="showVerifyPrompt" 
            @close="hideVerifyPrompt" 
        />
        
    </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import LoginModal from '@/components/Account/LoginModal.vue';
import RegisterModal from '@/components/Account/RegisterModal.vue';
import ForgetPasswordModal from '@/components/Account/ForgetPasswordModal.vue';
import Content from '@/components/Account/Content.vue';
import VerifyPrompt from '@/components/Account/VerifyPrompt.vue';
import api from '@/services/Account_API/accountAPI.js';
import { useUserStore } from '@/stores/User/userStore.js';

export default {
    components: {
        Navbar,
        LoginModal,
        RegisterModal,
        ForgetPasswordModal,
        Content,
        VerifyPrompt,
    },
    data() {
        return {
            isLoggedIn: false,
            userName:'',
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

        if(localStorage.getItem("USER_ID")){
            // already a log in user
            this.$router.push({
                name: 'HomeLoggedIn'
            });
        }
    },
    setup() {
        const userStore = useUserStore(); // 使用 Pinia Store
        return { userStore };
    },
    methods: {
        handleLogin(userData) {
            api.login(userData).then(response => {
                localStorage.setItem('USER_ID', JSON.stringify(response.data.USER_ID));
                localStorage.setItem('name', JSON.stringify(response.data.name));
                localStorage.setItem('token', JSON.stringify(response.data.token));
                localStorage.setItem('email', JSON.stringify(userData.email));

                this.userStore.setUser(response.data.USER_ID,response.data.name, response.data.email);
               
                this.updateLastLogin(this.userStore.userEmail);

                if (!response.data.isVerified) {
                    this.showVerifyPrompt = true;
                }else{
                    this.$router.push({
                        name: 'HomeLoggedIn'
                    })
                }
            }).catch(error => {
                this.loginError = '登入失敗，請檢查電子郵件和密碼。';
            });
        },

        handleRegister(userData) {
            api.register(userData).then(response => {               
                this.isLoggedIn = true;
                this.userName = userData.name;
                this.userEmail = userData.email;
                this.showRegisterModal = false;
                this.showVerifyPrompt = true;
                this.registerError = '';
            }).catch(error => {
                this.registerError = '註冊失敗，請檢查電子郵件和密碼。';
            });
        },

        hideVerifyPrompt() {
            this.showVerifyPrompt = false;
            this.logout();
        },

        logout() {
            localStorage.removeItem('USER_ID');
            localStorage.removeItem('name');
            localStorage.removeItem('token');
            localStorage.removeItem('email');

            this.userStore.clearUser();
            /*
            this.isLoggedIn = false;
            this.userName = '';
            this.userEmail = '';
            */
            this.$router.push({
                name: 'Home'
            });
        },

        switchToForgetPasswordModal() {
            this.showLoginModal = false;
            this.showForgetPasswordModal = true;
        },

        switchToRegisterModal() {
            this.showLoginModal = false;  // 關閉登入框
            this.showRegisterModal = true; // 打開註冊框
        },

        updateLastLogin(emailData) {
            api.updateLastLogin({ email: emailData }) // 假設傳送使用者的 ID 或 Email
                .then(response => {
                    console.log('Last login time updated successfully.');
                })
                .catch(error => {
                    console.error('Failed to update last login time:', error);
                });
        }
    }
};
</script>

<style scoped>
.home {
    display: flex;
    flex-direction: column;
    min-height: 100vh; 
    width: 100vw;
}

.navbar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 20;
}

.navbar-left {
    display: flex;
    align-items: center;
}

.navbar-right {
    display: flex;
    align-items: center;
    gap: 15px;
}

.main-layout {
    display: flex;
    flex-grow: 1;
    margin-top: 60px;
    overflow: hidden;
}

.left-sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 200px;
    height: calc(100vh - 60px);
    padding: 10px;
    gap: 10px;
    overflow-y: auto;
    background-color: #e8e8e8;
    box-sizing: border-box;
}

.left-sidebar .item {
    width: 90%;
    padding: 10px;
    background-color: #fff;
    text-align: center;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

@media (max-width: 600px) {
    .navbar {
        flex-direction: column;
        align-items: flex-start;
    }
    .icons {
        gap: 10px;
    }
    .icon {
        font-size: 1em;
    }
}
</style>