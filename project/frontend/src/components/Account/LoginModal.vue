<template>
    <div v-if="show" class="modal">
        <div class="modal-content">
            <span class="close" @click="$emit('close')">&times;</span>
            <h2>登入</h2>
            <form class="form">
                <div class="form-group">
                    <label for="email">電子郵件:</label>
                    <input type="email" v-model="email" required />
                </div>
                <div class="form-group">
                    <label for="password">密碼:</label>
                    <input type="password" v-model="password" required />
                </div>
            </form>
            <button class="login-button"  @click="handleLogin">登入</button>
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.modal-content {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    position: fixed;
    top: 10vh;
    left: 35vw;
    bottom: 10vh;
    right: 35vw;
    background-color: white;

    border-style: solid;
    border-width: 1px;
    border-color: gray;
    border-radius: 8px;

    z-index: 100;
}

.close {
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    font-size: 35px;
    /* float: right; */
}

.modal-content h2 {
    display: block;
    margin-top: 15vh;
}

.form {
    margin-top: 2vh;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
}

.form-group {
    margin-top: 3vh;
    display: block;
    margin-bottom: 8px;
    line-height: 1.6;
}

.form-group label {
    display: inline;
    margin-right: 16px;
    width: 80px;
}

.form-group input {
    display: inline;
}

.login-button {
    margin-top: 5vh;
    display: block;
    padding: 0.5rem 1rem;
    width: 220px;
    align-items: center;

    background-color: #062f5e;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.register-link, 
.forget-password {
    display: block;
    margin-top: 5vh;

    color: blue;
    cursor: pointer;
    text-decoration: underline;
    line-height: 1.8;
}

.error-message {
    display: block;
    margin-top: 5vh;

    color: red;
    font-size: 0.9rem;
}
</style>