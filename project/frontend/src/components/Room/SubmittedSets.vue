<template>
    <div class="submitted-sets">
        <h3>The set player submitted</h3>
        <ul ref="setList" v-if="submittedSets.length > 0" class="set-list">
            <li class="set-used" v-for="set in submittedSets" :key="set.Set_id">
                <button class="unsbmit-button" v-if="USER_ID == rootPlayer.User_id" @click="RemoveSet(set)">
                    &#8722;
                </button>

                <div>
                    {{ set.Set_name }}
                </div>
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

export default {
    name: "SubmittedSet",

    props: {
        submittedSets: Array,
        availableSets: Array,
        rootPlayer: Object,
    },

    data(){
        return{
            selectedSetId: null,

            USER_ID: JSON.parse(localStorage.getItem("USER_ID")),
        };
    },

    methods: {
        RemoveSet(set){
            this.$emit("RemoveSet", set);
        },

        SubmitSet(){
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
        }
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

.set-used {
    display: flex;

    flex-direction: row;
    align-items: center;
    justify-content: start;
}

.unsbmit-button {
    padding: 0.5vh .5vw;
    background-color: #d45959;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    margin-right: 0.5vw;
}

.unsbmit-button:hover {
    background-color: #db3232;
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
