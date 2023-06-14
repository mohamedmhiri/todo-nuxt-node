<template>
  <p :class="paragraphClasses" @click="onParagraphClick">
    {{ description }}
  </p>
</template>
<script>
export default {
  name: 'TheParagraph'
}
</script>
<script setup>
const props = defineProps(['paragraphClasses', 'description']);
const emit = defineEmits(['paragraphClick']);

const onParagraphClick = () => emit('paragraphClick');
</script>