<template>
  <the-paragraph :paragraph-classes="boxClass" :description="leftItemsDescription"/>
</template>
<script>
import TheParagraph from '@/components/ui/TheParagraph.vue';
export default {
  name: 'LeftItems',
  components: {
    TheParagraph
  }
}
</script>
<script setup>
import { useTodoStore } from '@/store/todo';

const props = defineProps(['boxClass']);

const leftItemsDescription = ref('');
// store
const store = useTodoStore();

watch(
  () => store.countActive,
  () => {
    leftItemsDescription.value = `${store.countActive} item${store.countActive > 1 ? 's' : '' } left`;
  },
  { immediate: true }
);
</script>