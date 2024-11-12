<template>
    <div class="home">
        <Navbar 
            :isLoggedIn="isLoggedIn" 
            :userName="userName"
            :userEmail="userEmail" 
            @toggleLoginModal="showLoginModal = true" 
            @toggleRegisterModal="showRegisterModal = true" 
            @logout="logout" 
        />

        <div class="main-layout">
            <LeftSideBar />
            <Content :isLoggedIn="isLoggedIn" :userEmail="userEmail" />
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
import Navbar from '../components/Navbar.vue';
import LoginModal from '../components/LoginModal.vue';
import RegisterModal from '../components/RegisterModal.vue';
import ForgetPasswordModal from '../components/ForgetPasswordModal.vue';
import Content from '../components/Content.vue';
import VerifyPrompt from '../components/VerifyPrompt.vue';
import LeftSideBar from '../components/LeftSideBar.vue';
import api from '../services/api';

export default {
    components: {
        Navbar,
        LoginModal,
        RegisterModal,
        ForgetPasswordModal,
        Content,
        VerifyPrompt,
        LeftSideBar
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
        const token = localStorage.getItem('token');
        this.isLoggedIn = !!token;
        if (this.isLoggedIn) {
            this.userName = localStorage.getItem('name');
            this.userEmail = localStorage.getItem('email');
        }
    },
    methods: {
        handleLogin(userData) {
            api.login(userData).then(response => {
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', userData.email);

                this.isLoggedIn = true;
                this.userName = response.data.name;
                this.userEmail = userData.email;
                this.showLoginModal = false;
                this.loginError = '';

                this.updateLastLogin(this.userEmail);

                if (!response.data.isVerified) {
                    this.showVerifyPrompt = true;
                    /*this.loginError = '您的信箱尚未驗證。請檢查郵件完成驗證。';
                    this.logout();
                    return;*/
                }
            }).catch(error => {
                this.loginError = '登入失敗，請檢查電子郵件和密碼。';
            });
        },

        handleRegister(userData) {
            api.register(userData).then(response => {
                localStorage.setItem('name', userData.name);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('email', userData.email);
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
            localStorage.removeItem('name');
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            this.isLoggedIn = false;
            this.userName = '';
            this.userEmail = '';
        },

        switchToForgetPasswordModal() {
            this.showLoginModal = false;
            this.showForgetPasswordModal = true;
            console.log('showForgetPasswordModal:', this.showForgetPasswordModal);
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