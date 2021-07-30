<template>
  <section class="notFound">
    <button class="notFound__back" @click="back">← back</button>

    <h1 class="notFound__main">404</h1>
    <h2 class="notFound__sec">Why are you still here?</h2>
  </section>
</template>

<style>
.notFound {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-direction: column;
}

.notFound__back {
  position: absolute;
  top: 5%;
  left: 5%;
  border: none;
  background: transparent;
  color: white;
  font-size: clamp(16px, 2vw, 20px);
  text-transform: uppercase;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.notFound__back:hover {
  opacity: 0.8;
}

.notFound__main {
  text-transform: uppercase;
  font-size: 10vw;
  opacity: 0.8;
}

.notFound__sec {
  font-size: 7vw;
  width: 100%;
  opacity: 0.8;
}
</style>

<script>
export default {
  methods: {
    back() {
      this.$router.go(-1)
    },
  },
}
</script>
