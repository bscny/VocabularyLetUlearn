<template>
  <div class="verify-email">
    <div v-if="loading" class="loading">驗證中，請稍候...</div>
    <div v-if="verified" class="verified">
      <p>驗證成功！我們將會在 {{ countdown }} 秒後跳轉到首頁。</p>
      <button class="jump-button" @click="goToHome">立即跳轉</button>
    </div>
    <div v-if="error" class="error">驗證失敗，請稍後再試。</div>
  </div>
</template>

<script>
import api from '../services/api';

export default {
  data() {
    return {
      loading: true,
      verified: false,
      error: false,
      countdown: 5
    };
  },
  created() {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    
    if (token) {
      this.verifyEmail(token);
    } else {
      this.error = true;
      this.loading = false;
    }
  },
  methods: {
    verifyEmail(token) {
      api.verifyEmail(token)
        .then(response => {
          this.loading = false;
          if (response.data.message === 'Email verified successfully') {
            this.verified = true;
            this.startCountdown();
          } else {
            this.error = true;
          }
        })
        .catch(() => {
          this.loading = false;
          this.error = true;
        });
    },
    startCountdown() {
      const interval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown -= 1;
        } else {
          clearInterval(interval);
          this.goToHome();
        }
      }, 1000);
    },
    goToHome() {
      this.$router.push({ name: 'home' });
    }
  }
};
</script>

<style scoped>
.verify-email {
  text-align: center;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.loading {
  font-size: 18px;
}

.verified {
  font-size: 20px;
  color: green;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.verified p {
  margin-bottom: 10px;
}

.error {
  font-size: 18px;
  color: red;
}

.jump-button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.jump-button:hover {
  background-color: #45a049;
}
</style>