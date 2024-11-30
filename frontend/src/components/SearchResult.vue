<template>
  <div class="container">
    <div class="searchBox">
      <input
        v-model="searchTerm"
        class="searchInput"
        placeholder="Search vocabulary..."
        @keydown.enter="searchButton"
      />
      <button
        class="searchButton"
        :disabled="loading"
        @click="searchButton"
      >
        {{ loading ? "Loading..." : "Search" }}
      </button>
    </div>

    <div :class="['SearchResult', { hidden: !result || !Object.keys(result).length }]">
      <template v-if="result && Object.keys(result).length">
        <div class="wordRow">
          <h1>{{ result.word }}  {{ result.partOfSpeech.join(' ') }}</h1>

        </div>
        <p><strong>Definition:</strong> {{ result.definition }}</p>
        <p><strong>e.g.:</strong> {{ result.example }}</p>
        <p><strong>Synonyms:</strong> {{ result.synonyms.join(', ') }}</p>
        <p><strong>Antonyms:</strong> {{ result.antonyms.join(', ') }}</p>
        <button class="addButton"  @click="addToSet(result)">➕ Add to My Set</button>
      </template>
      <template v-else>
        <p class="placeholder">Start searching to see the results here...</p>
      </template>
    </div>

    <p v-if="loading">Loading...</p>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import api from "@/services/api";

export default {
  data() {
    return {
      searchTerm: "",
      result: null,
      loading: false,
      error: null,
    };
  },
  methods: {
    async searchButton() {
      if (!this.searchTerm.trim()) {
        alert("Please enter a word to search.");
        return;
      }

      this.loading = true;
      this.error = null;

      try {
        console.log("Sending request for:", this.searchTerm);
        const response = await api.searchWord(this.searchTerm);

        if (response.status === 200 && response.data) {
          console.log("API Response:", response.data);

          this.result = {
            word: response.data.word || "No word available",
            partOfSpeech: response.data.partOfSpeech || "No partOfSpeech available",
            definition: response.data.definitions?.length ? response.data.definitions[0] : "No definition available",
            example: response.data.examples?.length ? response.data.examples[0] : "No examples available",
            synonyms: response.data.synonyms?.length ? response.data.synonyms : ["No synonyms available"],
            antonyms: response.data.antonyms?.length ? response.data.antonyms : ["No antonyms available"],
          };

          console.log("Processed Result:", this.result);
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err) {
        console.error("Error searching word:", err);
        this.error = "Failed to fetch word. Please try again later.";
      } finally {
        this.loading = false;
      }
    },

    async addToSet(wordData) {
    try {
        const response = await api.addWordToSet({
            word: wordData.word,
            definitions: wordData.definition,
            sentence: wordData.example,
            is_marked: 0,
            num_test: 0,
            num_wrong: 0,
        });

        alert(response.data.message || "Word successfully added to vocabulary set.");
        console.log("Added to set:", response.data.data);
    } catch (error) {
        console.error("Error adding word to set:", error);
        alert("Failed to add word to vocabulary set. Please try again.");
    }
}
  },
};

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.searchBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 25px;
}

.searchInput {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.searchButton {
  padding: 10px 15px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.searchButton:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.searchButton:hover {
  background-color: #0056b3;
}

.SearchResult {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 800px;
  height: 300px;
  overflow: hidden;
  transition: all 0.3s ease;
  opacity: 1;
  font-size: 18px;
}

.SearchResult.hidden {
  opacity: 0;
  pointer-events: none;
}

.wordRow {
  display: flex;
  align-items: center;
  gap: 10px;
}

.wordRow h1 {
  margin: 10px;
  font-size: 24px;
}

.placeholder {
  color: #999;
  font-size: 16px;
  text-align: center;
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;
}

.error {
  color: red;
  margin-top: 15px;
}

.addButton {
  position: absolute;
  bottom: 15px;
  right: 15px;
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
}

.addButton:hover {
  background-color: #e0e0e0;
}
</style>
