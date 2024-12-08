<template>
    <nav class="navbar">
        <div class="logo"  @click="GotoHomePage()">
            VocabularyLetULearn
        </div>

        <nav class="icons">
            <div v-if="!isLoggedIn" class="login-button"  @click="$emit('toggleLoginModal')">
                登入
            </div>
            <div v-else class="user-info">
                <span class="username">{{ userName }}</span>
                <button @click="$emit('logout')">登出</button>
            </div>

            <div v-if="!isLoggedIn" class="register-button"  @click="$emit('toggleRegisterModal')">
                註冊
            </div>

            <i class="icon">
                🏠
            </i>

            <i class="icon">
                📝
            </i>

            <i class="icon">
                💬
            </i>

            <i class="icon">
                ⚙️
            </i>
        </nav>
    </nav>
</template>

<script>
export default {
    props: {
        isLoggedIn: Boolean,
        userName: String,
        userEmail: String
    },

    methods: {
        GotoHomePage() {
            this.$router.push({
                name: 'Home'
            });
        }
    }
};
</script>

<style scoped>
.navbar {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 50px;
    padding: 0 20px 0 20px;
    background-color: #333;
}

.logo {
    font-size: 1.5em;
    color: white;
}

.icons {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.icon,
.login-button,
.register-button,
.username {
    margin-right: 10px;
    padding: 0 10px;
    cursor: pointer;
    line-height: 50px;

    color: white;
}
.user-info {
    display: flex;
    align-items: center;
}

.username {
    margin-right: 10px;
}
</style>