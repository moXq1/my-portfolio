<template>
  <the-loader></the-loader>

  <the-header></the-header>
  <the-ticker></the-ticker>
  <projects-slider></projects-slider>
  <the-contact></the-contact>
</template>

<script>
import TheHeader from "../components/TheHeader.vue"
import ProjectsSlider from "../components/ProjectsSlider.vue"
import TheContact from "../components/TheContact.vue"
import TheLoader from "../components/TheLoader.vue"
import TheTicker from "../components/TheTicker.vue"

export default {
  name: "Home",
  components: {
    TheHeader,
    ProjectsSlider,
    TheContact,
    TheLoader,
    TheTicker,
  },

  created() {
    window.scrollTo(0, 0)
  },
}
</script>
