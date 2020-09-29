<template>
  <div>
    <div class="flex flex-col mt-8">
      <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  User</th>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Film</th>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Rate</th>
                <th
                  class="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Review</th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>

              </tr>
            </thead>
            <tbody class="bg-white">
              <tr v-for="feedback in feedbacks" :key="feedback._id">
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10"><img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=2&amp;w=256&amp;h=256&amp;q=80"
                        alt="" class="h-10 w-10 rounded-full"></div>
                    <div class="ml-4">
                      <div v-if="feedback.user" class="text-sm leading-5 font-medium text-gray-900">
                        {{feedback.user.firstname}}{{feedback.user.lastname}}</div>

                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div v-if="feedback.film" class="text-sm leading-5 text-gray-900">{{feedback.film.title}}</div>

                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <div class="text-sm leading-5 text-gray-900">{{feedback.rate}}</div>

                </td>

                <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200"><span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{{feedback.review}}</span>
                </td>
                <td
                  class="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-200 text-sm leading-5 font-medium">
                  <div @click="deleteFeedback
                  (feedback._id)" class=" btn btn-danger btn-block">Delete</div>
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
        feedbacks: [],
      }
    },
    methods: {
      fetchAllFeedbacks() {
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        }

        fetch("https://nuxt-tomatoes.herokuapp.com/api/feedbacks", requestOptions)
          .then(response => response.json())
          .then(result => this.feedbacks = result.avis)
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


    created() {
      this.fetchAllFeedbacks();

    }
  }

</script>

<style scoped>

</style>
