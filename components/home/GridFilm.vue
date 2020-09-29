<template>
  <div class="mb-3">
    <h1 class="title mt-5 mb-2">AMAZING MOVIES</h1>
    <div class="grid ">
      <div class="row">
        <div v-for="film in films" :key="film.id" class="col-lg-2 col-md-4 col-sm-6 col-6">
          <router-link :to="'movie/'+film._id" ><img class="w-100 rounded mb-2" :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2'+film.image" alt="movie-image"></router-link>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    data(){
      return{
        films:[],
      }
    },

    methods:{
      // GET ALL MOVIES 

      fetchAllFilms(){
        var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      fetch("https://nuxt-tomatoes.herokuapp.com/api/films", requestOptions)
        .then(response => response.json())
        .then(result => this.films = result.films)
        .catch(error => console.log('error', error));
      }

  


    },

    created(){
      this.fetchAllFilms();
    }

  }

</script>

<style scoped>
  .title {
    border-left: 3px solid red;
    font-weight: bold;
    color:black;
    font-size:1rem;
    padding-left:0.4rem;

  }

</style>
