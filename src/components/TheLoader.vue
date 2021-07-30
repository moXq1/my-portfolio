<template>
  <section class="loader" v-if="isLoading">
    <div class="loader__num">{{ percent }}</div>
    <div class="loader__line"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {}
  },

  computed: {
    percent() {
      return this.$store.getters.getPercent
    },
    isLoading() {
      return this.$store.getters.getLoading
    },
  },
}
</script>

<style>
.loader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 99;

  background-color: #000;
}

.loader:before {
  content: "Loading";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 15vw;
  color: rgba(255, 255, 255, 0.1);
  text-transform: uppercase;
  font-family: "Orbitron", Helvetica, Arial, sans-serif;
}

.loader__line {
  width: 40%;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.2);
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}

.loader__line:before {
  content: "";
  position: absolute;
  width: 50%;
  height: 100%;
  left: 0;
  animation: line 1s cubic-bezier(0, 0.64, 0.79, 0.2) infinite;
  background: linear-gradient(
    to left,
    rgba(255, 255, 255, 0.4),
    white,
    rgba(255, 255, 255, 0.4)
  );
}

@keyframes line {
  from {
    transform: translateX(-100%);
  }

  to {
    transform: translateX(200%);
  }
}

.loader__num {
  font-size: 10vw;
  font-size: clamp(3rem, 10vw, 10rem);
  position: absolute;
  bottom: 0;
  right: 0;
  opacity: 0.8;
}

.loader__num:after {
  content: "%";
  margin-left: 1rem;
  font-size: clamp(1.5rem, 5vw, 5rem);
}
</style>
