<template>
  <div>
    <div class="grid pl-3 pr-3">
      <div class="row">
        <div class="col-lg-6 pr-1 " style="padding:0;">
          <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img class="d-block w-100" src="https://s3-us-west-2.amazonaws.com/flx-editorial-wordpress/wp-content/uploads/2020/09/20211312/wandavision-keyart-700x380.jpg" alt="First slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="https://s3-us-west-2.amazonaws.com/flx-editorial-wordpress/wp-content/uploads/2019/10/08165832/watchmen-keyart-regina-king-700x380.jpg" alt="Second slide">
              </div>
              <div class="carousel-item">
                <img class="d-block w-100" src="https://s3-us-west-2.amazonaws.com/flx-editorial-wordpress/wp-content/uploads/2020/09/18124529/she-hulk-tatiana-maslany-split-700x380.jpg" alt="Third slide">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>

        </div>
        <div class="col-lg-3 pr-1 " style="padding:0;">
            <img class="w-100" style="max-height:21.9rem;" src="https://fr.web.img2.acsta.net/pictures/20/08/03/12/15/2118693.jpg">
        </div>
        <div class="col-lg-3" style="padding:0;">
            <img class="w-100" style="max-height:21.9rem;" src="https://images-na.ssl-images-amazon.com/images/I/71wbalyU7tL._AC_SL1481_.jpg">
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'showcaze',
  }

</script>

<style scoped>

</style>
