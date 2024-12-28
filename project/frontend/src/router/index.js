import { createRouter, createWebHistory } from 'vue-router'
// stage 1 basic CRUD
import UserInventory from '@/views/Page_User_inventory/UserInventory.vue'
import EditSet from '@/views/Page_User_inventory/EditSet.vue'
import HomeLoggedIn from '@/views/HomeLoggedIn.vue';
import Home from '@/views/Home.vue';
import VerifyEmail from '@/views/Page_Account/VerifyEmail.vue';
import ResetPassword from '@/views/Page_Account/ResetPassword.vue';

// stage 2, room exam
import RoomTesting from '@/views/Page_Room_Exam/RoomTesting.vue';
import TestResult from '@/views/Page_Room_Exam/TestResult.vue';
import Room from '@/views/Page_Room/Room.vue';
import CreateJoinRoom from '@/views/Page_Create_Join_Room/Create_Join_Room.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // stage 1's path
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/UserInventory',
            name: 'UserInventory',
            component: UserInventory,
        },
        {
            path: '/EditSet/:SET_ID',
            name: 'EditSet',
            component: EditSet,
        },
        {
            path: '/home-logged-in',
            name: 'HomeLoggedIn',
            component: HomeLoggedIn,
        },
        {
            path: '/verify-email',
            name: 'VerifyEmail',
            component: VerifyEmail,
        },
        {
            path: '/reset-password',
            name: 'ResetPassword',
            component: ResetPassword,
        },

        // stage 2's path
        {
            path: '/Room',
            name: 'Room',
            component: Room,
        },
        {
            path: '/create-join-room',
            name: 'CreateJoinRoom',
            component: CreateJoinRoom,
        },
        {
            path: '/RoomTesting',
            name: 'RoomTesting',
            component: RoomTesting,
        },
        {
            path: '/Room/TestResult',
            name: 'TestResult',
            component: TestResult,
        }
    ],
})

export default router;
