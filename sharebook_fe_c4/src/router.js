import gql from "graphql-tag";
import { createRouter, createWebHashHistory } from 'vue-router'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

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

const apolloClient = new ApolloClient({
    link: createHttpLink({ uri: 'https://apigateway-sh.herokuapp.com/' }),
    cache: new InMemoryCache()
})

async function isAuth() {
    if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        return false;
    }

    try {
        var result = await apolloClient.mutate({
            mutation: gql `
                mutation RefreshToken($refresh: Refresh!) {
                    refreshToken(refresh: $refresh) {
                    access
                    }
                }
            `,
            variables: {
                refresh: localStorage.getItem("token_refresh"),
            },
        })

        localStorage.setItem("token_access", result.data.refreshToken.access);
        return true;
    } catch {
        localStorage.clear();
        alert("Su sesión expiró, por favor vuelva a iniciar sesión");
        return false;
    }
}

router.beforeEach(async(to, from) => {
    var is_auth = await isAuth();

    if (is_auth == to.meta.requiresAuth) return true
    if (is_auth) return { name: "home" };
    return { name: "logIn" };
})

export default router;

