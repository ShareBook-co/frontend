import { createRouter, createWebHashHistory }         from 'vue-router'
import gql                                            from "graphql-tag"
import { ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client/core'

import LogIn   from './components/LogIn.vue'
import SignUp  from './components/SignUp.vue'
import Home    from './components/Home.vue'
import User    from './components/User.vue'
import AddBook from './components/AddBook.vue'
import Book    from './components/ListBook.vue'

const routes = [
    {
        path      : '/user/logIn',
        name      : "logIn",
        component : LogIn,
        meta      : {
            requiresAuth: false,
        }
    },
    {
        path      : '/user/signUp',
        name      : "signUp",
        component : SignUp,
        meta      : {
            requiresAuth: false,
        }
    },
    {
        path      : '/user/home',
        name      : "home",
        component : Home,
        meta      : {
            requiresAuth: true,
        }
    },
    {
        path: '/user/user',
        name: "user",
        component: User,
        meta     : {
            requiresAuth: true,
        }
    },
    {
        path: '/book/create',
        name: "addbook",
        component: AddBook,
        meta     : {
            requiresAuth: true,
        }
    },
    {
        path: '/book/list',
        name: "book",
        component: Book,
        meta     : {
            requiresAuth: true,
        }
    },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const apolloClient = new ApolloClient({
    link: createHttpLink({ 
        uri: 'https://educal.herokuapp.com/'
    }),
    cache: new InMemoryCache()
});

async function isAuth() {
    if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
        return false;
    }

    try {
        var result = await apolloClient.mutate(
            {
                mutation: gql `
                mutation RefreshToken($refresh: Refresh!) {
                    refreshToken(refresh: $refresh) {
                      access
                    }
                  }
                `,
                variables: {
                    refresh: {
                        refresh: localStorage.getItem("token_refresh")
                    }                    
            }
        }
    )

        localStorage.setItem("token_access", result.data.refreshToken.access);
        return true;
    } 
    catch(error) {
        localStorage.clear();
        alert("Su sesi??n expir??, por favor vuelva a iniciar sesi??n");
        return false;
    }
}

router.beforeEach(async(to, from) => {
    console.log(`Redirecting from ${from.name} to ${to.name}...`);
    let is_auth = await isAuth();

    if (is_auth == to.meta.requiresAuth) 
        return true;

    if (is_auth)
        return { name: "home" };
    else
        return { name: "logIn" };
});


export default router;

