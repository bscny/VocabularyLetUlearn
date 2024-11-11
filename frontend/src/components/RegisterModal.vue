<template>
    <div v-if="show" class="modal">
        <div class="modal-content">
            <span class="close" @click="$emit('close')">&times;</span>
            <h2>註冊</h2>
            <form @submit.prevent="handleRegister">
                <div class="form-group">
                    <label for="userName">使用者名稱:</label>
                    <input type="text" v-model="registerName" required />
                </div>
                <div class="form-group">
                    <label for="registerEmail">電子郵件:</label>
                    <input type="email" v-model="registerEmail" required />
                </div>
                <div class="form-group">
                    <label for="registerPassword">密碼:</label>
                    <input type="password" v-model="registerPassword" required />
                </div>
                <div class="form-group">
                    <label for="confirmPassword">確認密碼:</label>
                    <input type="password" v-model="confirmPassword" required />
                </div>
                <button type="submit">註冊</button>
            </form>
            <div v-if="registerError" class="error-message">{{ registerError }}</div>
            <div v-if="passwordMismatch" class="error-message">密碼不一致</div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: Boolean,
        registerError: String
    },
    data() {
        return {
            registerName: '',
            registerEmail: '',
            registerPassword: '',
            confirmPassword: '',
            passwordMismatch: false
        };
    },
    methods: {
        handleRegister() {
            // 檢查密碼是否一致
            if (this.registerPassword !== this.confirmPassword) {
                this.passwordMismatch = true;
                return;
            }
            this.passwordMismatch = false;
            this.$emit('register', { name: this.registerName, email: this.registerEmail, password: this.registerPassword });
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
    margin-bottom: 1.8rem;
    display: flex;
    align-items: center;
}

.form-group label {
    flex-shrink: 0;
    width: 100px;
    margin-right: 1rem;
    white-space: nowrap;
}

.form-group input {
    flex-grow: 1;
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

h2 {
    margin-bottom: 1.5rem;
}

.error-message {
    color: red;
    margin-top: 10px;
    font-size: 0.9rem;
}
</style>