<template>
  <header>
    <nav>
      <a href="#" class="logo">ny</a>
      <a href="#" class="works">works</a>
    </nav>
    <h1 class="text">
      Hi. I'm Nikita.
      <span class="subtext">A Front-end Developer.</span>
    </h1>
    <a href="#" class="scroll">scroll</a>
  </header>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Orbitron&display=swap");

:root {
  --header-size: 10vw;
}

header {
  height: 100vh;
  position: relative;
  margin: 0 2rem;
}

nav {
  width: 100%;
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
nav,
.scroll {
  text-transform: uppercase;
  font-family: "Orbitron", Helvetica, Arial, sans-serif;
  font-size: clamp(18px, 3vw, 30px);
}

.scroll {
  position: absolute;
  right: 0;
  bottom: 0;
  writing-mode: vertical-rl;
  transform: rotate(180deg);
  margin-bottom: 2rem;
}

.text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: 900;
  font-size: var(--header-size);
  line-height: 1.2;
}

.subtext {
  font-size: calc(var(--header-size) / 3);
}
</style>
