<template>
  <div class="grow hidden-overflow main-background">
    <div class="flex flex-col items-center justify-center main-content lg:gap-y-8">
      <!-- Top section -->
      <top-section :color-mode="colorMode" @dark-mode="useDarkMode" @light-mode="useLightMode" />
      <!-- Form section -->
      <form-section :new-todo="newTodo" :is-mounted="isMounted" :is-mobile="isMobile"
        :currently-typing-span-is-displayed="currentlyTypingSpanIsDisplayed" :new-todo-placeholder="newTodoPlaceholder"
        :check-mark-class="checkMarkClass" :white-mark-class="whiteMarkClass" @show-white-mark="showWhiteMark"
        @hide-white-mark="hideWhiteMark" @toggle-new-todo-item-state="toggleNewTodoItemState"
        @display-currently-typing-span="displayCurrentlyTypingSpan" @hide-currently-typing-span="hideCurrentlyTypingSpan"
        @add-todo="addTodo" @on-label-change="onLabelChange" @on-is-completed-change="onIsCompletedChange" />
      <!-- List section -->
      <list-section />
      <!-- Filter buttons (mobile) -->
      <filter-buttons />
      <!-- Drag and drop footer -->
      <drag-and-drop />
    </div>
  </div>
</template>
<script>
import DragAndDrop from './DragAndDrop.vue';
import FilterButtons from './FilterButtons.vue';
import FormSection from './FormSection.vue';
import ListSection from './ListSection.vue';
import TopSection from './TopSection.vue';
export default {
  name: 'MainSection',
  components: {
    DragAndDrop,
    FilterButtons,
    FormSection,
    ListSection,
    TopSection,
  }
}
</script>
<script setup>
import { ref, onBeforeMount, onMounted, computed, } from 'vue';
const colorMode = useColorMode();

// data init
const todo = ref([]);
// filtered todo
const filteredTodo = ref([]);
const newTodo = ref({ isCompleted: false, label: '' });
const nextPosition = ref(0);
const currentlyTypingSpanIsDisplayed = ref(false);
let todoItemStateVModels = ref([]);
// new todo placeholder
const newTodoPlaceholder = ref('Create a new todo...');
// clear completed button
const clearCompletedTextColor = ref('bold-font-weight light-font-family text-dark-gray');
// buttons style
const allItemsButtonColor = ref('small-font-size bold-font-weight normal-font-family text-bright-blue');
const activeItemsButtonColor = ref('small-font-size bold-font-weight normal-font-family text-light-gray');
const completedItemsButtonColor = ref('small-font-size bold-font-weight normal-font-family text-light-gray');
// is mounted
const isMounted = ref(false);
// form section
const checkMarkClass = ref('checkmark');
const whiteMarkClass = ref('hide-white-mark');

// $refs 
const checkMarks = ref([]);
const whiteMarks = ref([]);
const xButtons = ref([]);
const todoItems = ref([]);

onBeforeMount(async () => {
  await fetchTodoData();
});

onMounted(() => {
  isMounted.value = true;
});


const isMobile = computed(() => {
  return window !== undefined ? window.innerWidth <= 800 : undefined;
});

const leftItems = computed(() => {
  return todo.value.filter(v => v.isCompleted === false).length;
});

const fetchTodoData = async () => {
  const todos = await $fetch('http://localhost:4000/api/todos');
  todo.value = todos;
  filteredTodo.value = todos;
  todoItemStateVModels.value = todo.value.map(i => i.isCompleted === true);
}

const addTodo = async ({ label, isCompleted }) => {
  let nextPositionInTodo = todo.value.length ? (todo.value[todo.value.length - 1].position + 1) : 0;
  nextPosition.value = nextPositionInTodo;
  const createNewTodo = { label, isCompleted, position: nextPosition.value };
  const addedTodo = await $fetch('http://localhost:4000/api/todos', { method: 'POST', body: createNewTodo });
  newTodo.value = { isCompleted: false, label: '' };
  todo.value.push(addedTodo);
  filteredTodo.value = todo.value;
  todoItemStateVModels.value = todo.value.map(i => i.isCompleted === true);
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

const showXButton = (key) => {
  xButtons.value[key].classList.value = 'show-button';
}
const hideXButton = (key) => {
  xButtons.value[key].classList.value = 'hide-button';
}

const showWhiteMarkByKey = (key) => {
  if (todoItemStateVModels.value[key] === true) return;
  whiteMarks.value[key].classList.value = 'show-white-mark';
  checkMarks.value[key].classList.value = 'hide-checkmark';
}
const hideWhiteMarkByKey = (key) => {
  whiteMarks.value[key].classList.value = 'hide-white-mark';
  checkMarks.value[key].classList.value = 'checkmark';
}

const toggleTodoItemState = async (key) => {
  await $fetch(`http://localhost:4000/api/todos/${filteredTodo.value[key]._id}`, { method: 'PUT', body: { isCompleted: !filteredTodo.value[key].isCompleted } });
  filteredTodo.value[key].isCompleted = !filteredTodo.value[key].isCompleted;
  todo.value[key].isCompleted = !todo.value[key].isCompleted;
  hideWhiteMarkByKey(key);
  if (typeof todoItemStateVModels.value[key] !== 'boolean') return;
  todoItemStateVModels.value[key] = !todoItemStateVModels.value[key];

  todoItems.value[key].classList.value = !todoItems.value[key].classList.value.includes('line-through') ?
    'w-full ml-9 normal-font-weight normal-font-family line-through text-very-light-gray pointer' :
    'w-full ml-9 normal-font-weight normal-font-family text-very-dark-gray pointer';
}
const toggleNewTodoItemState = () => {
  hideWhiteMark();
  if (typeof newTodo.value.isCompleted !== 'boolean') return;
  newTodo.value.isCompleted = !newTodo.value.isCompleted;
}

const onHoverClearCompleted = () => {
  if (colorMode.value.includes('dark')) {
    clearCompletedTextColor.value = 'bold-font-weight normal-font-family text-very-dark-gray';
  } else {
    clearCompletedTextColor.value = 'bold-font-weight normal-font-family text-dark-gray';
  }
}

const onLeaveClearCompleted = () => {
  clearCompletedTextColor.value = 'bold-font-weight light-font-family text-dark-gray';
}

const getResetFilterButtonStyle = () => {
  return 'small-font-size bold-font-weight normal-font-family text-light-gray';
}

const getPrimaryFilterButtonStyle = () => {
  return 'small-font-size bold-font-weight normal-font-family text-bright-blue';
}

const onClickAllItemsButton = () => {
  filteredTodo.value = todo.value;
  allItemsButtonColor.value = getPrimaryFilterButtonStyle();
  // TODO will have a parent component and 3 button filter child components
  // clicking on one of them will change the component class style
  // and $emit an event to the parent component 
  // which will notify the other 2 child components so that each one will reset
  // it's class style
  activeItemsButtonColor.value = getResetFilterButtonStyle();
  completedItemsButtonColor.value = getResetFilterButtonStyle();
}

const onHoverAllItemsButton = () => {
  if (allItemsButtonColor.value.includes('text-bright-blue')) return;
  allItemsButtonColor.value = 'small-font-size bold-font-weight normal-font-family text-very-dark-gray';
}

const onLeaveAllItemsButton = () => {
  if (allItemsButtonColor.value.includes('text-bright-blue')) return;
  allItemsButtonColor.value = getResetFilterButtonStyle();
}

const onHoverActiveItemsButton = () => {
  if (activeItemsButtonColor.value.includes('text-bright-blue')) return;
  activeItemsButtonColor.value = 'small-font-size bold-font-weight normal-font-family text-very-dark-gray';
}

const onClickActiveItemsButton = () => {
  filteredTodo.value = todo.value.filter(t => t.isCompleted === false);
  activeItemsButtonColor.value = getPrimaryFilterButtonStyle();
  // TODO will have a parent component and 3 button filter child components
  // clicking on one of them will change the component class style
  // and $emit an event to the parent component 
  // which will notify the other 2 child components so that each one will reset
  // it's class style
  completedItemsButtonColor.value = getResetFilterButtonStyle();
  allItemsButtonColor.value = getResetFilterButtonStyle();
}

const onLeaveActiveItemsButton = () => {
  if (activeItemsButtonColor.value.includes('text-bright-blue')) return;
  activeItemsButtonColor.value = getResetFilterButtonStyle();
}

const onClickCompletedItemsButton = () => {
  filteredTodo.value = todo.value.filter(t => t.isCompleted === true);
  completedItemsButtonColor.value = getPrimaryFilterButtonStyle();
  // TODO will have a parent component and 3 button filter child components
  // clicking on one of them will change the component class style
  // and $emit an event to the parent component 
  // which will notify the other 2 child components so that each one will reset
  // it's class style
  activeItemsButtonColor.value = getResetFilterButtonStyle();
  allItemsButtonColor.value = getResetFilterButtonStyle();
}

const onHoverCompletedItemsButton = () => {
  if (completedItemsButtonColor.value.includes('text-bright-blue')) return;
  completedItemsButtonColor.value = 'small-font-size bold-font-weight normal-font-family text-very-dark-gray';
}

const onLeaveCompletedItemsButton = () => {
  if (completedItemsButtonColor.value.includes('text-bright-blue')) return;
  completedItemsButtonColor.value = getResetFilterButtonStyle();
}

const useDarkMode = () => {
  colorMode.value = 'dark';
}

const useLightMode = () => {
  colorMode.value = 'light';
}

const deleteTodo = async (item) => {
  await $fetch(`http://localhost:4000/api/todos?ids=${item._id}`, { method: 'DELETE' });
  todo.value = todo.value.filter(v => v._id !== item._id);
  filteredTodo.value = filteredTodo.value.filter(v => v._id !== item._id);
}

const onClearCompleted = async () => {
  const completedIndexes = todoItemStateVModels.value.map((v, key) => Object.assign({ key }, { isCompleted: v })).filter(v => v.isCompleted === true).map(v => v.key);
  const completedIds = todo.value.filter((v, key) => completedIndexes.includes(key)).map(v => v._id);
  if (completedIds.length) {
    await $fetch(`http://localhost:4000/api/todos?ids=${completedIds.join(',')}`, { method: 'DELETE' });
    todo.value = todo.value.filter(v => !completedIds.includes(v._id));
    filteredTodo.value = filteredTodo.value.filter(v => !completedIds.includes(v._id));
  }
}

const moveItem = async (update) => {
  const newPosition = filteredTodo.value[update.newIndex].position;
  if (update.newIndex < update.oldIndex) {
    for (let index = update.newIndex; index < update.oldIndex; index++) {
      await $fetch(`http://localhost:4000/api/todos/${filteredTodo.value[index]._id}`, { method: 'PUT', body: { position: filteredTodo.value[index + 1].position } });
    }
  } else {
    for (let index = (update.oldIndex + 1); index < (update.newIndex + 1); index++) {
      await $fetch(`http://localhost:4000/api/todos/${filteredTodo.value[index]._id}`, { method: 'PUT', body: { position: filteredTodo.value[index - 1].position } });
    }
  }
  await $fetch(`http://localhost:4000/api/todos/${filteredTodo.value[update.oldIndex]._id}`, { method: 'PUT', body: { position: newPosition } });
}

// form section
const showWhiteMark = () => {
  if (newTodo.value.isCompleted === true) return;
  whiteMarkClass.value = 'show-white-mark';
  checkMarkClass.value = 'hide-checkmark';
}
const hideWhiteMark = () => {
  whiteMarkClass.value = 'hide-white-mark';
  checkMarkClass.value = 'checkmark';
}

// form section
const onLabelChange = ({ label }) => { newTodo.value.label = label; }
const onIsCompletedChange = ({ isCompleted }) => { newTodo.value.isCompleted = isCompleted; }

</script>
