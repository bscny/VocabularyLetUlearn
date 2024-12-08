<template>
    <div class="verify-prompt">
        <div class="prompt-content">
            <h2>請先驗證您的信箱</h2>
            <p>您的電子郵件尚未驗證，請查收郵件並完成驗證。</p>
            <button 
                @click="resendVerificationEmail" 
                class="resend-button" 
                :disabled="isResending"
            >
                重寄驗證信
            </button>
            <button @click="$emit('close')" class="close-button">關閉</button>
            <p v-if="resendMessage" class="resend-message">{{ resendMessage }}</p>
            <p v-if="isResending" class="countdown-message">請等待 {{ countdown }} 秒後再重寄。</p>
        </div>
    </div>
</template>

<script>
import api from '../services/api';

export default {
    name: 'VerifyPrompt',
    data() {
        return {
            resendMessage: '',  // 用來顯示重寄成功或失敗的訊息
            userEmail: '',  // 儲存使用者的電子郵件
            isResending: false,  // 用來控制是否正在重寄郵件
            countdown: 60,  // 倒數時間
        };
    },
    created() {
        this.userEmail = localStorage.getItem('email');
    },
    methods: {
        resendVerificationEmail() {
            this.isResending = true;
            api.resendVerificationEmail({ email: this.userEmail })
                .then(response => {
                    this.resendMessage = '驗證信已重寄，請查收您的信箱。';
                    this.startCountdown();
                })
                .catch(error => {
                    console.error('Error:', error.response || error);
                    if (error.response && error.response.data) {
                        this.resendMessage = `重寄失敗：${error.response.data.message || '請稍後再試'}`;
                    } else {
                        this.resendMessage = '重寄失敗，請稍後再試。';
                    }
                    this.isResending = false;  // 如果重寄失敗，允許再次點擊
                });
        },
        startCountdown() {
            const interval = setInterval(() => {
                if (this.countdown > 0) {
                    this.countdown--;
                } else {
                    clearInterval(interval);
                    this.isResending = false;  // 重新啟用重寄按鈕
                    this.countdown = 60;  // 重設倒數時間
                }
            }, 1000);
        }
    }
};
</script>

<style scoped>
.verify-prompt {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
}

.prompt-content {
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 300px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.close-button, .resend-button {
    display: inline-block;
    width: 80%;
    margin-bottom: 1rem;
    padding: 0.5rem;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
}

.resend-button {
    background-color: #4CAF50;
    color: white;
}

.resend-button:hover {
    background-color: #45a049;
}

.close-button {
    background-color: #ccc;
}

.resend-message {
    margin-top: 1rem;
    color: green;
    font-size: 14px;
}

.countdown-message {
    margin-top: 1rem;
    color: red;
    font-size: 14px;
}
</style>