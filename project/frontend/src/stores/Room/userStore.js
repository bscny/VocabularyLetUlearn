import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
    state: () => ({
        User_id: null,
        User_name: null,
        room: null,
    }),
    actions: {
        setUser({ User_id, User_name }) {
            this.User_id = User_id;
            this.User_name = User_name;
        },
        setRoom(room) {
            this.room = room;
        },
    },
});
