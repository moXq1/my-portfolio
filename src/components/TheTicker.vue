<template>
  <section class="ticker">
    <div class="ticker__text">
      <span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span>
    </div>
    <div class="ticker__text ticker__text--toRight">
      <span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span>
    </div>
    <div class="ticker__text">
      <span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span
      ><span class="ticker__word">projects</span>
    </div>
  </section>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Orbitron&display=swap");
.ticker {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 10rem 0 5rem;
}

.ticker__text {
  height: 9rem;
  white-space: nowrap;
}

.ticker__text--toRight .ticker__word {
  transform: translateX(-300%);
  animation: toRight 5s 0.5s linear infinite;
}

.ticker__word {
  display: inline-block;
  font-size: 4rem;
  padding-right: 4rem;
  font-weight: 900;
  animation: toLeft 5s linear infinite;
  will-change: transform;
  text-transform: uppercase;
  color: #1f1f1f;
  /* -webkit-text-stroke: 1px white; */
  text-shadow: 1px 1px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff,
    -1px 1px 0 #fff, 1px 1px 0 #fff;
  font-family: "Orbitron", Helvetica, Arial, sans-serif;
}

.ticker__text:last-of-type .ticker__word {
  animation-delay: 0.7s;
}

@keyframes toRight {
  to {
    transform: translateX(0);
  }
}

@keyframes toLeft {
  to {
    transform: translateX(-300%);
  }
}
</style>
