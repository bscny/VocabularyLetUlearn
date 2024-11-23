<template>
  <div id="app">
    <header>
      <div id="site-name">VocabularyLetsULearn</div>
      <div class="button-group">
        <button @click="onButtonClick('Button 1')">Button 1</button>
        <button @click="onButtonClick('Button 2')">Button 2</button>
        <button @click="onButtonClick('Button 3')">Button 3</button>
        <button @click="onButtonClick('Button 4')">Button 4</button>
        <button @click="onButtonClick('Button 5')">Button 5</button>
      </div>
    </header>
    <div class="content">
      <div class="search-container">
        <div class="search-box">
          <button @click="onSearch" class="search-button">Search</button>
          <input 
            type="text" 
            placeholder="Enter text here" 
            v-model="searchInput"
          />
        </div>
        <div class="action-buttons">
          <button @click="onAction('Set')">Set</button>
          <button @click="onAction('Ranking Exam')">Ranking Exam</button>
          <button @click="onAction('Room')">Room</button>
        </div>
        <div class="dashboard">
          <!-- Display search results or any dynamic content -->
          {{ dashboardContent }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchInput: '', // Bound to the input box
      dashboardContent: 'Dashboard Area', // Placeholder for dashboard content
    };
  },
  methods: {
    onSearch() {
      // Handle search action
      //this.dashboardContent = `Search Results for: "${this.searchInput}"`;
      alert(`Search button clicked!`);
    },
    onAction(action) {
      // Handle Set, Ranking Exam, or Room button actions
      alert(`${action} button clicked!`);
    },
    onButtonClick(button) {
      // Handle top navigation button clicks
      alert(`${button} clicked!`);
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
#app {
  width: 100%;
}
header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f8f8f8;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
}
#site-name {
  font-size: 16px;
  font-weight: bold;
}
.button-group {
  display: flex;
  gap: 10px;
}
.button-group button {
  padding: 5px 10px;
  font-size: 14px;
  cursor: pointer;
}
.content {
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
}
.search-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
}
.search-box {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 20px;
}
.search-box input {
  flex: 1;
  height: 25vh;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.search-box .search-button {
  width: 20%;
  font-size: 16px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  height: auto;
}
.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 10px;
}
.action-buttons button {
  width: 20%; /* Adjust width to be the same as search button */
  font-size: 14px;
  padding: 8px;
  cursor: pointer;
  box-sizing: border-box;
}
.dashboard {
  width: 80%; /* Matches the search box width */
  height: 30vh;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  overflow-y: auto;
  background-color: #f9f9f9;
  margin-top: 20px;
  margin-left: auto; /* Align the dashboard to the right */
}
</style>
