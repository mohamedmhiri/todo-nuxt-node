<template>
  <div class="flex flex-col w-screen hidden-overflow">
    <!-- Hero section -->
    <hero-section />
    <!-- Main box -->
    <main-section />
  </div>
</template>
<script>
import HeroSection from '../layouts/HeroSection.vue';
import MainSection from '../components/MainSection.vue';
export default {
  components: {
    HeroSection,
    MainSection,
  }
}
</script>
<style src="./index.css"></style>