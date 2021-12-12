<template>

    <div class="billing" id="billing">
        <div class="container_billing">
            <h2> Facturación </h2>

            <form v-on: submit.prevent="processBilling">
                
            </form>
    </div>

</template>

<script>
import gpl from "graphql-tag";
import jwt_decode from "jwt-decode";

export default {
    name: "Billing",

    data: function(){
        return {
            userId: jwt_decode( localStorage.getItem("token_refresh" ) ).user_id,
            userDetailById: {
                name: "",
                email: "",
                address: "",
                phone: 0,
            }
        };
    },

    apollo: {
        userDetailById: {
            query: gpl `
                query UserDetailById($userId: Int!) {
                    userDetailById(userId: $userId) {
                        name
                        email
                        address
                        phone
                    }
                }
            `,
            variables() {
                return {
                    userId: this.data,
                };
            }
        },
    }
};
</script>


<style scoped>
    .information{
        /* margin: 0;
        padding: 0%; */
        
        margin-inline: auto;


        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;


        border: 3px solid #72767a;
        border-radius: 10px;
        width: 25%;
        height: 60%;

    }

    .information h1{
        font-size: 20px;
        color: #0f1316;
    }

    .information h2{
        font-size: 15px;
        color: #283747;
    }

    .information span{
        color: crimson;
        font-weight: bold;
    }
</style>


