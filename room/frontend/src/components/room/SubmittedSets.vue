<template>
  <div class="submitted-sets">
    <!-- 已提交的單字集 -->
    <h3>The set player submitted</h3>
    <ul 
      ref="setList"
      v-if="submittedSets.length > 0" 
      class="set-list"
    >
      <li v-for="(set, index) in submittedSets" :key="index">
        {{ set }}
      </li>
    </ul>
    <p v-else>No sets submitted yet.</p>

    <!-- 選擇提交的新單字集 -->
    <div class="select-set">
      <div class="action-row">
        <select v-model="selectedSetId" class="set-dropdown">
          <option value="" disabled>Select a set to submit</option>
          <option v-for="set in availableSets" :key="set.SET_ID" :value="set.SET_ID">
            {{ set.SET_NAME }}
          </option>
        </select>

        <button @click="handleReady" :disabled="!selectedSetId" class="ready-button">
          Ready
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import userAPI from "@/services/Room_API/setAPI";

export default {
  data() {
    return {
      submittedSets: [], // 已提交的單字集名稱
      availableSets: [], // 可選擇的單字集
      selectedSetId: null, // 使用者選擇的單字集 ID
      userId: 2, // 預設用戶 ID
      roomId: 1, // 預設房間 ID
    };
  },
  async created() {
    await this.fetchAvailableSets();
  },
  methods: {
    async fetchAvailableSets() {
      try {
        const response = await userAPI.fetchUserSets(this.userId);
        this.availableSets = Array.isArray(response.data) ? response.data : [];
        console.log("Available sets fetched:", this.availableSets);
      } catch (error) {
        console.error("Failed to fetch available sets:", error.message);
      }
    },

    async handleReady() {
      if (!this.selectedSetId || !this.roomId) {
        alert("Please select a set and make sure you are in a room.");
        return;
      }

      try {
        const response = await userAPI.submitSet({
          setId: this.selectedSetId,
          roomId: this.roomId,
        });

        const selectedSet = this.availableSets.find(
          (set) => set.SET_ID === this.selectedSetId
        );
        if (selectedSet) {
          this.submittedSets.push(selectedSet.SET_NAME);
          this.scrollToBottom();
        }

        this.selectedSetId = null;
      } catch (error) {
        console.error("Error submitting set:", error);
        alert("Failed to submit set. Please try again.");
      }
    },

    scrollToBottom() {
      this.$nextTick(() => {
        const setList = this.$refs.setList;
        if (setList) {
          setList.scrollTop = setList.scrollHeight;
        }
      });
    },
  },
};
</script>

<style scoped>
.submitted-sets {
  background-color: #e6f7ff;
  padding: 20px;
  border: 1px solid #b3d8ff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  text-align: center;
}

.set-list {
  list-style: none;
  padding: 0;
  margin: 10px 0;
  text-align: left;
  max-height: 180px;
  overflow-y: auto;
}

.set-list li {
  padding: 10px;
  margin: 5px 0;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.action-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.set-dropdown {
  flex: 3;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.ready-button {
  flex: 1;
  background-color: #ff4d4f;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.ready-button:hover {
  background-color: #d9363e;
}
</style>
