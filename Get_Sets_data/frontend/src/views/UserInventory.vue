<template>
  <header>
    <Navbar />
  </header>

  <nav>
    <LeftSideBar />
  </nav>

  <main style="height: 3000px;"> 
    <button class="quiz-button">
      Local Quiz
    </button>

    <input class="search-box" type="text" placeholder="Search" />

    <ul class="vocabulary" v-for="vocabulary in words" :key="vocabulary.word">
      <div>
        {{ vocabulary.word }}
      </div>

      <div>
        {{ vocabulary.def }}
      </div>

      <div class="eg">
        {{ vocabulary.eg }}
      </div>
    </ul>
  </main>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import LeftSideBar from '../components/LeftSideBar.vue';

export default {
  name: 'UserInventory',
  components: {
    Navbar,
    LeftSideBar,
  },

  data() {
    return {
      words: [
        {word: "apple", def: "a red fruit", eg: "i have an apple"},
        {word: "banana", def: "a yellow fruit", eg: "i have an banana"}
      ]
    }
  }
}
</script>

<style scoped>
.quiz-button {
  display: block;
  margin: 100px 0 0 250px;
  padding: 10px 20px 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  z-index: 100;
}

.quiz-button:hover {
  background-color: #288d2e;
}

.search-box {
  display: block;
  margin: 10px 0 0 250px;
  padding: 5px 10px;
  font-size: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.search-box:focus {
  border-color: #4caf50;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.vocabulary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 0 0 300px;
  margin: 50px 0 0 0;

  font-size: 20px;
}

.vocabulary .eg{
  margin: 30px 0 0 0;
}
</style>