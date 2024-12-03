<template>
    <div v-if="show" class="modal">
        <div class="modal-content">
            <span class="close" @click="$emit('close')">&times;</span>
            <h2>登入</h2>
            <form @submit.prevent="handleLogin">
                <div class="form-group">
                    <label for="email">電子郵件:</label>
                    <input type="email" v-model="email" required />
                </div>
                <div class="form-group">
                    <label for="password">密碼:</label>
                    <input type="password" v-model="password" required />
                </div>
                <button type="submit">登入</button>
            </form>
            <div v-if="loginError" class="error-message">{{ loginError }}</div>
            <div class="forget-password" @click="$emit('openForgetPasswordModal')">忘記密碼</div>
            <div class="register-link" @click="$emit('openRegisterModal')">還沒有帳號？點擊這裡註冊</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: Boolean,
        loginError: String
    },
    data() {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        handleLogin() {
            this.$emit('login', { email: this.email, password: this.password });
        }
    }
};
</script>

<style scoped>
.modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.modal-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 300px;
}

.close {
    cursor: pointer;
    float: right;
}

.form-group {
    margin-bottom: 0.5rem;
    line-height: 1.6;
}

.form-group label {
    margin-right: 1rem;
    width: 80px;
}

button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    width: 100%;
    background-color: #062f5e;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.register-link, 
.forget-password {
    margin-top: 10px;
    color: blue;
    cursor: pointer;
    text-decoration: underline;
    line-height: 1.8;
}

h2 {
    margin-bottom: 1.5rem;
}

.error-message {
    color: red;
    margin-top: 10px;
    font-size: 0.9rem;
}
</style>