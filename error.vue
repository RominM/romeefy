<template>
  <div class='error-page'>
    <div class='error-page__content'>
      <h1 class='error-page__content__title'>Romeefy 404</h1>
      <h2 class='error-page__content__subtitle'>404s and heartbreaks</h2>
      <p class='error-page__content__text'>We couldn't find the page you <br/> were looking for. Maybe return at our
        <nuxt-link class="link" to="/" title="home">Home</nuxt-link>
      </p>
      <p class='error-page__content__bottom'>go listen to some music instead</p>
    </div>
    <img class='error-page__img' src="/img/vecteezy_record-player_36661391.svg" alt="tourne disque">
  </div>
</template>

<script setup lang='ts'>

   
</script>

<style lang='scss' scoped>
  .error-page {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10%;
    background-color: #FFCDD2;
    color: $dark-text-primary;
    height: 100dvh;
    padding: 20px;
    user-select: none;
    &__content {
      display: flex;
      flex-direction: column;
      gap: 20px;
      color: #000;
      &__title {
        margin-bottom: 15px;
        font-size: 2.5rem;
      }
      &__text {
        font-size: 15px;
        font-weight: 100;
        .link {
          text-decoration: underline;
        }
      }
      &__bottom {
        text-transform: uppercase;
        font-weight: 600;
      }
    }
    &__img {
      width: 30%;
      min-width: 360px;
    }
  }

  @media screen and (max-width: 805px) {
    .error-page {
      flex-direction: column;
      width: 100%;
      &__img {
        width: 70%;
        min-width: 0;
      }
    }
  }
</style>