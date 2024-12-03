<template>
    <div class="content">
        <h1>這是首頁</h1>
        <div class="login-area">
            <span v-if="!isLoggedIn">請登入</span>
            <span v-if="isLoggedIn">歡迎回來，{{ userName }}</span>
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
.home {
    display: flex;
    flex-direction: column;
    height: 100vh; 
}

.content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 20px;
    background-color: #f9f9f9;
}
</style>