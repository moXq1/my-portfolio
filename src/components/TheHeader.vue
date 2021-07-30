<template>
  <header class="header">
    <nav class="nav">
      <router-link to="/" class="logo">ny</router-link>
      <a href="#projects" class="works">works</a>
    </nav>
    <h1 class="text">
      <span class="maintext"> Hi. I'm Nikita.</span>

      <span class="subtext">A Front-end Developer.</span>
    </h1>

    <div class="scroll">
      <span class="scr"><span class="arrow">←</span> scroll</span>
    </div>
  </header>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Orbitron&display=swap");

:root {
  --header-size: 10vw;
}

.header {
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  height: 100%;
  position: relative;
  margin: 0 2rem;
  visibility: hidden;
}

.active {
  visibility: visible;
}

nav {
  width: 100%;
  padding-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid #fff6;
  font-size: clamp(18px, 3vw, 30px);
}

.nav a {
  transition: opacity 0.3s ease-out;
}

.nav a:hover {
  opacity: 0.8;
}

nav,
.scroll {
  text-transform: uppercase;
  font-family: "Orbitron", Helvetica, Arial, sans-serif;
}

@keyframes animMove {
  0% {
    transform-origin: center left;
    width: 0;
  }

  50% {
    width: 100%;
  }
  100% {
    /* // transform-origin: center left; */
    transform: translateX(100%);
  }
}

.nav,
.scroll,
.text,
.subtext {
  overflow: hidden;
  position: relative;
}

.maintext,
.scr {
  position: relative;
  display: block;
}

.active .nav:before,
.active .scroll:before,
.active .text:before,
.active .subtext:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 10;
  animation: animMove 1s ease forwards;
}

.scroll {
  position: absolute;
  right: 0;
  bottom: 0;

  writing-mode: vertical-rl;
  transform: rotate(180deg);
  margin-bottom: 2rem;

  font-size: clamp(12px, 2vw, 16px);
  cursor: default;
}

.scr {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.arrow {
  display: block;
  text-align: center;
  position: relative;
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

.active .nav *,
.active .scr,
.active .maintext,
.active .subtext {
  transform: translateY(0);
  transition: transform 0.5s 1s ease;
}
.nav *,
.scr,
.maintext,
.subtext {
  transform: translateY(200%);
}
</style>
