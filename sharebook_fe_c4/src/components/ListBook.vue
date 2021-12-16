<template>

    <div class="informations">

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
    import gql from "graphql-tag";

    export default {
        name: "Book",

        data: function(){
            return {
                book: {
                    bookId: 0,
                },
            };
        },

        
        methods: {
            processListBook: async function(){
                    await this.$apollo.mutate(
                        {
                            mutation: gql`
                                query BooksById($bookId: String!) {
                                  booksById(bookId: $bookId) {
                                    id
                                    isbn
                                    title
                                    language
                                    price
                                    state
                                    editorial
                                    author
                                    grade
                                  }
                                }
                            `,
                            variables: {
                                credentials: this.user,
                            },
                        }
                    )
                    
                    .then((result) => {
                        let dataUpdateBook = {
                            username: this.user.username,
                            token_access: result.data.updateBook.access,
                            token_refresh: result.data.updateBook.refresh,
                        };
                        this.$emit('completedListBook', dataUpdateBook);
                    })
                    
                    .catch((error) => {
                        console.log(error);
                        alert("ERROR 401: Credenciales Incorrectas.");

                    });
            },
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



