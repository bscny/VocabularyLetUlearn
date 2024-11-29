<template>
  <header>
    <Navbar />
  </header>

  <nav>
    <LeftBarFolders  @displayWords="setCanShow($event)"/>
  </nav>

  <main style="height: 3000px;"> 
    <button class="quiz-button">
      Local Quiz
    </button>

    <input class="search-box" type="text" placeholder="Search" />

    <ul class="grid-each-word" v-if="canShow" v-for="vocabulary in words" :key="vocabulary.WORD">
      <div>
          {{ vocabulary.WORD }}
      </div>

      <div>
          {{ vocabulary.Definitions }}
      </div>

      <div>
          {{ vocabulary.Sentence }}
      </div>
    </ul>

  </main>
</template>

<script>
import Navbar from '../components/Navbar.vue';
import LeftBarFolders from '../components/LeftBarFolders.vue';
import axios from "axios";

export default {
  name: 'UserInventory',
  components: {
    Navbar,
    LeftBarFolders,
  },

  data(){
    return{
      canShow: false,
      curDisplaySetId: null,

      words: []
    };
  },

  methods: {
    setCanShow(setId){
      this.canShow = true;
      this.curDisplaySetId = setId;

      this.getWords();
    },

    async getWords(){
      const wordsData = await axios.get(`http://localhost:3000/users/folders/sets/${this.curDisplaySetId}/words`);

      this.words = wordsData.data;
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

.grid-each-word {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 0 0 300px;
  margin: 0 0 0 0;

  font-size: 20px;
}

.grid-each-word div{
  margin: 30px 0 0 0;
}
</style>