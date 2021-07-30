<template>
  <div class="bg-lines">
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
    <div class="line"></div>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  mounted() {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)

    window.addEventListener("resize", () => {
      let vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    })
  },
}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700;900&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Orbitron&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

  scrollbar-width: none;
  scrollbar-color: black rgba(0, 0, 0, 0.3);
}

html {
  scroll-behavior: smooth;
  font-family: "Noto Serif JP", Helvetica, Arial, sans-serif;
}

body {
  overflow-x: hidden;
  height: 95vh;
  max-height: 95vh;
  font-family: "Noto Serif JP", Helvetica, Arial, sans-serif;
}

*::-webkit-scrollbar {
  width: 0em;
  height: 0em;
}

/* *::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

*::-webkit-scrollbar-thumb {
  background-color: #151515;
  outline: 1px solid slategrey;
} */

#app {
  font-family: "Noto Serif JP", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: transparent;
  color: white;
  height: 100%;
}

.bg-lines {
  position: fixed;
  width: 100%;
  height: 100vh;
  /* height: calc(var(--vh, 1vh) * 100); */
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-around;
  background-color: #1f1f1f;
  z-index: -1;
}

.line {
  width: 1px;
  background-color: white;
  height: 100%;
  opacity: 0.3;
}

a {
  text-decoration: none;
  color: white;
}
</style>
