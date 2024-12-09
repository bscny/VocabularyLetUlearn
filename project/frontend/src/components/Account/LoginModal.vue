<template>
    <div v-if="show" class="modal">
        <div class="modal-content">
            <span class="close" @click="$emit('close')">&times;</span>
            <h2>登入</h2>
            <form class="form" @submit.prevent="handleLogin">
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
}

.modal-content {
    display: grid;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 30%;
    left: 35%;
    width: 30%;
    height: 40%;
    background-color: white;

    border-style: solid;
    border-width: 1px;
    border-color: gray;
    border-radius: 8px;

    z-index: 100;
}

.close {
    position: absolute;
    top: 5%;
    right: 5%;
    cursor: pointer;
    /* float: right; */
}

.modal-content h2 {
    display: block;
    margin: auto;
    /* margin: auto; */
    /* margin: 5% 0 5% 40%; */
}

.form {
    display: block;
}

.form-group {
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

.form button {
    display: block;
    margin: auto;
    margin-top: 20px;
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
    margin: auto;

    color: blue;
    cursor: pointer;
    text-decoration: underline;
    line-height: 1.8;
}

.error-message {
    color: red;
    font-size: 0.9rem;
}
</style>