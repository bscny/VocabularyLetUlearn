<template>
  <div class="submitted-sets">
    <h3>The set player submitted</h3>
    <ul ref="setList" v-if="submittedSets.length > 0" class="set-list">
      <li v-for="(set, index) in submittedSets" :key="set.setId">
        {{ set.setName }}
      </li>
    </ul>
    <p v-else>No sets submitted yet.</p>

    <div class="select-set">
      <div class="action-row">
        <select v-model="selectedSetId" class="set-dropdown" :disabled="loading">
          <option value="" disabled>Select a set to submit</option>
          <option v-for="set in availableSets" :key="set.SET_ID" :value="set.SET_ID">
            {{ set.SET_NAME }}
          </option>
        </select>

        <button @click="handleReady" :disabled="!selectedSetId || loading" class="submit-button">
          {{ loading ? "Submitting..." : "Submit" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import setAPI from "@/services/Room_API/setAPI";
import socketAPI from "@/services/Room_API/socketAPI";

export default {
  data() {
    return {
      submittedSets: [],
      availableSets: [],
      selectedSetId: null,
      userId: 2, // 預設用戶 ID
      roomId: 1, // 房間 ID
      loading: false,
    };
  },
  async created() {

    socketAPI.initRoom((roomData) => {
      this.roomId = roomData.room;
    });

    socketAPI.initUser((userData) => {
      this.User_id = userData.User_id;
      this.User_name = userData.User_name;
    });

    socketAPI.onSetSubmitted((data) => {
      console.log("[INFO] New set received:", data);
      const isDuplicate = this.submittedSets.some((set) => set.setId === data.setId);
      if (!isDuplicate) {
        this.submittedSets.push({
          setId: data.setId,
          setName: data.setName,
        });
        this.scrollToBottom();
      }
    });

    await this.fetchRoomSubmittedSets();
    await this.fetchAvailableSets();
  },
  methods: {
    // 獲取已提交的 set
    async fetchRoomSubmittedSets() {
  try {
    const response = await setAPI.fetchSubmittedSets(this.roomId);

    this.submittedSets = response.data.map((set) => ({
      setId: set.setId,
      setName: set.setName,
    }));
    console.log("Processed submittedSets:", this.submittedSets);
  } catch (error) {
    console.error("Failed to fetch submitted sets:", error.message);
  }
},

    // 獲取可選擇的 set
    async fetchAvailableSets() {
      try {
        const response = await setAPI.fetchUserSets(this.userId);
        this.availableSets = Array.isArray(response.data) ? response.data : [];
        console.log("Available sets fetched:", this.availableSets);
      } catch (error) {
        console.error("Failed to fetch available sets:", error.message);
        alert("Failed to fetch available sets. Please try again.");
      }
    },

    // 提交 set
    async handleReady() {
      if (!this.selectedSetId || !this.roomId) {
        alert("Please select a set and make sure you are in a room.");
        return;
      }
      
      // 防止重複提交
      const isDuplicate = this.submittedSets.some(
        (set) => set.setId === this.selectedSetId
      );
      if (isDuplicate) {
        alert("This set has already been submitted.");
        return;
      }

      this.loading = true;
      const selectedSet = this.availableSets.find((set) => set.SET_ID === this.selectedSetId);
      if (!selectedSet) {
        alert("Invalid set selection. Please try again.");
        this.loading = false;
        return;
      }

      socketAPI.submitSet(this.roomId, selectedSet.SET_ID, selectedSet.SET_NAME, (response) => {
        if (response && response.success) {
          console.log("[INFO] Set submitted successfully:", selectedSet.SET_NAME);
          this.submittedSets.push({
            setId: selectedSet.SET_ID,
            setName: selectedSet.SET_NAME,
          });
          this.scrollToBottom();
          this.selectedSetId = null;
        } else {
          alert("Failed to submit set.");
          console.error("[ERROR] Failed to submit set:", response?.message || "Unknown error");
        }
        this.loading = false;
      });
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

.submit-button {
  flex: 1;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
