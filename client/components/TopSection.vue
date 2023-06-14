<template>
  <div class="basis-1/12 lg:w-4/12 xl:w-4/12 sm:w-10/12 md:w-10/12">
    <div class="h-100 max-w-screen-xl flex-row flex">
      <!-- Title section -->
      <h1 class="text-5xl text-h1 bold-font-family text-white grow tracking-widest w-full">
        TODO
      </h1>
      <!-- Theme section -->
      <the-button type="button basis-1/6" @button-click="useDarkMode"
        v-if="colorMode.value == 'light' || colorMode.value == 'system'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"
          class="fill-white w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      </the-button>
      <the-button type="button basis-1/6" @button-click="useLightMode" v-if="colorMode.value == 'dark'">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"
          class="fill-white w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      </the-button>
    </div>
  </div>
</template>
<script>
import TheButton from '@/components/ui/TheButton.vue';

export default {
  name: 'TopSection',
  components: {
    TheButton,
  }
}
</script>
<script setup>
const colorMode = useColorMode();

const useDarkMode = () => colorMode.value = 'dark';
const useLightMode = () => colorMode.value = 'light';
</script>
