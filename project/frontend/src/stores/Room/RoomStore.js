import { defineStore } from "pinia";

// just an example, fell free to create ur own one
// How to use? just goto the component u want to acess roomID: 
//    import { 
//        useRoomStore,
//    } from "@/stores/Room/RoomStore.js";
//    
// in the data() area:
//    room: useRoomStore(),
//
// now you can just use room.roomID to acess the id variables

const useRoomStore = defineStore('RoomStore', {
    state: () => ({
        roomID: null,
    }),

    actions: {
        
    }
});


export{
    useRoomStore,
};