<template>
  <div id="app" class="app">

    <div class="header">

      <img src="./assets/logo_libro.png">
      <!-- <h1><em>Share<span>Book®</span></em></h1> -->

    </div> 

    <div class="navigation">
        <nav>
          <button v-if="is_auth" v-on:click="loadHome"> Inicio </button>
          <button v-if="is_auth" v-on:click="loadUser"> Usuario </button>
          <button v-if="is_auth" v-on:click="loadAddBook" > Agregar Libro </button>
          <button v-if="is_auth" v-on:click="loadListBook" > Libros </button>
          <button v-if="is_auth" v-on:click="logOut"> Cerrar Sesión </button>
          <button v-if="!is_auth" v-on:click="loadLogIn" > Iniciar Sesión </button>
          <button v-if="!is_auth" v-on:click="loadSignUp" > Registrarse </button>
          
        </nav>
    </div>


    <div class="main-component">
      <router-view
        v-on:completedLogIn="completedLogIn"
        v-on:completedSignUp="completedSignUp"
        v-on:logOut="logOut"
      >
      </router-view>
    </div>

    <div class="footer">
      <h2>Misión TIC 2022</h2>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'App',

    computed: {
      is_auth: {
        get: function() {
          return this.$route.meta.requiresAuth;
        },
        set: function() { }
      }
    },

    methods:{
      loadHome: function () {
        this.$router.push({ name: "home" });
      },
      
      loadUser: function () {
        this.$router.push({ name: "user" });
      },

      logOut: function () {
        localStorage.clear();
        alert("Sesión Terminada");
        this.loadLogIn();
      },
      
      loadLogIn: function(){
        this.$router.push({name: "logIn"})
      },
      
      loadSignUp: function(){
          this.$router.push({name: "signUp"})
      },

      completedLogIn: function(data){
          localStorage.setItem('username', data.username);
          localStorage.setItem('token_refresh', data.token_refresh);
          localStorage.setItem('token_access', data.token_access);
          alert("Autenticación Exitosa");
          this.loadHome;
      },
      
      loadAddBook: function () {
        this.$router.push({ name: "addbook" });
      },
      
      loadListBook: function () {
        this.$router.push({ name: "book" });
      },

      completedSignUp: function(data) {
          alert("Registro Exitoso");
          this.completedLogIn(data);
      },
    },

    created: function(){
    }
  }
</script>

<style>
  body{
    margin: 0 0 0 0;
  }

  .header img{
    height: 210%;

  }

  .header{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 10vh;
    min-height: 100px;

    background-color: #ADD8E6 ;
    color:#E5E7E9 ;

    display: flex;
    /* justify-content: space-between; */
    justify-content: center;
    align-items: center;
  }

  .header h1{
    width: 20%;
    text-align: center;

    font-size: 4em;
    font-weight: normal;
  }

  .header em{
    color: #1E90FF;
  }

  .header span{
    color: #00008B;
  }

  .navigation nav {
    height: 100%;
    width: 20%;

    margin: 1%;

    display: flex;
    /* justify-content: space-around; */
    justify-content: center;
    align-items: center;

    font-size: 20px;

    width: 100%;
    background-color: #FDFEFE ;
 
  }

  .navigation nav button{
    /* color: #E5E7E9; */
    /* background: #1E90FF; */
    /* border: 1px solid #E5E7E9; */

    border-radius: 5px;
    padding: 10px 20px;

    background-color: transparent;
    border: none;
    color: #00008B;
    font-weight: bold;
    cursor: pointer;
  }

  .navigation nav button:hover{
    color: #283747;
    background: #E5E7E9;
    border: 1px solid #E5E7E9;
  }

  .main-component{
    /* height: 75vh; */
    height: 90vh;
    /* margin: 0%; */
    margin: 2%;
    padding: 0%;

    background: #FDFEFE ;
  }

  .footer{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 10vh;
    min-height: 100px;

    background-color: #ADD8E6;
    color: #1E90FF;
  }

  .footer h2{
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
