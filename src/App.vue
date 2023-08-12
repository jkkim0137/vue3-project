<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Dashboad</RouterLink>
        <RouterLink to="/about">Grid</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped></style>
