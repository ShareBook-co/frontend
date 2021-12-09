<template>

    <div class="addBook_user">
        <div class="container_add_book">
            <h2>Agregar Libro</h2>

            <form v-on:submit.prevent="processAddBook" >
                <input type="text" v-model="book.isbn" placeholder="ISBN">
                <br>
                <input type="text" v-model="book.title" placeholder="Título">
                <br>
                <input type="text" v-model="book.language" placeholder="Idioma">
                <br>
                <input type="number" v-model="book.price" placeholder="Precio">
                <br>
                <!-- <input type="number" v-model="book.editorial" placeholder="Editorial"> -->
                <label >Editorial</label>
                <select v-model="book.editorial">
                    <option disabled selected>Selecione la editorial</option>
                    <option value=1>Alfaguara</option>
                    <option value=2>Norma</option>
                    <option value=3>Planeta</option>
                    <option value=4>Silaba</option>
                    <option value=0>Otro</option>  
                </select>                
                <br>
                <!-- <input type="number" v-model="book.author" placeholder="Autor"> -->
                <label >Autor</label>
                <select v-model="book.author">
                    <option disabled selected>Selecione el autor</option>
                    <option value=1>Gabriel Garcia M</option>
                    <option value=2>Julia Mercedes Castilla</option>
                    <option value=3>Aurelio Baldor</option>
                    <option value=4>Pablo Neruda</option>                 
                    <option value=0>Otra</option>     
                </select>
                <br>
                <!-- <input type="number" v-model="book.grade" placeholder="Grado"> -->
                
                <label >Grado</label>
                <select v-model="book.grade">
                    <option disabled selected>Selecione el grado</option>
                    <option value=1>Primero</option>
                    <option value=2>Segundo</option>
                    <option value=3>Tercero</option>
                    <option value=4>Cuarto</option>
                    <option value=5>Quinto</option>
                    <option value=6>Sexto</option>
                    <option value=7>Séptimo</option>
                    <option value=8>Octavo</option>
                    <option value=9>Nóveno</option>
                    <option value=10>Décimo</option>
                    <option value=11>Once</option>
                    <option value=0>Otro</option>
                </select>
                <br>
                <button type="submit">Agregar Libro</button>
            </form>
        </div>

    </div>

</template>

<script>
import jwt_decode from "jwt-decode";
import axios from 'axios';
import ListBookVue from './ListBook.vue';

export default {
    name: "AddBook",

    data: function(){
        return {
            book: {
                isbn: "",
                title: "",
                language: "",
                price: "",
                state: true,
                editorial: "",
                grade: "",
                author: [],
                user: "",
            }
        }
    },

    methods: {
        processAddBook: async function(){
            if (localStorage.getItem("token_access") === null || localStorage.getItem("token_refresh") === null) {
                this.$emit('logOut');
                return;
            }

            await this.verifyToken();
            let token = localStorage.getItem("token_access");
            let userId = jwt_decode(token).user_id.toString();

            this.book.user = userId
            this.book.author = [this.book.author]

            axios.post(`https://be-sharebook.herokuapp.com/book/`,this.book,{headers: {'Authorization': `Bearer ${token}`}})


                .then((result) => {
                    alert("Registro Exitoso");
                })
                .catch((error) => {
                    console.log(error)
                    alert("ERROR: Fallo en el registro.");
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

    }
}
</script>

<style>
    .addBook_user{
        margin: 0;
        padding: 0%;
        height: 100%;
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container_add_book {
        border: 3px solid #283747;
        border-radius: 10px;
        width: 25%;
        height: 100%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .addBook_user h2{
        color: #283747;

    }

    .addBook_user form{
        width: 70%;

    }

    .addBook_user input, select{
        height: 40px;
        width: 100%;

        box-sizing: border-box;
        padding: 10px 20px;
        margin: 5px 0;

        border: 1px solid #283747;
    }

    .addBook_user button{
        width: 100%;
        height: 50px;

        color: #E5E7E9;
        background: #283747;
        border: 1px solid #E5E7E9;

        border-radius: 5px;
        padding: 10px 25px;
        margin: 5px 0 25px 0;

    }

    .addBook_user button:hover{
        color: #E5E7E9;
        background: crimson;
        border: 1px solid #283747;
    }

</style>

