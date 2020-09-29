/* eslint-disable */
<template>
  <div class=" m-auto" style="width:70%">
    <Navbar />
     <Nuxt />
     <Footer />
  </div>
</template>
<script>
import Navbar from './navbar'
import Footer from './footer'
export default {
  components:{
    Navbar,
    Footer,
  }
}
</script>

<style>
html {
  font-family:
    'Helvetica',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  border:0;
  padding:0;
  box-sizing: border-box;

}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

</style>
