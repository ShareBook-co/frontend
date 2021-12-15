<template>

    <!-- <div class="greetings"> -->
    <div class="greetings">
        <!-- <h1>¡Bienvenid@ <span> {{gender}} </span>!</h1> -->
        <h1> Bienvenido <span> {{ userDetailById.name }} </span>! </h1>
    </div>

</template>



<script>
import gql         from "graphql-tag";
import jwt_decode from "jwt-decode";


export default {
    name: "Home",

    data: function(){
        return {
            userId: jwt_decode( localStorage.getItem("token_refresh" ) ).user_id,
            userDetailById: {
                name: "",
            }
        };
    },

    apollo: {
        userDetailById: {
            query: gql `
                query UserDetailById($userId: Int!) {
                    userDetailById(userId: $userId) {
                        name
                    }
                }
            `,
            variables() {
                return {
                    userId: this.userId,
                };
            }
        },
    }
};
</script>



<style>
    .greetings{
        margin: 0;
        padding: 0%;
        height: 60%;
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .greetings h1{
        font-size: 30px;
        color: #283747;
    }

    .greetings span{
        color: crimson;
        font-weight: bold;
    }
</style>