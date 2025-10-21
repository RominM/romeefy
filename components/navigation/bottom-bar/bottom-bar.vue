<template>
  <div class="bottom-bar">
    <bottom-player @click="isOpen = true" />
    <navigation-list @action-nav="$emit('action-nav', $event)" />

    <overlay v-model:is-open-overlay="isOpen" color="#97d300">
      <div class="test">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias harum, commodi voluptatum vero, est distinctio, suscipit dolorum quasi quaerat repudiandae dicta repellendus saepe accusamus provident atque minus deleniti! Rerum, expedita.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias harum, commodi voluptatum vero, est distinctio, suscipit dolorum quasi quaerat repudiandae dicta repellendus saepe accusamus provident atque minus deleniti! Rerum, expedita.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias harum, commodi voluptatum vero, est distinctio, suscipit dolorum quasi quaerat repudiandae dicta repellendus saepe accusamus provident atque minus deleniti! Rerum, expedita.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias harum, commodi voluptatum vero, est distinctio, suscipit dolorum quasi quaerat repudiandae dicta repellendus saepe accusamus provident atque minus deleniti! Rerum, expedita.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias harum, commodi voluptatum vero, est distinctio, suscipit dolorum quasi quaerat repudiandae dicta repellendus saepe accusamus provident atque minus deleniti! Rerum, expedita.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias harum, commodi voluptatum vero, est distinctio, suscipit dolorum quasi quaerat repudiandae dicta repellendus saepe accusamus provident atque minus deleniti! Rerum, expedita.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias harum, commodi voluptatum vero, est distinctio, suscipit dolorum quasi quaerat repudiandae dicta repellendus saepe accusamus provident atque minus deleniti! Rerum, expedita.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias harum, commodi voluptatum vero, est distinctio, suscipit dolorum quasi quaerat repudiandae dicta repellendus saepe accusamus provident atque minus deleniti! Rerum, expedita.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias harum, commodi voluptatum vero, est distinctio, suscipit dolorum quasi quaerat repudiandae dicta repellendus saepe accusamus provident atque minus deleniti! Rerum, expedita.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias harum, commodi voluptatum vero, est distinctio, suscipit dolorum quasi quaerat repudiandae dicta repellendus saepe accusamus provident atque minus deleniti! Rerum, expedita.
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Alias harum, commodi voluptatum vero, est distinctio, suscipit dolorum quasi quaerat repudiandae dicta repellendus saepe accusamus provident atque minus deleniti! Rerum, expedita.
      </div>
    </overlay>
  </div>
</template>

<script setup lang="ts">
const isOpen = ref<boolean>(false)
</script>

<style scoped lang="scss">
.bottom-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: color-alpha($dark-background, 0.95);
  z-index: 999;
}

.test{
  background: #000;
  height: 100vh;
  
  background-color: #00000028;
  background: linear-gradient(0, rgba(0, 0, 0, 1) 0%, rgba(237, 221, 83, 1) 100%);
    background-attachment: fixed;
  padding: 50px 15px;
}
</style>