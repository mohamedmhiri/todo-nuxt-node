<template>
  <div class="basis-1/12 lg:w-4/12 xl:w-4/12 sm:w-10/12 md:w-10/12">
    <div class="h-100 w-full flex items-center justify-center">
      <the-paragraph :paragraph-classes="dragAndDropClasses" :description="dragAndDropDescription" />
    </div>
  </div>
</template>
<script>
import TheParagraph from '@/components/ui/TheParagraph.vue';
export default {
  name: 'DragAndDropParagraph',
  components: {
    TheParagraph
  }
}
</script>
<script setup>
import { ref } from 'vue';

const dragAndDropClasses = ref('text-gray-500 small-font-size bold-font-weight text-light-gray');
const dragAndDropDescription = ref('Drag and drop to reorder list');
</script>
