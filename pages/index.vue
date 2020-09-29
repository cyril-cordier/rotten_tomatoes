<template>
  <div >
    <Showcaze />
    <GridFilm />
    <div class="grid">
      <div class="row">
        <div class="col-lg-4">
          <Ranking />
        </div>
                <div class="col-lg-4">
          <Ranking />
        </div>
                <div class="col-lg-4">
          <Ranking />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {

  head() {
      return {
        title: "Rotten Tomatoes | Home",
      }
  }
}

</script>

<style>

 

</style>
