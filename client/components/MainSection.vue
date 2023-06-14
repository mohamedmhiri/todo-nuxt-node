<template>
  <div class="grow hidden-overflow main-background">
    <div class="flex flex-col items-center justify-center main-content lg:gap-y-8">
      <!-- Top section -->
      <top-section />
      <!-- Form section -->
      <form-section v-if="isMounted" :is-mobile="isMobile" />
      <!-- List section -->
      <list-section v-if="isMounted" :is-mobile="isMobile" />
      <!-- Filter buttons (mobile) -->
      <filter-buttons v-if="isMounted && isMobile" :box-class="filterButtonsBoxClass" />
      <!-- Drag and drop footer -->
      <drag-and-drop-paragraph />
    </div>
  </div>
</template>
<script>
import DragAndDropParagraph from '@/layouts/DragAndDropParagraph.vue';
import FilterButtons from '@/components/FilterButtons.vue';
import FormSection from '@/components/FormSection.vue';
import ListSection from '@/components/ListSection.vue';
import TopSection from '@/components/TopSection.vue';
export default {
  name: 'MainSection',
  components: {
    DragAndDropParagraph,
    FilterButtons,
    FormSection,
    ListSection,
    TopSection,
  }
}
</script>
<script setup>
import { ref, onBeforeMount, computed, } from 'vue';
import { useTodoStore } from '@/store/todo';
import { FLEX_CLASSES } from '@/constants';

const filterButtonsBoxClass = ref(`${FLEX_CLASSES} p-4 flex flex-row items-center justify-center sm:content-around bg-teal-lightest buttons-box w-full`);
// is mounted
const isMounted = ref(false);

// store
const store = useTodoStore();

onBeforeMount(async () => {
  isMounted.value = false;
  await fetchTodoData();
  isMounted.value = true;
});


const isMobile = computed(() => {
  return window !== undefined ? window.innerWidth <= 800 : undefined;
});

const fetchTodoData = async () => {
  await store.fetchData();
}

</script>
