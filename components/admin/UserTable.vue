<template>
  <div>

    <!--     CREATE USER MODAL  -->
    <!-- Button trigger modal -->
    <button type="button" class="btn  btn-block btn-dark mt-2 mb-2" data-toggle="modal" data-target="#exampleModal">
      Create New User
    </button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="alert alert-success" v-if="success != null" role="alert">
              User Created Successfully
            </div>
            <form @submit.prevent="createUser()">

              <div class="form-group">
                <label for="exampleInputFirstname3">FirstName</label>
                <input type="text" v-model="firstname" class="form-control" id="exampleInputFirstname3"
                  placeholder="Firstname">
              </div>
              <div class="form-group">
                <label for="exampleInputLastname3">Lastname</label>
                <input type="text" v-model="lastname" class="form-control" id="exampleInputLastname3"
                  placeholder="Lastname">
              </div>
              <div class="form-group">
                <label for="exampleInputEmail3">Email address</label>
                <input type="email" v-model="email" class="form-control" id="exampleInputEmail3"
                  aria-describedby="emailHelp" placeholder="Enter email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                  else.</small>
              </div>
              <div class="form-group">
                <label for="exampleInputPassword3">Password</label>
                <input type="password" v-model="password" class="form-control" id="exampleInputPassword3"
                  placeholder="Password">
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
                  FirstName</th>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  LastName</th>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Email</th>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Admin Rights</th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="user in users" :key="user._id">
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10"><img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                        alt="" class="h-10 w-10 rounded-full"></div>
                    <div class="ml-4">
                      <div class="text-sm leading-5 font-medium text-gray-900">{{user.firstname}}</div>

                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{user.lastname}}</div>

                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{user.email}}</div>

                </td>

                <td v-if="user.admin == true" class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"><span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{{user.admin}}</span>
                </td>
                      <td v-if="user.admin == false" class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"><span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">{{user.admin}}</span>
                </td>

                <td
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                  <button type="button" class="btn  btn-block btn-light" data-toggle="modal"
                    :data-target="'#exampleModal'+user._id">
                    Edit User
                  </button></td>
                <td
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                  <div class=" btn-block btn btn-danger" style="cursor:pointer;" @click="deleteUser(user._id)">Delete
                  </div>
                </td>

                <!--     USER EDIT MODAL  -->

                <!-- Button trigger modal -->


                <!-- Modal -->
                <div class="modal fade" :id="'exampleModal'+user._id" tabindex="-1" role="dialog"
                  aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="alert alert-success" v-if="successUpdate != null" role="alert">
                          User Updated Successfully
                        </div>
                        <form @submit.prevent="editUser(user)">

                          <div class="form-group">
                            <label for="exampleInputFirstname1">Firstname</label>
                            <input type="text" v-model="user.firstname" class="form-control" id="exampleInputFirstname1"
                              placeholder="Firstname">
                          </div>
                          <div class="form-group">
                            <label for="exampleInputLastname1">Lastname</label>
                            <input type="text" v-model="user.lastname" class="form-control" id="exampleInputLastname1"
                              placeholder="Lastname">
                          </div>
                          <div class="form-group">
                            <label for="exampleInputEmail2">Email address</label>
                            <input type="email" v-model="user.email" class="form-control" id="exampleInputEmail2"
                              aria-describedby="emailHelp" placeholder="Enter email">
                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone
                              else.</small>
                          </div>
<!--                           <div class="form-group">
                            <label for="exampleInputPassword2">Password</label>
                            <input type="password" v-model="user.password" class="form-control"
                              id="exampleInputPassword2" placeholder="Password">
                          </div> -->
                          <div class="form-group">
                            <label for="admin-rights">Admin</label>

                            <select name="admin" v-model="user.admin" id="admin-rights">
                              <option value="">--Please choose an option--</option>
                              <option value=false>False</option>
                              <option value=true>True</option>

                            </select>


                          </div>
                          <button type="submit" class="btn btn-primary">Submit</button>
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
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
        users: [],
        password: "",
        email: "",
        firstname: "",
        lastname: "",
        success: null,
        successUpdate: null,
      }
    },
    methods: {
      fetchAllUsers() {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };

        fetch("https://nuxt-tomatoes.herokuapp.com/api/users", requestOptions)
          .then(response => response.json())
          .then(result => this.users = result.users)
          .catch(error => console.log('error', error));
      },

      createUser() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
          "firstname": this.firstname,
          "lastname": this.lastname,
          "email": this.email,
          "password": this.password
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

        fetch("https://nuxt-tomatoes.herokuapp.com/api/users/register", requestOptions)
          .then(response => response.json())
          .then(result => this.success = result.message)
          .catch(error => console.log('error', error));
        this.fetchAllUsers();

        setTimeout(function () {
          location.reload();
        }, 2000);



      },
      deleteUser(id) {
        var requestOptions = {
          method: 'DELETE',
          redirect: 'follow'
        };

        fetch(`https://nuxt-tomatoes.herokuapp.com/api/users/${id}`, requestOptions)
          .then(response => response.json())
          .then(result => console.log(result))
          .catch(error => console.log('error', error));

        this.fetchAllUsers();


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
          },
          {
            "propName": "admin",
            "value": user.admin
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
          .then(result => this.successUpdate = result.message)
          .catch(error => console.log('error', error));

        this.fetchAllUsers();
        setTimeout(function () {
          location.reload();
        }, 2000);
      }


    },


    created() {
      this.fetchAllUsers();

    }
  }

</script>

<style scoped>

</style>
