<template>
  <div class="home">
    <Navbar />
      <div class="main-layout">
          <FolderSetSlide />
          <button class="action-button">Click Me</button>
          <input class="search-box" type="text" placeholder="Search..." />
      </div>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import Content from '../components/Content.vue';
import FolderSetSlide from '../components/FolderSetSlide.vue';

export default {
  name: 'UserInventory',
  components: {
    Navbar,
    Content,
    FolderSetSlide,
  }
}
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
  width: 100vw;
}

.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 20;
}

.navbar-left {
  display: flex;
  align-items: center;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 15px;
}

.main-layout {
  display: flex;
  flex-grow: 1;
  margin-top: 60px;
  overflow: hidden;
}

.action-button {
  margin-left: 80px; /* Adjust spacing between FolderSetSlide and button */
  margin-bottom: 100px;
  height: 50px;
  align-self: flex-start; /* Align button to the top if needed */
  background-color: #4caf50; /* Example styling */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #45a049;
}

.search-box {
  margin-left: 80px; /* Align with the button */
  width: 500px; /* Adjust as needed */
  height: 80px;
  padding: 5px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-box:focus {
  border-color: #4caf50;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

@media (max-width: 600px) {
  .navbar {
      flex-direction: column;
      align-items: flex-start;
  }
  .icons {
      gap: 10px;
  }
  .icon {
      font-size: 1em;
  }
}
</style>