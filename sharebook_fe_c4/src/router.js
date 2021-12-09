import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

import LogIn from './components/LogIn.vue'
import SignUp from './components/SignUp.vue'
import Home from './components/Home.vue'
import User from './components/User.vue'
import AddBook from './components/AddBook.vue'
import Book from './components/ListBook.vue'

const routes = [{
        path: '/',
        name: 'root',
        component: App
    },
    {
        path: '/user/logIn',
        name: "logIn",
        component: LogIn
    },
    {
        path: '/user/signUp',
        name: "signUp",
        component: SignUp
    },
    {
        path: '/user/home',
        name: "home",
        component: Home
    },
    {
        path: '/user/user',
        name: "user",
        component: User
    },
    {
        path: '/book/create',
        name: "addbook",
        component: AddBook
    },
    {
        path: '/book/list',
        name: "book",
        component: Book
    }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;

