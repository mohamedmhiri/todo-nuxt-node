<template>
  <div class="flex flex-col w-screen hidden-overflow">
    <!-- Hero section -->
    <hero-section />
    <!-- Main box -->
    <main-section />
  </div>
</template>
<script>
import HeroSection from '@/layouts/HeroSection.vue';
import MainSection from '@/components/MainSection.vue';
export default {
  components: {
    HeroSection,
    MainSection,
  }
}
</script>
<style>
@font-face {
  font-family: 'Josefin Sans Thin';
  src: url('~/assets/fonts/static/JosefinSans-Thin.ttf') format('truetype')
}

@font-face {
  font-family: 'Josefin Sans Extra Light';
  src: url('~/assets/fonts/static/JosefinSans-ExtraLight.ttf') format('truetype')
}

@font-face {
  font-family: 'Josefin Sans Light';
  src: url('~/assets/fonts/static/JosefinSans-Light.ttf') format('truetype')
}

@font-face {
  font-family: 'Josefin Sans Regular';
  src: url('~/assets/fonts/static/JosefinSans-Regular.ttf') format('truetype')
}

@font-face {
  font-family: 'Josefin Sans Medium';
  src: url('~/assets/fonts/static/JosefinSans-Medium.ttf') format('truetype')
}

@font-face {
  font-family: 'Josefin Sans Semi Bold';
  src: url('~/assets/fonts/static/JosefinSans-SemiBold.ttf') format('truetype')
}

@font-face {
  font-family: 'Josefin Sans Bold';
  src: url('~/assets/fonts/static/JosefinSans-Bold.ttf') format('truetype')
}

* {
  font-family: 'Josefin Sans Regular';
  font-size: 18px !important;
}

.normal-font-size {
  font-size: 18px !important;
}

.text-5xl {
  font-size: 3rem !important;
}

.small-font-size {
  font-size: 15px !important;
}

.normal-font-weight {
  font-weight: 400 !important;
}

.bold-font-weight {
  font-weight: 700 !important;
}

.thin-font-family {
  font-family: 'Josefin Sans Thin';
}

.extra-light-font-family {
  font-family: 'Josefin Sans Extra Light';
}

.light-font-family {
  font-family: 'Josefin Sans Light';
}

.normal-font-family {
  font-family: 'Josefin Sans Regular';
}

.medium-font-family {
  font-family: 'Josefin Sans Medium';
}

.semi-bold-font-family {
  font-family: 'Josefin Sans Semi Bold';
}

.bold-font-family {
  font-family: 'Josefin Sans Bold';
}

.light .text-very-light-gray {
  color: hsl(236, 33%, 92%);
}

.dark .text-very-light-gray {
  color: hsl(233, 14%, 35%);
}

.light .text-light-gray {
  color: hsl(236, 9%, 61%);
}

.dark .text-light-gray {
  color: hsl(233, 14%, 35%);
}

.light .text-dark-gray {
  color: hsl(236, 9%, 61%);
}

.dark .text-dark-gray {
  color: hsl(233, 14%, 35%);
}

.light .text-very-dark-gray {
  color: hsl(235, 19%, 35%);
}

.dark .text-very-dark-gray {
  color: hsl(234, 39%, 85%);
}

.main-background {
  height: 31vh !important;
}

.light .main-background {
  background-color: hsl(0, 0%, 98%);
}

.light .x-button {
  color: hsl(235, 19%, 35%);
}

.dark .x-button {
  color: hsl(233, 14%, 35%);
}

.dark .main-background {
  background-color: hsl(235, 21%, 11%);
}

.pointer {
  cursor: url('~/assets/images/cursor-g1b1b85f61_640_1_18x18.png'), pointer;
}

button {
  cursor: url('~/assets/images/cursor-g1b1b85f61_640_1_18x18.png'), pointer;
}

.w-screen {
  height: 100vh !important;
}

.light .bg-desktop {
  background: url('~/assets/images/bg-desktop-light.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 28vh;
  max-width: 100%;
}

.dark .bg-desktop {
  background: url('~/assets/images/bg-desktop-dark.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 28vh;
  max-width: 100%;
}

.item-style {
  padding: 1rem !important;
}

@media only screen and (max-width: 375px) {
  .light .bg-desktop {
    background: url('~/assets/images/bg-mobile-light.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 28vh;
    max-width: 100vw;
    width: 100vw;
  }

  .dark .bg-desktop {
    background: url('~/assets/images/bg-mobile-dark.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 28vh;
    max-width: 100vw;
    width: 100vw;
  }
}

@media only screen and (max-width: 600px) {

  html,
  body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
  }

  .w-screen {
    height: 100vh !important;
    max-height: 100vh !important;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
  }

  p,
  .normal-font-size,
  .small-font-size {
    font-size: 12px !important;
  }

  .w-full {
    width: 80vw;
  }

  .main-content {
    padding-left: 8vw;
    padding-right: 8vw;
    max-height: 100% !important;
    row-gap: 0.75rem !important;
    transform: translateY(-25%) !important;
  }

  .text-h1 {
    font-size: 1.5em !important;
    width: 70vw !important;
  }

  .input-box {
    height: 2.5rem !important;
  }

  .item-style {
    padding: 0.5rem !important;
  }

  .items-footer {
    padding: 0.75rem !important;
  }

  .buttons-box {
    padding: 0.75rem !important;
    margin-bottom: 1.5rem !important;
  }

  .new-todo-input {
    margin-left: 0.5rem !important;
  }

  .main-background {
    max-height: 65vh !important;
  }
}

.light .bg-mobile-light {
  background: url('~/assets/images/bg-mobile-light.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  /*min-height: 28vh;*/
  max-width: 100%;
}

.dark .bg-mobile-dark {
  background: url('~/assets/images/bg-mobile-dark.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  /*min-height: 28vh;*/
  max-width: 100%;
}

.main-content {
  min-height: 60vh;
  transform: translateY(-30%);
}

.text-bright-blue {
  color: hsl(220, 98%, 61%);
}

.todo-checkbox {
  position: relative !important;
  vertical-align: middle !important;
}

.hidden-content {
  display: none;
}

.display-content {
  display: block;
}

textarea:focus,
input:focus {
  outline: none;
}

.hide-button {
  visibility: hidden;
}

.show-button {
  visibility: visible;
}

input::-webkit-input-placeholder {
  /* WebKit browsers */
  margin-left: 1.4em;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  margin-left: 1.4em;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  margin-left: 1.4em;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  margin-left: 1.4em;
}

.todo-list {
  max-height: 40vh;
  min-height: 40vh;
  overflow-y: auto;
}

.shadow {
  --tw-shadow: 0 10px 100px 0 rgb(0 0 0 / 0.1), 0 10px 20px -20px rgb(0 0 0 / 0.1) !important
}

.input-box {
  height: 3.5rem;
}

.light .input-box {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.dark .input-box {
  background-color: hsl(235, 24%, 19%) !important;

}

.light .buttons-box {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.dark .buttons-box {
  background-color: hsl(235, 24%, 19%) !important;

}

.light .list-box {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.dark .list-box {
  background-color: hsl(235, 24%, 19%) !important;

}

.light li {
  border-color: #e5e7eb !important;
}

.dark li {
  border-color: hsl(233, 14%, 35%) !important;
}
</style>
<style src="./checkbox.css"></style>