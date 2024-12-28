<template>
    <div class="submitted-sets">
        <h3>The set player submitted</h3>
        <ul ref="setList" v-if="submittedSets.length > 0" class="set-list">
            <li v-for="set in submittedSets" :key="set.setId">
                {{ set.Set_name }}
            </li>
        </ul>
        <p v-else>No sets submitted yet.</p>

        <div class="select-set">
            <div class="action-row">
                <select v-model="selectedSetId" class="set-dropdown">
                    <option value="" disabled>Select a set to submit</option>
                    <option v-for="set in availableSets" :key="set.SET_ID" :value="set.SET_ID">
                        {{ set.Set_name }}
                    </option>
                </select>

                <button @click="SubmitSet()" :disabled="!selectedSetId" class="submit-button">
                    {{ loading ? "Submitting..." : "Submit" }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch, nextTick } from "vue";

export default {
    name: "SubmittedSet",

    props: {
        submittedSets: Array,
        availableSets: Array,
    },

    data(){
        return{
            selectedSetId: null,
        };
    },

    methods: {
        async SubmitSet(){
            const isDuplicate = this.submittedSets.some((set) => set.Set_id === this.selectedSetId);
            if (isDuplicate) {
                alert("This set has already been submitted.");
                return;
            }

            // find the desired set
            for(let i = 0; i < this.availableSets.length; i ++){
                if(this.selectedSetId == this.availableSets[i].SET_ID){
                    this.$emit("SubmitSet", this.availableSets[i]);
                    break;
                }
            }


            // socketAPI.submitSet(roomId.value, selectedSet.SET_ID, selectedSet.SET_NAME, (response) => {
            //     if (response && response.success) {
            //         console.log("[INFO] Set submitted successfully:", selectedSet.SET_NAME);
            //         submittedSets.value.push({
            //             setId: selectedSet.SET_ID,
            //             setName: selectedSet.SET_NAME,
            //         });
            //         scrollToBottom();
            //         selectedSetId.value = null;
            //     } else {
            //         alert("Failed to submit set.");
            //         console.error("[ERROR] Failed to submit set:", response?.message || "Unknown error");
            //     }
            //     loading.value = false;
            // });
        }
    },

    // setup() {
    //     const userStore = useUserStore();

    //     const userId = computed(() => userStore.User_id);
    //     const roomId = computed(() => userStore.room);

    //     const submittedSets = ref([]);
    //     const availableSets = ref([]);
    //     const selectedSetId = ref(null);
    //     const loading = ref(false);
    //     const setList = ref(null);

    //     const fetchRoomSubmittedSets = async () => {
    //         if (!roomId.value) return;
    //         try {
    //             const response = await setAPI.fetchSubmittedSets(roomId.value);
    //             submittedSets.value = response.data.map((set) => ({
    //                 setId: set.setId,
    //                 setName: set.setName,
    //             }));
    //             console.log("Processed submittedSets:", submittedSets.value);
    //         } catch (error) {
    //             console.error("Failed to fetch submitted sets:", error.message);
    //         }
    //     };

    //     const fetchAvailableSets = async () => {
    //         if (!userId.value) return;
    //         try {
    //             const response = await setAPI.fetchUserSets(userId.value);
    //             availableSets.value = Array.isArray(response.data) ? response.data : [];
    //             console.log("Available sets fetched:", availableSets.value);
    //         } catch (error) {
    //             console.error("Failed to fetch available sets:", error.message);
    //             alert("Failed to fetch available sets. Please try again.");
    //         }
    //     };

    //     const scrollToBottom = () => {
    //         nextTick(() => {
    //             if (setList.value) {
    //                 setList.value.scrollTop = setList.value.scrollHeight;
    //             }
    //         });
    //     };

    //     socketAPI.onSetSubmitted((data) => {
    //         if (!submittedSets.value.some((set) => set.setId === data.setId)) {
    //             submittedSets.value.push({
    //                 setId: data.setId,
    //                 setName: data.setName,
    //             });
    //             scrollToBottom();
    //         }
    //     });

    //     // 監控 userId 和 roomId
    //     watch(userId, (newUserId) => {
    //         if (newUserId) fetchAvailableSets();
    //     });

    //     watch(roomId, (newRoomId) => {
    //         if (newRoomId) fetchRoomSubmittedSets();
    //     });

    //     return {
    //         userId,
    //         roomId,
    //         submittedSets,
    //         availableSets,
    //         selectedSetId,
    //         loading,
    //         handleReady,
    //         setList,
    //     };
    // },
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
