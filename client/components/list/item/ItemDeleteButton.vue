<template>
  <the-button :button-classes="deleteButtonClass" @button-click="deleteTodo(element)">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
      class="w-6 h-6 x-button">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </the-button>
</template>
<script>
import TheButton from '@/components/ui/TheButton.vue';

export default {
  name: 'ItemDeleteButton',
  components: {
    TheButton
  }
}
</script>
<script setup>
import { useTodoStore } from '@/store/todo';

const props = defineProps([
  'deleteButtonClass',
  'element',
]);

const store = useTodoStore();

const deleteTodo = async (element) => { await store.deleteItem(element._id); }
</script>