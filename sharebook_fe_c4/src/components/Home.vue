<template>

    <!-- <div class="greetings"> -->
    <div v-if="loaded" class="greetings">
        <!-- <h1>¡Bienvenid@ <span> {{gender}} </span>!</h1> -->
        <h1>
            <span v-if="!gender">Bienvenido </span>
            <span v-if="gender">Bienvenida </span> 
            <span> {{name}} </span>
        </h1>

    </div>

</template>



<script>
import jwt_decode from "jwt-decode";
import axios from 'axios';

export default {
    name: "Home",

    data: function(){
        return {
            name: "",
            //email: "",
            //address: "",
            //phone: "",
            gender:"",
            loaded: false,
        }
    },

    methods: {
        getData: async function () {

            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                this.$emit('logOut');
                return;
            }

            await this.verifyToken();
            let token = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id.toString();

            axios.get(`https://be-sharebook.herokuapp.com/user/${userId}/`, {headers: {'Authorization': `Bearer ${token}`}})
                .then((result) => {
                    this.name = result.data.name;
                    //this.email = result.data.email;
                    //this.address = result.data.address;
                    //this.phone = result.data.phone;
                    this.gender = result.data.gender;
                    this.loaded = true;
                    })
                .catch(() => {
                    this.$emit('logOut');
                });
        },

        verifyToken: function () {
            return axios.post("https://be-sharebook.herokuapp.com/refresh/", {refresh: localStorage.getItem("token_refresh")}, {headers: {}})
                .then((result) => {
                    localStorage.setItem("token_access", result.data.access);
                })
                .catch(() => {
                    this.$emit('logOut');
                });
        }
    },

    created: async function(){
        this.getData();
    },
}
</script>

//
//export default {
//    name: "Home",
//
//    data: function(){
//        return {
//            username: localStorage.getItem('username') || "none",
//            gender: localStorage.getItem('gender'),          
//            loaded:false,
//
//        }
//    },
//}



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




