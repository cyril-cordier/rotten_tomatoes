<template>
  <div class="h-full" v-if="user">

    <div class="p-3 m-5 text-light w-85 mx-auto">
      <div class="grid grid-flow-col grid-rows-5 xl:grid-rows-1 lg:grid-rows-1 md:grid-rows-2 sm:grid-rows-5">
        <button
          class=" px-4 py-2 m-2 font-semibold transform hover:scale-105 bg-gray-100 hover:bg-red-600 focus:scale-105 focus:bg-red-600 focus:text-gray-100 hover:inner-shadow text-gray-800 hover:text-gray-100 px-2 py-1 rounded text-lg focus:outline-none shadow"
          @click="user_toggle = true, update_toggle = false, rates_toggle = false, password_toggle = false">
          Your Rotten Informations</button>
        <button
          class=" px-4 py-2 m-2 font-semibold transform hover:scale-105 bg-gray-100 hover:bg-red-600 focus:scale-105 focus:bg-red-600 focus:text-gray-100 hover:inner-shadow text-gray-800 hover:text-gray-100 px-2 py-1 rounded text-lg focus:outline-none shadow"
          @click="rates_toggle = true, update_toggle = false, user_toggle = false, password_toggle = false">
          Your movies Rates</button>
        <button
          class=" px-4 py-2 m-2 font-semibold transform hover:scale-105 bg-gray-100 hover:bg-red-600 focus:scale-105 focus:bg-red-600 focus:text-gray-100 hover:inner-shadow text-gray-800 hover:text-gray-100 px-2 py-1 rounded text-lg focus:outline-none shadow"
          @click="update_toggle = true, user_toggle = false, rates_toggle = false, password_toggle = false">
          Update your Rotten Informations</button>
        <button
          class=" px-4 py-2 m-2 font-semibold transform hover:scale-105 bg-gray-100 hover:bg-red-600 focus:scale-105 focus:bg-red-600 focus:text-gray-100 hover:inner-shadow text-gray-800 hover:text-gray-100 px-2 py-1 rounded text-lg focus:outline-none shadow"
          @click="password_toggle = true, user_toggle = false, rates_toggle = false, update_toggle = false">
          Change your Rotten Password</button>
        <button  v-if="user.admin == true" 
          class="px-4 py-2 m-2 text-center font-semibold transform hover:scale-105 bg-yellow-100 hover:bg-yellow-500 focus:scale-105 focus:bg-yellow-500 focus:text-gray-100 hover:inner-shadow text-gray-800 hover:text-gray-100 px-2 py-1 rounded text-lg focus:outline-none shadow"><a
           class="hover:text-gray-100 hover:no-underline" href="/admin">Admin
            Page</a></button>
      </div>
    </div>






    <!-- toggle user Info -->
    <div v-show="user_toggle">
      <div class="rounded-lg text-light w-85 mx-auto bg-gray-700 row">
        <img src="https://www.placecage.com/g/300/400"
          class="object-cover object-center inline-block rounded-l h-full w-4/12">


        <div class="w-6/12 inline-block p-auto m-auto">
          <div class="mb-4">
            <h2 class="text-center font-bold text-xl mb-3">Welcome into your rotten profile,<br> {{user.firstname}}
              {{user.lastname}} !</h2>
            <p class="text-center font-semibold text-l mt-3">Your email : {{user.email}}</p>


          </div>
        </div>
      </div>
    </div>





    <!-- toggle user Change Password -->
    <div v-show="password_toggle">
      <div class="rounded-lg text-light w-85 mx-auto bg-gray-700 row">
        <img src="https://www.placecage.com/g/200/300"
          class="object-cover object-center inline-block rounded-l-lg h-full w-4/12">


        <div class="w-6/12 inline-block p-auto m-auto">
          <div class="mb-4">
            <h3 class="text-center font-bold text-xl">Change my Password</h3>
            <div class="card-body">
              <div class="alert alert-success" v-if="successUpdate != null" role="alert">
                Password Updated Successfully
              </div>
              <form @submit.prevent="editPwd(user)">

                <div class="form-group">
                  <label for="exampleInputPassword2" class="font-semibold text-l ml-2">Password</label>
                  <input type="password" v-model="user.password" class="form-control" id="exampleInputPassword2"
                    placeholder="Password">
                </div>

                <button type="submit" class="btn2 rounded"><span>Update</span></button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>



    <!-- toggle user update info -->

    <div v-show="update_toggle">

      <div class="rounded-lg text-light w-85 mx-auto bg-gray-700 row">


        <div class="w-6/12 inline-block p-auto m-auto">
          <div class="mb-4">
            <h3 class="text-center font-bold text-xl">Update your Informations</h3>
          </div>
          <div class="alert alert-success" v-if="successUpdate != null" role="alert">
            User Updated Successfully
          </div>
          <form @submit.prevent="editUser(user)">

            <div class="form-group">
              <label for="exampleInputFirstname1" class="font-semibold text-l ml-2">Firstname</label>
              <input type="text" v-model="user.firstname" class="form-control" id="exampleInputFirstname1"
                placeholder="Firstname">
            </div>
            <div class="form-group">
              <label for="exampleInputLastname1" class="font-semibold text-l ml-2">Lastname</label>
              <input type="text" v-model="user.lastname" class="form-control" id="exampleInputLastname1"
                placeholder="Lastname">
            </div>
            <div class="form-group">
              <label for="exampleInputEmail2" class="font-semibold text-l ml-2">Email address</label>
              <input type="email" v-model="user.email" class="form-control" id="exampleInputEmail2"
                aria-describedby="emailHelp" placeholder="Enter email">

            </div>
            <button class="btn2 rounded" type="submit"
              @click="user_toggle = true, update_toggle = false, rates_toggle = false, password_toggle = false"><span>Submit</span></button>


          </form>
        </div>
        <img src="https://www.placecage.com/200/300"
          class="object-cover object-center inline-block rounded-r-md h-full w-4/12">

      </div>
    </div>

    <!-- toggle user feedbacks info -->
    <div v-show="rates_toggle">
      <div class="card card-search p-3 pt-4 pb-5 m-5 text-light w-85 mx-auto bg-gray-700">
        <div class="card-body">
          <h3 class="text-center font-bold text-xl">Your Movies feedback</h3>
          <div class="flex flex-col mt-8">
            <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
              <div
                class="align-middle   min-w-full shadow overflow-hidden sm:rounded-lg border-b border-r border-gray-200 bg-gray-500">
                <table class="min-w-full">
                  <thead>
                    <tr>

                      <th
                        class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                        Film</th>
                      <th
                        class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                        Rate</th>
                      <th
                        class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-800 uppercase tracking-wider">
                        Review</th>
                      <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>

                    </tr>
                  </thead>
                  <tbody class="bg-gray-100">
                    <tr v-for="feedback in feedbacks" :key="feedback._id">
                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                        <div v-if="feedback.film" class="text-sm leading-5 text-gray-900">{{feedback.film.title}}
                        </div>

                      </td>

                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                        <div class="text-sm leading-5 text-gray-900">{{feedback.rate}} ★</div>

                      </td>

                      <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"><span
                          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{{feedback.review}}</span>
                      </td>
                      <td
                        class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                        <div @click="deleteFeedback
                  (feedback._id)"><button class=" btn2 rounded"><span>Delete</span></button></div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    <div>
      <GridFilm />
    </div>



  </div>
</template>

<script>
  export default {
    data() {
      return {
        user: '',
        success: '',
        user_toggle: true,
        update_toggle: false,
        rates_toggle: false,
        password_toggle: false,
        token: null,
        feedbacks: [],
        successUpdate: "",
      }
    },
      head() {
      return {
        title: "Rotten Tomatoes | Profile",
      }
  },

    methods: {
      fetchUserMe() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${this.token}`);
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
      },

      editUser(user) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify([{
            "propName": "firstname",
            "value": user.firstname
          },
          {
            "propName": "lastname",
            "value": user.lastname
          },
          {
            "propName": "email",
            "value": user.email
          }
        ]);

        var requestOptions = {
          method: 'PATCH',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(`https://nuxt-tomatoes.herokuapp.com/api/users/${user._id}`, requestOptions)
          .then(response => response.json())
          .then(result => this.successUpdate = result.success)
          .catch(error => console.log('error', error));
      },
      editPwd(user) {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify([{
          "propName": "password",
          "value": user.password
        }]);

        var requestOptions = {
          method: 'PATCH',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch(`https://nuxt-tomatoes.herokuapp.com/api/users/${user._id}`, requestOptions)
          .then(response => response.json())
          .then(result => this.successUpdate = result.success)
          .catch(error => console.log('error', error));
      },
      fetchAllFeedbacks() {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        }

        fetch("https://nuxt-tomatoes.herokuapp.com/api/feedbacks", requestOptions)
          .then(response => response.json())
          .then(result => {


            this.feedbacks = result.avis.filter(data => data.user._id.toLowerCase().includes(this.user._id
              .toLowerCase()));
          })
          .catch(error => console.log('error', error));
      },
      deleteFeedback(id) {
        var requestOptions = {
          method: 'DELETE',
          redirect: 'follow'
        };

        fetch(`https://nuxt-tomatoes.herokuapp.com/api/feedbacks/${id}`, requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

        this.fetchAllFeedbacks();
      },


    },
    mounted() {

      this.token = localStorage.getItem('token');
      this.fetchUserMe();
            if(this.token == null){
        window.location.href="/login"
      }
    },

    created() {

      this.fetchAllFeedbacks();

      this.success = null;
      this.successUpdate = null;



    }
  }

</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Amatic+SC');


  .btn2 {
    border: none;
    display: block;
    text-align: center;
    cursor: pointer;
    text-transform: uppercase;
    outline: none;
    overflow: hidden;
    position: relative;
    color: #fff;
    font-weight: 700;
    font-size: 15px;
    background-color: #2d3748;
    padding: 15px 50px;
    margin: 0 auto;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .btn2 span {
    position: relative;
    z-index: 1;
  }

  .btn2:after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 490%;
    width: 140%;
    background: #fd0000;
    -webkit-transition: all .5s ease-in-out;
    transition: all .5s ease-in-out;
    -webkit-transform: translateX(-98%) translateY(-25%) rotate(45deg);
    transform: translateX(-98%) translateY(-25%) rotate(45deg);
  }

  .btn2:hover:after {
    -webkit-transform: translateX(-9%) translateY(-25%) rotate(45deg);
    transform: translateX(-9%) translateY(-25%) rotate(45deg);
  }

  .link {
    font-size: 20px;
    margin-top: 30px;
  }

  .link a {
    color: #000;
    font-size: 25px;
  }

</style>
