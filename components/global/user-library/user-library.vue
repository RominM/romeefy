<template>
  <main-wrapper class='user-library' @mouseenter="isHovered = true" @mouseleave="isHovered = false">
    <header-panel title="Bibliothèque" :hovered="isHovered" >
      <handling-top-library />
    </header-panel>


      <div class='user-library__bento'>
        <p class='user-library__bento__title'>Créez votre première playlist</p>
        <p class='user-library__bento__subtitle'>C'est simple, nous allons vous aider</p>
        <button class='user-library__bento__btn'>Créer une playlist</button>
      </div>

      <div class='user-library__bento'>
        <p class='user-library__bento__title'>Cherchons quelque podcats auxquels vous abonner</p>
        <p class='user-library__bento__subtitle'>Nous vous transmettrons des informations sur les nouveaux épisodes</p>
        <button class='user-library__bento__btn'>Parcourir les podcats</button>
      </div>
  </main-wrapper>
</template>

<script setup lang='ts'>
const isHovered = ref<boolean>(false)
</script>

<style lang='scss' scoped>
.user-library {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
  color: $light-surface;
  &__title {
    color: $light-background;
  }

  &__bento {
    display: flex;
    flex-direction: column;
    gap: 7px;
    padding: 15px;
    border-radius: 10px;
    background-color: $dark-surface-secondary;
    &__title {
      font-size: 16px;
      font-weight: 700;

    }
    &__subtitle {
      font-size: 14px;
      font-weight: 400;
    }
    &__btn {
      width: fit-content;
      font-size: 14px;
      font-weight: 700;
      padding: 5px 17px;
      margin-top: 15px;
      border-radius: 25px;
      background-color: $light-surface;
      color: $dark-text;
    }
  }
}
</style>