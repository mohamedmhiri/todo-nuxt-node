<template>
  <div class="basis-1/12 lg:w-4/12 xl:w-4/12 sm:w-10/12 md:w-10/12">
    <div class="max-w-screen-xl">
      <div class="h-100 w-full flex items-center p-3 container input-box rounded">
        <!-- Add Todo checkbox -->
        <label class="checkbox-block" for="newTodoState" @mouseover="showWhiteMark()" @mouseleave="hideWhiteMark()">
          <input class="todo-checkbox" type="checkbox" id="newTodoState" :checked="isCompleted"
            @change="toggleNewTodoItemState()" />
          <span :class="checkMarkClass"></span>
          <span :class="whiteMarkClass"></span>
        </label>
        <!-- Add Todd Input -->
        <div class="flex items-center grow" @keyup="displayCurrentlyTypingSpan" @mousedown="displayCurrentlyTypingSpan"
          @mouseleave="hideCurrentlyTypingSpan">
          <span v-if="isMounted && !isMobile"
            :class="currentlyTypingSpanIsDisplayed ? 'display-content' : 'hidden-content'"
            class="ml-9 flex select-none items-center pl-3 text-very-dark-gray sm:text-sm bg-transparent"
            @keyup="displayCurrentlyTypingSpan" @mousedown="displayCurrentlyTypingSpan"
            @mouseleave="hideCurrentlyTypingSpan">Currently
            typing</span>
          <span v-if="isMounted && !isMobile"
            :class="currentlyTypingSpanIsDisplayed ? 'display-content' : 'hidden-content'"
            class="ml-1 flex select-none items-center pl-3 text-gray-500 sm:text-sm bg-transparent text-bright-blue"
            @keyup="displayCurrentlyTypingSpan" @mousedown="displayCurrentlyTypingSpan"
            @mouseleave="hideCurrentlyTypingSpan">
            |</span>
          <input v-if="isMounted" class="lg:ml-9 text-very-dark-gray new-todo-input block grow bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400
                  sm:text-sm sm:leading-6 bg-transparent normal-font-size" :placeholder="newTodoPlaceholder"
            v-model="label" @keyup.enter="addTodo" @keyup="displayCurrentlyTypingSpan"
            @mousedown="displayCurrentlyTypingSpan" @mouseleave="hideCurrentlyTypingSpan">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FormSection'
}
</script>
<script setup>
import { ref, watch } from 'vue';
const props = defineProps([
  'newTodo',
  'isMounted',
  'isMobile',
  'currentlyTypingSpanIsDisplayed',
  'newTodoPlaceholder',
  'checkMarkClass',
  'whiteMarkClass',
]);
const emit = defineEmits([
  'showWhiteMark',
  'hideWhiteMark',
  'toggleNewTodoItemState',
  'displayCurrentlyTypingSpan',
  'hideCurrentlyTypingSpan',
  'addTodo',
  'onLabelChange',
  'onIsCompletedChange'
]);

const label = ref(props.newTodo.label);
const isCompleted = ref(props.newTodo.isCompleted);

watch(
  () => props.newTodo,
  (todo) => { label.value = todo.label; isCompleted.value = todo.isCompleted; }
);

watch(
  label,
  (newLabel) => { emit('onLabelChange', { label: newLabel }) }
);

watch(
  isCompleted,
  (newIsCompleted) => { emit('onIsCompletedChange', { isCompleted: newIsCompleted }) }
);

const showWhiteMark = () => {
  emit('showWhiteMark');
}

const hideWhiteMark = () => {
  emit('hideWhiteMark');
}

const toggleNewTodoItemState = () => {
  isCompleted.value = !isCompleted.value;
  emit('toggleNewTodoItemState');
}

const displayCurrentlyTypingSpan = () => {
  emit('displayCurrentlyTypingSpan');
}

const hideCurrentlyTypingSpan = () => {
  emit('hideCurrentlyTypingSpan');
}

const addTodo = () => {
  emit('addTodo', { label: label.value, isCompleted: isCompleted.value });
}



</script>
