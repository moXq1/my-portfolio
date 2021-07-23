<template>
  <the-header></the-header>
  <projects-slider></projects-slider>
  <the-contact></the-contact>
</template>

<style lang=""></style>

<script>
import TheHeader from "../components/TheHeader.vue"
import ProjectsSlider from "../components/ProjectsSlider.vue"
import TheContact from "../components/TheContact.vue"

export default {
  name: "Home",
  components: {
    TheHeader,
    ProjectsSlider,
    TheContact,
  },
}
</script>
