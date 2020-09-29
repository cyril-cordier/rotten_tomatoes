<template>
  <div>


    <!--     CREATE FILM MODAL  -->
    <!-- Button trigger modal -->
    <button type="button" class="btn  btn-block btn-dark mt-2 mb-2" data-toggle="modal" data-target="#exampleModal">
      Create New Film
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create New Film</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="alert alert-success" v-if="success != null" role="alert">
              Film Created Successfully
            </div>
            <form @submit.prevent="createFilm()">

              <div class="form-group">
                <label for="exampleInputtitle3">Title</label>
                <input type="text" v-model="title" class="form-control" id="exampleInputtitle3" placeholder="title">
              </div>


              <button type="submit" class="btn btn-primary">Submit</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </form>
          </div>
        </div>
      </div>
    </div>




    <div class="flex flex-col mt-8">
      <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Title</th>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Year</th>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Description</th>

                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="film in films" :key="film._id">
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10"><img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                        alt="" class="h-10 w-10 rounded-full"></div>
                    <div class="ml-4">
                      <div class="text-sm leading-5 font-medium text-gray-900">{{film.title}}</div>

                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{film.year}}</div>

                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{film.description.slice(0,100)}}...</div>

                </td>
              
                <td
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                  <a href="#" class="btn btn-light btn-block">Edit</a></td>
                <td
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                  <div @click="deleteFilm(film._id)" class=" btn btn-danger btn-block">Delete</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    data() {
      return {
        films: [],
        title: '',
        success:""
      }
    },
    methods: {
      fetchAllFilms() {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch("https://nuxt-tomatoes.herokuapp.com/api/films", requestOptions)
          .then(response => response.json())
          .then(result => this.films = result.films)
          .catch(error => console.log('error', error));
      },
      deleteFilm(id) {
        var requestOptions = {
          method: 'DELETE',
          redirect: 'follow'
        };

        fetch(`https://nuxt-tomatoes.herokuapp.com/api/films/${id}`, requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

        this.fetchAllFilms();


      },


      createFilm() {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=041ddd82f7f2d3a8e4a849c8708320da&language=en&include_adult=false&query=${this.title}`,
            requestOptions)
          .then(response => response.json())
          .then(result => {


            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
              "title": result.results[0].title,
              "description": result.results[0].overview,
              "year": result.results[0].release_date,
              "image": result.results[0].poster_path,
              "api_id":result.results[0].id
            });

            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
            };

            fetch("https://nuxt-tomatoes.herokuapp.com/api/films", requestOptions)
              .then(response => response.json())
              .then(result => this.success = result.message)
              .catch(error => console.log('error', error));



          })
          .catch(error => console.log('error', error));
      },

    },


    created() {
      this.fetchAllFilms();
      this.success = null;

    }
  }

</script>

<style scoped>

</style>
