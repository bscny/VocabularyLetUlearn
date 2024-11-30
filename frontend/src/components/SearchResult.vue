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
          <h1>{{ result.word }} {{ result.partOfSpeech.join(' ') }}</h1>
        </div>
        <p><strong>Definition:</strong> {{ result.definition }}</p>
        <p><strong>e.g.:</strong> {{ result.example }}</p>
        <p><strong>Synonyms:</strong> {{ result.synonyms.join(', ') }}</p>
        <p><strong>Antonyms:</strong> {{ result.antonyms.join(', ') }}</p>

        <div class="actionRow">
          <button class="addButton" @click="toggleSetSelector">
            ➕ Add to My Set
          </button>

          <div v-if="showSetSelector" class="setSelector">
            <label for="setSelect">Choose a Set: </label>
            <select v-model="selectedSetId" id="setSelect">
              <option v-for="set in sets" :key="set.SET_ID" :value="set.SET_ID">
                {{ set.SET_NAME }}
              </option>
              <option value="new">+ Create New Set</option>
            </select>

            <div v-if="selectedSetId === 'new'" class="newSetInput">
              <input v-model="newSetName" placeholder="Enter new set name..." />
              <button @click="createNewSet">Create</button>
            </div>

            <button @click="confirmAddToSet(result)">Confirm</button>
            <button @click="toggleSetSelector">Cancel</button>
          </div>
        </div>
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
      sets: [],
      selectedSetId: null,
      showSetSelector: false,
      newSetName: "",
      addToFolder: false,
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
        const response = await api.searchWord(this.searchTerm);
        if (response.status === 200 && response.data) {
          this.result = {
            word: response.data.word || "No word available",
            partOfSpeech: response.data.partOfSpeech || "No partOfSpeech available",
            definition: response.data.definitions?.[0] || "No definition available",
            example: response.data.examples?.[0] || "No examples available",
            synonyms: response.data.synonyms?.length ? response.data.synonyms : ["No synonyms available"],
            antonyms: response.data.antonyms?.length ? response.data.antonyms : ["No antonyms available"],
          };
        } else {
          throw new Error("Invalid API response");
        }
      } catch (err) {
        this.error = "Failed to fetch word. Please try again later.";
      } finally {
        this.loading = false;
      }
    },
    async fetchSets() {
      try {
        const userId = localStorage.getItem("userId");
        const response = await api.getSets(userId);
        this.sets = response.data;
        if (this.sets.length > 0) {
          this.selectedSetId = this.sets[0].SET_ID;
        }
      } catch (error) {
        this.sets = [];
        alert("Failed to fetch sets. Please try again.");
      }
    },
    async confirmAddToSet(wordData) {
      try {
        if (!this.selectedSetId) {
          alert("Please select a set before adding the word.");
          return;
        }

        const response = await api.addWordToSet({
          word: wordData.word,
          definitions: wordData.definition,
          sentence: wordData.example,
          set_id: this.selectedSetId,
        });

        alert(response.data.message || "Word successfully added to set.");
        this.toggleSetSelector();
      } catch (error) {
        console.error("Error adding word to set:", error);
        alert(error.response ? error.response.data.message : "Failed to add word to set. Please try again.");
      }
    },

    async createNewSet() {
      if (!this.newSetName.trim()) {
        alert("Set name cannot be empty.");
        return;
      }
      try {
        const userId = localStorage.getItem("userId");
        const response = await api.createSet({ SET_NAME: this.newSetName, userId });
        const newSet = response.data;

        this.sets.push(newSet);
        this.selectedSetId = newSet.SET_ID;
        this.newSetName = "";
        alert("Set created successfully!");
      } catch (error) {
        alert("Failed to create new set. Please try again.");
      }
    },
    toggleSetSelector() {
      this.showSetSelector = !this.showSetSelector;
    },
  },

  created() {
    const fakeUserId = 1;
    localStorage.setItem("userId", fakeUserId);
    console.log("Fake user logged in with userId:", fakeUserId);

    this.fetchSets();
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
  margin-bottom: 10px;
}

.searchInput {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.searchButton {
  padding: 10px 15px;
  font-size: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.SearchResult {
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 800px;
  height: 320px;
}

.actionRow {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.addButton {
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.setSelector {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 5px;
}
</style>
