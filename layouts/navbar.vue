<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark justify-content " style="background-color:red;  ">
      <nuxt-link to="/"> <img src="https://staticv2-4.rottentomatoes.com/static/images/logos/rtlogo.png"
          class="navbar-brand" style="width:10rem;"></nuxt-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <input class="form-control mr-sm-2 w-75 " type="search" placeholder="Search Movies, Actors and more..."
          aria-label="Search">


        <ul class="navbar-nav ml-5  font-weight-bold">
          <li class="nav-item active">
            <a class="nav-link mr-2" href="/">MOVIES <span class="sr-only">(current)</span></a>
          </li>
          <li v-if="this.token == null" class="nav-item active">
            <nuxt-link to="/login" class="nav-link mr-2 rounded hover:bg-gray-700 hover:text-gray-700 transform hover:scale-110 hover:shadow focus:scale-105 focus:shadow-inner">LOGIN</nuxt-link>
          </li>
                    <li v-if="this.token != null" class="nav-item active">
            <nuxt-link   to="/profile" class="nav-link mr-2 rounded hover:bg-gray-700 hover:text-gray-700 transform hover:scale-110 hover:shadow focus:scale-105 focus:shadow-inner">PROFILE</nuxt-link>
          </li>
                    <li class="nav-item active">
            <p @click="logout()" v-if="this.token != null"  class="nav-link mr-2 rounded hover:bg-gray-700 hover:text-gray-700 transform hover:scale-110 hover:shadow focus:scale-105 focus:shadow-inner" style="cursor:pointer;">LOGOUT</p>
          </li>
        </ul>

      </div>
    </nav>
    <div class="nav-bottom ">

        <div class="grid">
          <div class="row">
            <div class="col-lg-10 mobile">
              <div class="text font-weight-bold d-flex">
                <p class="text-warning  ml-2 mr-3">TRENDING ON RT</p>
                <p class="text-light">Rotten Tomatoes Podcast Fall TV Survey Results RT Watch List Essential
                  Spanish-Language Films</p>
              </div>

            </div>
            <div class="col-lg-2">
              <div class="socials ml-5 d-flex font-weight-bold ">
                <a href="https://fr-fr.facebook.com/rottentomatoes/" target="_blank" rel="noopener noreferrer"><img
                    height="10" width="20" class="mx-3" src="../assets/facebook.png"></a>
                <a href="https://twitter.com/rottentomatoes?lang=fr" target="_blank" rel="noopener noreferrer"><img
                    height="10" width="20" class="mx-3" src="../assets/twitter.png"></a>
                <a href="https://www.instagram.com/rottentomatoes/?hl=fr" target="_blank" rel="noopener noreferrer"><img
                    height="10" width="20" class="mx-3" src="../assets/instagram.png"></a>
              </div>

            </div>
          </div>
        </div>
   

    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        token: null
      }
    },
    methods: {
      getToken() {
        this.token = localStorage.getItem('token');
      },
      logout() {
        localStorage.removeItem('token');
        window.location.href = "/";
      }
    },

    mounted() {
      this.getToken();

    }

  }

</script>

<style>
  .nav-bottom {
    background-color: rgba(99, 98, 98, 0.6);
    padding: 0 0.4rem;

  }

  .nav-bottom p {
    font-size: 0.8rem;
    padding: 0;
    margin: 0;
  }

  .socials {
    color: white;
  }

@media screen and (max-width: 640px) {
.mobile{
  display: none;
}
}

</style>
