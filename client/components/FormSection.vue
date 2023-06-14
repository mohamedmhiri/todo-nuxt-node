<template>
  <div class="basis-1/12 lg:w-4/12 xl:w-4/12 sm:w-10/12 md:w-10/12">
    <div class="max-w-screen-xl">
      <div class="h-100 w-full flex items-center p-3 container input-box rounded">
        <!-- Add Todo checkbox -->
        <the-checkbox :check-mark-classes="checkMarkClasses" :white-mark-classes="whiteMarkClasses"
          :checkbox-id="newTodoCheckboxId" :element="newTodo" @checkbox-hover="onCheckboxHover"
          @checkbox-leave="onCheckboxLeave" @checkbox-change="onCheckboxChange" />
        <!-- Add Todo Input -->
        <div class="flex items-center grow" @keyup="displayCurrentlyTypingSpan" @mousedown="displayCurrentlyTypingSpan"
          @mouseleave="hideCurrentlyTypingSpan">
          <span v-if="!isMobile" :class="currentlyTypingSpanIsDisplayed ? 'display-content' : 'hidden-content'"
            class="ml-9 flex select-none items-center pl-3 text-very-dark-gray sm:text-sm bg-transparent"
            @keyup="displayCurrentlyTypingSpan" @mousedown="displayCurrentlyTypingSpan"
            @mouseleave="hideCurrentlyTypingSpan">Currently
            typing</span>
          <span v-if="!isMobile" :class="currentlyTypingSpanIsDisplayed ? 'display-content' : 'hidden-content'"
            class="ml-1 flex select-none items-center pl-3 text-gray-500 sm:text-sm bg-transparent text-bright-blue"
            @keyup="displayCurrentlyTypingSpan" @mousedown="displayCurrentlyTypingSpan"
            @mouseleave="hideCurrentlyTypingSpan">
            |</span>
          <input class="lg:ml-9 text-very-dark-gray new-todo-input block grow bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400
                  sm:text-sm sm:leading-6 bg-transparent normal-font-size" :placeholder="newTodoPlaceholder"
            v-model="newTodo.label" @keyup.enter="addTodo" @keyup="displayCurrentlyTypingSpan"
            @mousedown="displayCurrentlyTypingSpan" @mouseleave="hideCurrentlyTypingSpan">
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TheCheckbox from '@/components/ui/TheCheckbox.vue';

export default {
  name: 'FormSection',
  components: {
    TheCheckbox
  }
}
</script>
<script setup>
import { ref } from 'vue';
import { useTodoStore } from '@/store/todo';

const props = defineProps([
  'isMobile',
]);

const newTodo = ref({ isCompleted: false, label: '' });
const checkMarkClasses = ref('checkmark');
const whiteMarkClasses = ref('hide-white-mark');
const currentlyTypingSpanIsDisplayed = ref(false);
const newTodoPlaceholder = ref('Create a new todo...');
const newTodoCheckboxId = ref('new-todo-completion');
const store = useTodoStore();

const onCheckboxHover = () => {
  if (newTodo.value.isCompleted === true) return;
  whiteMarkClasses.value = 'show-white-mark';
  checkMarkClasses.value = 'hide-checkmark';
}

const onCheckboxLeave = () => {
  whiteMarkClasses.value = 'hide-white-mark';
  checkMarkClasses.value = 'checkmark';
}

const onCheckboxChange = () => {
  onCheckboxLeave();
  if (typeof newTodo.value.isCompleted !== 'boolean') return;
  newTodo.value.isCompleted = !newTodo.value.isCompleted;
}

const displayCurrentlyTypingSpan = () => {
  currentlyTypingSpanIsDisplayed.value = true;
  newTodoPlaceholder.value = '';
}

const hideCurrentlyTypingSpan = () => {
  if (newTodo.value.label.length) return;
  currentlyTypingSpanIsDisplayed.value = false;
  newTodoPlaceholder.value = 'Create a new todo...';
}

const addTodo = async () => {
  const { label, isCompleted } = newTodo.value;
  const position = store.todoNextPosition;
  const createNewTodo = { label, isCompleted, position };
  await store.addItem(createNewTodo);
  newTodo.value = { isCompleted: false, label: '' };
}

</script>
