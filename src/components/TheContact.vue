<template>
  <section class="contact">
    <div class="contact__container">
      <div class="contact__text">Contact me from the email address below</div>
      <div class="contact__link">
        <a href="mailto:nikitaycontact@gmail.com"> nikitaycontact@gmail.com </a>
      </div>
    </div>
    <nav class="contact__links">
      <ul class="links">
        <li class="social">
          <a
            href="https://www.linkedin.com/in/nikita-yanch-851886167/"
            target="_blank"
            rel="noopener"
            class="social-link"
            >LinkedIn</a
          >
        </li>
        <li class="social">
          <a
            href="https://github.com/moXq1"
            target="_blank"
            rel="noopener"
            class="social-link"
            >Github</a
          >
        </li>
      </ul>
    </nav>
  </section>
</template>

<style>
.contact {
  width: 100%;
  height: 100vh;
  height: calc(var(--vh, 1vh) * 100);
  height: 100%;
  position: relative;
  background-color: #eeeeee;
  display: grid;
  color: #000;
  padding: 0 2rem;

  mix-blend-mode: difference;
}

.contact__links {
  /* position: absolute;
  bottom: 0;
  left: 0;
  right: 0; */
  padding: 1rem 0;
  place-self: end;

  border-top: 1px solid rgba(000, 000, 000, 0.5);
}

.links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.social-link {
  font-size: clamp(1.125rem, 1.55vw, 5rem);

  color: inherit;
  font-family: "Noto Serif JP", Helvetica, Arial, sans-serif;
  transition: all 0.3s ease-out;
}

.social-link:hover {
  color: rgba(000, 000, 000, 0.5);
}

.contact__container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  /* top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); */
  place-self: center;
}

.contact__link {
  padding-bottom: 0.5rem;
  border-bottom: 5px solid currentColor;
  color: #000;
  font-size: 7vw;

  transition: all 0.3s ease-out;
}

@media (max-width: 300px) {
  .contact__link {
    font-size: 6vw;
    place-self: center;
  }
}

.contact__link:hover {
  /* color: rgba(000, 000, 000, 0.5);
  border-bottom: 5px solid rgba(000, 000, 000, 0.5); */
  color: rgba(000, 000, 000, 0.5);
  border-bottom: 5px solid rgba(000, 000, 000, 0.5);
}
.contact__link a {
  color: inherit;
}

.contact__text {
  font-size: 14px;
}
</style>
