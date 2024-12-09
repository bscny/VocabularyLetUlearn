<template>
    <div v-if="show" class="modal">
        <div class="modal-content">
            <span class="close" @click="$emit('close')">&times;</span>
            <h2>註冊</h2>
            <form class="form">
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
            </form>
            <button class="register-button"  @click="handleRegister">註冊</button>
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

<!-- <style scoped>
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
</style> -->

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

.register-button {
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