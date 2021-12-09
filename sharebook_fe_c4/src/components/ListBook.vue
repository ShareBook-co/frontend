<template>

    <div v-if="loaded" class="informations">

        <table>
            <center>
                <tr>
                    <th>ISBN</th>
                    <th>Título</th>
                    <th>Idioma</th>
                    <th>Precio</th>
                    <th>Editorial</th>
                    <th>Grado</th>
                    <th>Autor</th>
                    <th>Estado</th>
                    <th>Usuario</th>
                </tr>
                <tr v-for="(i,book) in books" :key="i " :value="book">
                    <td>{{i.isbn}}</td>
                    <td>{{i.title}}</td>
                    <td>{{i.language}}</td>
                    <td>{{i.price}}</td>
                    <td>{{i.editorial}}</td>
                    <td>{{i.grade}}</td>
                    <td>{{i.author}}</td>
                    <td>
                        <span v-if="i.state">Disponible</span>
                        <span v-if="!i.state">Vendido</span>
                    </td>
                    <td>{{i.user}}</td>
                </tr>
            </center>
        </table>
 
    </div>

</template>

<script>
import axios from 'axios';

export default {
    name: "Book",

    data: function(){
        return {
            books: [],
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


            axios.get(`https://be-sharebook.herokuapp.com/book/`, {headers: {'Authorization': `Bearer ${token}`}})
                .then((result) => {
                    this.books = result.data;
                    this.loaded = true;
                    })
                .catch((error) => {
                    console.log(error.response.data)
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

<style>

    .informations{
        margin: 0;
        padding: 0%;
        width: 100%;
        height: 60%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
       
    }
    

    table {
        table-layout: fixed;
        border-collapse: collapse;
        border: 3px solid #72767a;
        border: 2px solid ;

        margin-bottom: -15rem;
        color: #212529;
        padding: 0px;

        overflow: scroll;
        display: block; 
        width: 90%;

        font-size: 15px;
    }

    th, td {
        padding: 10px;
        border: 3px solid #72767a;
        border: 1px solid ; 
    }

</style>



