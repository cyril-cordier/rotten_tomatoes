<template>
  <div style="background:white;">
    <iframe class="mt-4 mx-auto shadow rounded-md w-full" height="500"
      :src="'https://www.youtube.com/embed/'+youtubeKey" frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
    <div class="content mt-4 ">
      <div class="w-85 m-auto shadow p-3">
        <div class="grid">
          <div class="row">
            <div class="col-lg-3">
              <img class="w-100 rounded shadow" :src="'https://image.tmdb.org/t/p/w185_and_h278_bestv2'+film.image"
                alt="movie-image">
              <div class="producers shadow rounded py-3 mt-3">
                <p class="text-center font-weight-bold mb-5">Producers</p>

                <div class="" v-for="producer in apiData.production_companies" :key="producer.id">

                  <img v-if="producer.logo_path" class=" mx-auto rounded mb-5 " style="width:10rem;"
                    :src="'https://image.tmdb.org/t/p/w500'+producer.logo_path" alt="producer-image">

                </div>

              </div>
            </div>
            <div class="col-lg-9 text-center">
              <div class="shadow bg-gray-100 p-5 h-full rounded-md">
              <h1 class="text-center font-bold text-3xl text-uppercase mb-3 text-gray-700">{{film.title}}</h1>
              <p class="text-weight-bold"><span class="font-italic text-gray-600">{{apiData.tagline}}</span></p>
              <div class="d-flex justify-content-center mt-5">
                <div class="count d-flex ">
                  <img src="https://www.rottentomatoes.com/static/images/icons/cf-lg.png" style="width:3rem;">
                  <p class="my-auto ml-2 font-bold text-red-800">{{apiData.vote_count}}</p>
                </div>
                <div class="count d-flex ml-5">
                  <p class="my-auto mr-2 font-bold text-red-800">{{apiData.vote_average}}</p>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Rotten_Tomatoes_positive_audience.svg/1200px-Rotten_Tomatoes_positive_audience.svg.png"
                    style="width:3rem;">
                </div>
              </div>

              <div class="description mt-5">
                <p class="text-center font-bold mb-5 text-xl underline text-gray-700">Description</p>
                <p class="font-italic text-gray-700">{{film.description}}</p>
              </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="reviews w-85 m-auto p-5 ">
        <div class="text-center font-bold text-3xl border rounded-lg bg-red-600 text-gray-100 shadow">Public Reviews
        </div>
        <div class="grid">
          <div class="row">
            <div class="col-lg-6 p-5 m-auto rounded" v-for="feedback in feedbacks" :key="feedback._id">
              <div class="content p-2 text-gray-800 rounded-md border-solid border-2 border-gray-100 bg-gray-200 ">
                <p class="text-xl font-semibold"> {{feedback.user.firstname}} {{feedback.user.lastname}} </p>
                <p class="text-xl font-medium"> Rating: {{feedback.rate}} ★ </p>
                <p class="text-base font-normal text-gray-700"> What {{feedback.user.firstname}} thought about it:</p>
                <p class="text-sm font-light text-gray-600 font-italic"> {{feedback.review}} </p>
              </div>

            </div>

          </div>
        </div>
      </div>


      <div v-if="token != null" class="review ">


        <!-- component -->
        <!-- comment form -->

        <div class="flex mx-auto items-center justify-center shadow-lg mt-12 mx-8 mb-4 max-w-lg rounded-md">

          <form @submit.prevent="createFeedback()" class="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
            <div class="alert alert-success" v-if="success != null" role="alert">
              Thanks for giving us a Feedback !
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <h2 class="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
              <div class="w-full md:w-full px-3 mb-2 mt-2">
                <label for="rate-select">Give some Stars! </label>


                <div class="rating">
                  <form>
                    <div>
                      <input v-model="rate" name="rate" id="e5" type="radio" value="5"><label for="e5">☆</label>
                      <input v-model="rate" name="rate" id="e4" type="radio" value="4"><label for="e4">☆</label>
                      <input v-model="rate" name="rate" id="e3" type="radio" value="3"><label for="e3">☆</label>
                      <input v-model="rate" name="rate" id="e2" type="radio" value="2"><label for="e2">☆</label>
                      <input v-model="rate" name="rate" id="e1" type="radio" value="1"><label for="e1">☆</label>
                    </div>
                  </form>
                </div>

                <textarea v-model="review"
                  class="bg-gray-200 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 shadow-md focus:outline-none focus:shadow-inner focus:bg-white hover:bg-white"
                  name="body" placeholder='Type Your Comment' required></textarea>
              </div>
              <div class="w-full md:w-full flex items-start md:w-full px-3">
                <div class="flex items-start w-1/2 text-gray-700 px-2 mr-auto">

                </div>
                <div class="-mr-1">
                  <input type='submit'
                    class="bg-gray-600 hover:bg-red-600 hover:inner-shadow text-gray-100 hover:text-gray-100 px-2 py-1 rounded text-lg focus:outline-none shadow mr-1"
                    value='Post Comment'>
                </div>
              </div>
            </div>
          </form>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        film: "",
        youtubeKey: '',
        apiData: '',
        review: '',
        rate: '',
        user: '',
        success: '',
        feedbacks: '',
        token: null,
      }
    },
      head() {
      return {
        title: "Rotten Tomatoes | Movie",
      }
  },
    methods: {

      // FETCH MOVIE INFO AND YOUTUBE INFO

      fetchFilmById() {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch(`https://nuxt-tomatoes.herokuapp.com/api/films/${this.$route.params.id}`, requestOptions)
          .then(response => response.json())
          .then(result => {
            this.film = result.film

            var requestOptions = {
              method: 'GET',
              redirect: 'follow'
            };

            // FETCH YOUTUBE KEY FOR IFRAME

            fetch(
                `https://api.themoviedb.org/3/movie/${result.film.api_id}/videos?api_key=041ddd82f7f2d3a8e4a849c8708320da&language=en-US`,
                requestOptions)
              .then(response => response.json())
              .then(result => this.youtubeKey = result.results[0].key)
              .catch(error => console.log('error', error));


            var requestOptions = {
              method: 'GET',
              redirect: 'follow'
            };



            // FETCH ALL DATA LIKE PRODUCERS AND MORE ! 
            fetch(
                `https://api.themoviedb.org/3/movie/${result.film.api_id}?api_key=041ddd82f7f2d3a8e4a849c8708320da&language=en-US`,
                requestOptions)
              .then(response => response.json())
              .then(result => this.apiData = result)
              .catch(error => console.log('error', error));

          })
          .catch(error => console.log('error', error));
      },


      // CREATE A FEED BACK 



      createFeedback() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "filmId": this.film._id,
          "rate": this.rate,
          "review": this.review,
          "userId": this.user._id
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("https://nuxt-tomatoes.herokuapp.com/api/feedbacks", requestOptions)
          .then(response => response.json())
          .then(result => this.success = result.message)
          .catch(error => console.log('error', error));

        setTimeout(function () {
          location.reload();
        }, 2000);


      },

      //FETCH ALL FEEDBACKS 

      fetchAllFeedbacks() {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch("https://nuxt-tomatoes.herokuapp.com/api/feedbacks", requestOptions)
          .then(response => response.json())
          .then(result => {

            this.feedbacks = result.avis.filter(data => data.film._id.toLowerCase().includes(this.film._id
              .toLowerCase()));


          })
          .catch(error => console.log('error', error));
      },


      // FETCH FOR USER DATA

      fetchUserMe() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${localStorage.getItem('token')}`);
        console.log(localStorage.getItem('token'));
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        fetch("https://nuxt-tomatoes.herokuapp.com/api/users/me", requestOptions)
          .then(response => response.json())
          .then(result => this.user = result.profile)
          .catch(error => console.log('error', error));
      }
    },

    mounted() {
      this.fetchUserMe();
      this.token = localStorage.getItem('token');
    },

    created() {
      this.fetchFilmById();
      this.fetchAllFeedbacks();

      this.success = null;

    }

  }

</script>

<style scoped>
  /*  
		 * Rating styles
		 */
  .rating {
    width: 226px;
    margin: 0 auto 1em;
    font-size: 45px;
    overflow: hidden;
  }

  .rating input {
    float: right;
    opacity: 0;
    position: absolute;
  }

  .rating a,
  .rating label {
    float: right;
    color: rgb(135, 135, 135);
    text-decoration: none;
    -webkit-transition: color .4s;
    -moz-transition: color .4s;
    -o-transition: color .4s;
    transition: color .4s;
  }

  .rating label:hover~label,
  .rating input:focus~label,
  .rating label:hover,
  .rating a:hover,
  .rating a:hover~a,
  .rating a:focus,
  .rating a:focus~a {
    color: orange;
    cursor: pointer;
  }

  .rating2 {
    direction: rtl;
  }

  .rating2 a {
    float: none
  }

</style>
