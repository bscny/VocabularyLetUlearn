<template>
    <div class="reset-password">
      <h2>重設密碼</h2>
      <form @submit.prevent="resetPassword">
        <label for="newPassword">新密碼：</label>
        <input type="password" v-model="newPassword" id="newPassword" required />
  
        <label for="confirmPassword">確認密碼：</label>
        <input type="password" v-model="confirmPassword" id="confirmPassword" required />
  
        <button type="submit">重設密碼</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    data() {
      return {
        newPassword: '',
        confirmPassword: '',
        errorMessage: ''
      };
    },
    methods: {
      async resetPassword() {
        if (this.newPassword !== this.confirmPassword) {
            this.errorMessage = '密碼不一致';
            return;
        }

        const token = this.$route.query.token;
        try {
            await api.resetPassword({ password: this.newPassword, token: token });
            this.$router.push('/');
        } catch (error) {
            console.log('Error:', error.response);  // 查看錯誤訊息
            this.errorMessage = '重設密碼失敗，請稍後再試。';
        }
    }
    }
  };
</script>

<style scoped>
.reset-password {
  text-align: center;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f9f9f9; /* 添加背景顏色 */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  width: 300px; /* 設定固定寬度 */
}

h2 {
  color: #333;
  font-size: 24px;
  margin-bottom: 20px;
}

label {
  display: block;
  text-align: left;
  margin-bottom: 8px;
  color: #555;
  font-size: 16px;
}

input[type="password"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ddd;
  font-size: 16px;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  width: 100%;
  transition: background-color 0.3s;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

.error {
  font-size: 14px;
  color: red;
  margin-top: 10px;
}
</style>