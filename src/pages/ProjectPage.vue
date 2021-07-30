<template>
  <article class="project-page">
    <nav class="project-navigation">
      <router-link to="/" class="back">
        <svg class="icon">
          <g id="arrow-bent-back" fill="white">
            <path
              d="M38 17H8.82843C7.04662 17 6.15428 19.1543 7.41421 20.4142L17.5 30.5L16 32L0 16L16 0L17.5 1.5L7.41422 11.5858C6.15429 12.8457 7.04662 15 8.82843 15H38V17Z"
            ></path>
            <path
              d="M38 15C40.1012 15 42.1817 15.4139 44.1229 16.2179C46.0641 17.022 47.828 18.2006 49.3137 19.6863C50.7994 21.172 51.978 22.9359 52.7821 24.8771C53.5862 26.8183 54 28.8988 54 31C54 33.1012 53.5862 35.1817 52.7821 37.1229C51.978 39.0641 50.7994 40.828 49.3137 42.3137C47.828 43.7994 46.0641 44.978 44.1229 45.7821C42.1817 46.5861 40.1012 47 38 47V45C39.8385 45 41.659 44.6379 43.3576 43.9343C45.0561 43.2307 46.5995 42.1995 47.8995 40.8995C49.1995 39.5995 50.2307 38.0561 50.9343 36.3576C51.6379 34.659 52 32.8385 52 31C52 29.1615 51.6379 27.341 50.9343 25.6424C50.2307 23.9439 49.1995 22.4005 47.8995 21.1005C46.5995 19.8005 45.0561 18.7693 43.3576 18.0657C41.659 17.3621 39.8385 17 38 17V15Z"
            ></path>
          </g>
        </svg>
      </router-link>
    </nav>
    <section class="work">
      <div class="work__img">
        <img :src="img.img" :alt="img.title" />
      </div>

      <h1 class="work__title">
        {{ img.title }}
      </h1>
      <div class="work__info">
        <h2 class="work__header">About the project.</h2>
        <p class="work__text">
          {{ img.info }}
        </p>
        <div class="work__techno">
          <h3 class="techno__header">
            Technologies Used
          </h3>
          <div class="techno__list">
            <span class="techno__item" v-for="t in img.tenchologies" :key="t">
              {{ t }}
            </span>
          </div>
        </div>

        <div class="work__links">
          <a
            :href="img.href"
            target="_blank"
            rel="noopener"
            class="work__link"
            v-if="img.href"
            >visit</a
          >
          <a
            :href="img.github"
            target="_blank"
            rel="noopener"
            class="work__link"
            >code</a
          >
        </div>
      </div>
    </section>
  </article>
</template>

<style>
.project-page {
  margin: 0 auto;
  padding-bottom: 10%;
  max-width: 1600px;
}

@media (max-width: 1700px) {
  .project-page {
    margin: 0 2rem;
  }
}

.project-navigation {
  border: none;
  justify-content: flex-end;
}

.work {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: min-content min-content;
  grid-row-gap: 4rem;
}

.work__title {
  text-align: left;
  font-weight: 900;
  align-self: center;
  z-index: 4;
  grid-column: 7/-1;
  grid-row: 1 /2;
  font-size: clamp(28px, 7vw, 74px);
}

.work__img {
  position: relative;
  width: 100%;
  grid-column: 1/10;
  grid-row: 1 /2;
}

.work__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: relative;
}

.work__img:before {
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  background: linear-gradient(#000, #000);
  z-index: 3;
  opacity: 0.4;
}

.work__info {
  grid-row: 2/3;
  grid-column: 4/-1;
  text-align: left;

  font-size: 1.2rem;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.work__text {
  line-height: 45px;
  font-size: clamp(16px, 2vw, 20px);
}

.work__header {
  font-size: 3rem;
  margin-bottom: 3rem;
  font-weight: 900;
  font-size: clamp(22px, 5vw, 3rem);
}

.work__techno {
  margin-top: 2rem;
}

.techno__header {
  font-weight: 900;
  font-size: clamp(18px, 5vw, 22px);
}

.techno__list {
  margin-top: 1rem;
}

.techno__item {
  position: relative;
  font-size: 14px;
  line-height: 32px;
  opacity: 0.8;
  display: inline-block;
}

.techno__item:not(:last-of-type) {
  margin-right: 2rem;
}

.techno__item:not(:last-of-type):before {
  content: "";
  position: absolute;
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  transform: translateY(-50%);
  right: -1.25rem;
  top: 50%;

  background: white;
}

.work__links {
  margin-top: 2rem;
  display: flex;
  gap: 3rem;
}

.work__link {
  position: relative;
  width: 7rem;
  height: 7rem;

  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: clamp(14px, 2vw, 20px);
  background: transparent;
  z-index: 1;
  transition: all 0.3s ease-out;
}

.work__link:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
  background: transparent;
  border-radius: 50%;
  border: 1px solid #fff8;

  transition: all 0.3s ease-out;
}

.work__link:hover {
  color: black;
}

.work__link:hover::before {
  background: white;
  transform: scale(1.2);
}

.back {
  background-color: transparent;
  width: 54px;
  height: 48px;
}

.icon {
  width: 54px;
  height: 48px;
  transform: scale(0.6);
}

.arrow {
  width: 100%;
  height: 100%;
}

@media (max-width: 600px) {
  .work__info {
    grid-column: 1/-1;
  }
}

@media (max-width: 500px) {
  .work__img {
    grid-column: 1/-1;
  }

  .work__title {
    grid-column: 1/-1;
    place-self: center;
  }
}

@media (max-width: 400px) {
  .work__links {
    gap: 1.3rem;
  }

  .work__link {
    width: 6rem;
    height: 6rem;
  }
}
</style>

<script>
export default {
  data() {
    return {
      img: null,
    }
  },
  created() {
    this.$store.dispatch("setProjectId", this.$route.params.id)
    this.img = this.$store.getters.getProjectId
    document.body.style.overflowY = "scroll"
    window.scrollTo(0, 0)
    console.log(this.img)
  },

  //   computed: {
  //     img() {
  //       return this.$store.getters.getProjectId
  //     },
  //   },
}
</script>
