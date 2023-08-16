<template>
  <header>
    <div class="wrapper">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
        <el-menu-item index="1"><RouterLink to="/">Grid</RouterLink></el-menu-item>
        <el-menu-item index="2"><RouterLink to="/tree">Treemenu</RouterLink></el-menu-item>
        <el-menu-item index="3"><RouterLink to="/dashboard">Dashboard</RouterLink></el-menu-item>
      </el-menu>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const activeIndex = ref('1')
</script>

<style scoped></style>
