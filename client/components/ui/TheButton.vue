<template>
  <button type="button" :class="theButtonClasses" @click="onButtonClick" @mouseover="onButtonHover"
    @mouseleave="onButtonLeave">
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: 'TheButton'
}
</script>
<script setup>
import { ref } from 'vue';

const props = defineProps(['buttonClasses']);
const emit = defineEmits(['buttonClick', 'buttonHover', 'buttonLeave']);

const theButtonClasses = ref('');

watch(
  () => props.buttonClasses,
  () => {
    theButtonClasses.value = props.buttonClasses;
  },
  { immediate: true }
);

const onButtonClick = () => emit('buttonClick');
const onButtonHover = () => emit('buttonHover');
const onButtonLeave = () => emit('buttonLeave');
</script>