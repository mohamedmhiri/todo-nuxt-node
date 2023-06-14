<template>
  <the-paragraph :paragraph-classes="paragraphClasses" :description="element.label" @paragraph-click="onLabelClick"/>
</template>
<script>
import TheParagraph from '@/components/ui/TheParagraph.vue';
export default {
  name: 'ItemLabel',
  components: {
    TheParagraph
  }
}
</script>
<script setup>
import { computed } from 'vue';

const props = defineProps([
  'element',
]);

const emit = defineEmits([
  'labelChange',
]);

const paragraphClasses = computed(() => props.element.isCompleted === true ?
  'w-full ml-9 normal-font-weight normal-font-family line-through text-very-light-gray pointer' :
  'w-full ml-9 normal-font-weight normal-font-family text-very-dark-gray pointer');

const onLabelClick = () => emit('labelChange');

</script>