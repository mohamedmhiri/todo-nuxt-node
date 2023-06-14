<template>
  <div class="grow lg:w-4/12 xl:w-4/12 sm:w-10/12 md:w-10/12">
    <div class="h-100 max-w-screen-xl flex bg-teal-lightest">
      <div class="list-box rounded shadow w-full">
        <!-- Todo List -->
        <draggable v-if="isReady" v-model="todo" tag="ul" item-key="_id" class="divide-y divide-solid todo-list"
          @update="moveItem">
          <template #item="{ element, index }">
            <todo-item :index="index" :element="element" />
          </template>
        </draggable>
        <!-- Todo footer -->
        <div class="sticky items-footer p-4 flex flex-row md:items-center md:justify-center">
          <!-- Left items (mobile) -->
          <left-items v-if="isMobile"
            :box-class="'basis-1/4 small-font-size bold-font-weight light-font-family text-dark-gray'" />
          <!-- Left items (desktop) -->
          <left-items v-if="!isMobile"
            :box-class="'basis-1/3 small-font-size bold-font-weight light-font-family text-dark-gray'" />
          <!-- White space (mobile) -->
          <div v-if="isMobile" class="grow ml-6"></div>
          <!-- Filter buttons (desktop) -->
          <filter-buttons v-if="!isMobile" :box-class="filterButtonsClass" />
          <!-- Clear completed -->
          <clear-completed :is-mobile="isMobile" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
import ClearCompleted from '@/components/ClearCompleted.vue';
import FilterButtons from './FilterButtons.vue';
import LeftItems from './LeftItems.vue';
import TodoItem from './list/TodoItem.vue';
export default {
  name: 'ListSection',
  components: {
    ClearCompleted,
    draggable,
    FilterButtons,
    LeftItems,
    TodoItem,
  }
}
</script>
<script setup>
import { ref } from 'vue';
import { useTodoStore } from '@/store/todo';

const props = defineProps([
  'isMobile',
]);

const isReady = ref(false);
const todo = ref([]);
const filterButtonsClass = ref('basis-2/4 ml-6');

// store
const store = useTodoStore();

watch(
  () => store.todoVM,
  (newTodo, oldTodo) => {
    todo.value = newTodo;
    if (oldTodo === undefined || oldTodo.length === 0) {
      isReady.value = true;
    }
  },
  { immediate: true }
);

const moveItem = async (update) => {
  for (let index = 0; index < todo.value.length; index++) {
    await store.toggleItemPosition({ _id: todo.value[index]._id, position: index });    
  }
}
</script>
