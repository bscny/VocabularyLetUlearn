<template>
    <div class="navbar">
        <div class="logo">VocabularyLetULearn</div>
        <div class="icons">
            <div v-if="!isLoggedIn" class="login-button" @click="$emit('toggleLoginModal')">登入</div>
            <div v-else class="user-info">
                <span class="username">{{ userName }}</span>
                <button @click="$emit('logout')">登出</button>
            </div>
            <div v-if="!isLoggedIn" class="register-button" @click="$emit('toggleRegisterModal')">註冊</div>
            <i class="icon">🏠</i>
            <i class="icon">📝</i>
            <i class="icon">💬</i>
            <i class="icon">⚙️</i>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isLoggedIn: Boolean,
        userName: String,
        userEmail: String
    }
};
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #333;
    color: white;
    height: 50px;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
}

.logo {
    font-size: 1.5em;
}

.icons {
    display: flex;
    align-items: center;
    gap: 15px;
}

.icon,
.login-button,
.register-button,
.username {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 10px;
    cursor: pointer;
    line-height: 50px;
}
.user-info {
    display: flex;
    align-items: center;
}

.username {
    margin-right: 10px;
}
</style>