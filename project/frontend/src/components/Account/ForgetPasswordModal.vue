<template>
    <div v-if="show" class="modal">
        <div class="modal-content">
            <span class="close" @click="$emit('close')">&times;</span>
            <h2>忘記密碼</h2>
            <form class="form" @submit.prevent="sendResetPasswordEmail">
                <div class="form-group">
                    <label for="registerEmail">電子郵件:</label>
                    <input type="email" v-model="registerEmail" required />
                </div>
                <button type="submit">寄發驗證信</button>
            </form>
            <!-- 顯示錯誤訊息 -->
            <div v-if="emailNotExist" class="error-message">信箱不存在</div>
        </div>
    </div>
</template>

<script>
import api from '@/services/Account_API/accountAPI.js';

export default {
    props: {
        show: Boolean,
    },
    data() {
        return {
            registerEmail: '',
            emailNotExist: false,  // 默認不顯示錯誤
        };
    },
    methods: {
        // 重設密碼
        sendResetPasswordEmail() {
            // 檢查 email 是否已註冊
            api.checkEmail({email: this.registerEmail, type: 'sendResetPasswordEmail'}).then(response => {
                api.sendResetPasswordEmail({email: this.registerEmail}).then(response => {
                    this.emailNotExist = false;
                    this.$emit('close');
                })
            }).catch(error => {
                this.emailNotExist = true; 
            });
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