<template>
  <div class="flex flex-col w-screen hidden-overflow">
    <div class="flex-auto bg-desktop"></div>
    <div class="grow hidden-overflow main-background">
      <div class="flex flex-col items-center justify-center main-content lg:gap-y-8">
        <div class="basis-1/12 lg:w-4/12 xl:w-4/12 sm:w-10/12 md:w-10/12">
          <div class="h-100 max-w-screen-xl flex-row flex">
            <h1 class="text-5xl text-h1 bold-font-family text-white grow tracking-widest w-full">
              TODO
            </h1>
            <button type="button basis-1/6" @click="useDarkMode"
              v-if="colorMode.value == 'light' || colorMode.value == 'system'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"
                class="fill-white w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            </button>
            <button type="button basis-1/6" @click="useLightMode" v-if="colorMode.value == 'dark'">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="white"
                class="fill-white w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="basis-1/12 lg:w-4/12 xl:w-4/12 sm:w-10/12 md:w-10/12">
          <div class="max-w-screen-xl">
            <div class="h-100 w-full flex items-center p-3 container input-box rounded"
              @keyup="displayCurrentlyTypingSpan" @mousedown="displayCurrentlyTypingSpan"
              @mouseleave="hideCurrentlyTypingSpan">
              <label class="checkbox-block" for="newTodoState" @mouseover="showWhiteMark()" @mouseleave="hideWhiteMark()">
                <input class="todo-checkbox" type="checkbox" id="newTodoState" :checked="newTodo.isCompleted"
                  @change="toggleNewTodoItemState()" />
                <span class="checkmark" ref="checkMark"></span>
                <span class="hide-white-mark" ref="whiteMark"></span>
              </label>
              <div class="flex items-center grow">
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
                <input class="lg:ml-9 text-very-dark-gray new-todo-input block grow bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400
                  sm:text-sm sm:leading-6 bg-transparent normal-font-size" :placeholder="newTodoPlaceholder"
                  v-model="newTodo.label" @keyup.enter="addTodo" @keyup="displayCurrentlyTypingSpan"
                  @mousedown="displayCurrentlyTypingSpan" @mouseleave="hideCurrentlyTypingSpan">
              </div>
            </div>
          </div>
        </div>
        <div class="grow lg:w-4/12 xl:w-4/12 sm:w-10/12 md:w-10/12">
          <div class="h-100 max-w-screen-xl flex bg-teal-lightest">
            <div class="list-box rounded shadow w-full">
              <draggable v-model="filteredTodo" tag="ul" item-key="_id" class="divide-y divide-solid todo-list"
                @update="moveItem">
                <template #item="{ element, index }">
                  <li class="flex item-style items-center" @mouseover="showXButton(index)"
                    @mouseleave="hideXButton(index)">
                    <label class="checkbox-block" :for="'todo-item-' + index" @mouseover="showWhiteMarkByKey(index)"
                      @mouseleave="hideWhiteMarkByKey(index)">
                      <input class="todo-checkbox" type="checkbox" :id="'todo-item-' + index"
                        :checked="todoItemStateVModels[index]" @change="toggleTodoItemState(index)" />
                      <span class="checkmark" :ref="el => { checkMarks[index] = el }"></span>
                      <span class="hide-white-mark" :ref="el => { whiteMarks[index] = el }"></span>
                    </label>
                    <p @click="toggleTodoItemState(index)"
                      :class="todoItemStateVModels[index] ? 'line-through text-very-light-gray' : 'text-very-dark-gray'"
                      class="w-full ml-9 normal-font-weight normal-font-family pointer"
                      :ref="el => { todoItems[index] = el }">
                      {{ element.label }}
                    </p>
                    <button type="button" class="hide-button" :ref="el => { xButtons[index] = el }"
                      @click="deleteTodo(element)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-6 h-6 x-button">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </li>
                </template>
              </draggable>
              <div class="sticky items-footer p-4 flex flex-row md:items-center md:justify-center">
                <p v-if="isMounted && isMobile"
                  class="basis-1/4 small-font-size bold-font-weight light-font-family text-dark-gray">
                  {{ leftItems }} item{{ leftItems > 1 ? 's' : '' }} left
                </p>
                <p v-if="isMounted && !isMobile"
                  class="basis-1/3 small-font-size bold-font-weight light-font-family text-dark-gray">
                  {{ leftItems }} item{{ leftItems > 1 ? 's' : '' }} left
                </p>
                <div v-if="isMounted && isMobile" class="grow ml-6"></div>
                <div v-if="isMounted && !isMobile" class="basis-2/4 ml-6">
                  <button @mouseover="onHoverAllItemsButton" @mouseleave="onLeaveAllItemsButton"
                    @click="onClickAllItemsButton" :class="allItemsButtonColor" class="m-1">All</button>
                  <button @mouseover="onHoverActiveItemsButton" @mouseleave="onLeaveActiveItemsButton"
                    @click="onClickActiveItemsButton" :class="activeItemsButtonColor" class="m-1">Active</button>
                  <button @mouseover="onHoverCompletedItemsButton" @mouseleave="onLeaveCompletedItemsButton"
                    @click="onClickCompletedItemsButton" :class="completedItemsButtonColor" class="m-1">Completed</button>
                </div>
                <button v-if="isMounted && !isMobile" type="button" @mouseover="onHoverClearCompleted"
                  @click="onClearCompleted" @mouseleave="onLeaveClearCompleted" :class="clearCompletedTextColor"
                  class="basis-1/4 small-font-size">
                  Clear Completed
                </button>
                <button v-if="isMounted && isMobile" type="button" @mouseover="onHoverClearCompleted"
                  @click="onClearCompleted" @mouseleave="onLeaveClearCompleted" :class="clearCompletedTextColor"
                  class="basis-1/3 small-font-size">
                  Clear Completed
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="basis-1/12 lg:w-4/12 xl:w-4/12 sm:w-10/12 md:w-10/12">
          <div v-if="isMounted && isMobile"
            class="p-4 flex flex-row items-center justify-center sm:content-around bg-teal-lightest buttons-box w-full">
            <button @mouseover="onHoverAllItemsButton" @mouseleave="onLeaveAllItemsButton" @click="onClickAllItemsButton"
              :class="allItemsButtonColor" class="m-1">All</button>
            <button @mouseover="onHoverActiveItemsButton" @mouseleave="onLeaveActiveItemsButton"
              @click="onClickActiveItemsButton" :class="activeItemsButtonColor" class="m-1">Active</button>
            <button @mouseover="onHoverCompletedItemsButton" @mouseleave="onLeaveCompletedItemsButton"
              @click="onClickCompletedItemsButton" :class="completedItemsButtonColor" class="m-1">Completed</button>
          </div>
        </div>
        <div class="basis-1/12 lg:w-4/12 xl:w-4/12 sm:w-10/12 md:w-10/12">
          <div class="h-100 w-full flex items-center justify-center">
            <p class="text-gray-500 small-font-size bold-font-weight text-light-gray">
              Drag and drop to reorder list
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
export default {
  components: { draggable }
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


// $refs 
const checkMark = ref(null);
const checkMarks = ref([]);
const whiteMark = ref(null);
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

const addTodo = async () => {
  let nextPositionInTodo = todo.value.length ? (todo.value[todo.value.length - 1].position + 1) : 0;
  nextPosition.value = nextPositionInTodo;
  const createNewTodo = Object.assign({ position: nextPosition.value }, newTodo.value);
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
const showWhiteMark = () => {
  if (newTodo.value.isCompleted === true) return;
  whiteMark.value.classList.value = 'show-white-mark';
  checkMark.value.classList.value = 'hide-checkmark';
}
const hideWhiteMark = () => {
  whiteMark.value.classList.value = 'hide-white-mark';
  checkMark.value.classList.value = 'checkmark';
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

</script>
<style>
@font-face {
  font-family: 'Josefin Sans Thin';
  src: url('~/assets/fonts/static/JosefinSans-Thin.ttf') format('truetype')
}

@font-face {
  font-family: 'Josefin Sans Extra Light';
  src: url('~/assets/fonts/static/JosefinSans-ExtraLight.ttf') format('truetype')
}

@font-face {
  font-family: 'Josefin Sans Light';
  src: url('~/assets/fonts/static/JosefinSans-Light.ttf') format('truetype')
}

@font-face {
  font-family: 'Josefin Sans Regular';
  src: url('~/assets/fonts/static/JosefinSans-Regular.ttf') format('truetype')
}

@font-face {
  font-family: 'Josefin Sans Medium';
  src: url('~/assets/fonts/static/JosefinSans-Medium.ttf') format('truetype')
}

@font-face {
  font-family: 'Josefin Sans Semi Bold';
  src: url('~/assets/fonts/static/JosefinSans-SemiBold.ttf') format('truetype')
}

@font-face {
  font-family: 'Josefin Sans Bold';
  src: url('~/assets/fonts/static/JosefinSans-Bold.ttf') format('truetype')
}

* {
  font-family: 'Josefin Sans Regular';
  font-size: 18px !important;
}

.normal-font-size {
  font-size: 18px !important;
}

.text-5xl {
  font-size: 3rem !important;
}

.small-font-size {
  font-size: 15px !important;
}

.normal-font-weight {
  font-weight: 400 !important;
}

.bold-font-weight {
  font-weight: 700 !important;
}

.thin-font-family {
  font-family: 'Josefin Sans Thin';
}

.extra-light-font-family {
  font-family: 'Josefin Sans Extra Light';
}

.light-font-family {
  font-family: 'Josefin Sans Light';
}

.normal-font-family {
  font-family: 'Josefin Sans Regular';
}

.medium-font-family {
  font-family: 'Josefin Sans Medium';
}

.semi-bold-font-family {
  font-family: 'Josefin Sans Semi Bold';
}

.bold-font-family {
  font-family: 'Josefin Sans Bold';
}

.light .text-very-light-gray {
  color: hsl(236, 33%, 92%);
}

.dark .text-very-light-gray {
  color: hsl(233, 14%, 35%);
}

.light .text-light-gray {
  color: hsl(236, 9%, 61%);
}

.dark .text-light-gray {
  color: hsl(233, 14%, 35%);
}

.light .text-dark-gray {
  color: hsl(236, 9%, 61%);
}

.dark .text-dark-gray {
  color: hsl(233, 14%, 35%);
}

.light .text-very-dark-gray {
  color: hsl(235, 19%, 35%);
}

.dark .text-very-dark-gray {
  color: hsl(234, 39%, 85%);
}

.main-background {
  height: 31vh !important;
}

.light .main-background {
  background-color: hsl(0, 0%, 98%);
}

.light .x-button {
  color: hsl(235, 19%, 35%);
}

.dark .x-button {
  color: hsl(233, 14%, 35%);
}

.dark .main-background {
  background-color: hsl(235, 21%, 11%);
}

.pointer {
  cursor: url('~/assets/images/cursor-g1b1b85f61_640_1_18x18.png'), pointer;
}

button {
  cursor: url('~/assets/images/cursor-g1b1b85f61_640_1_18x18.png'), pointer;
}

.w-screen {
  height: 100vh !important;
}

.light .bg-desktop {
  background: url('~/assets/images/bg-desktop-light.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 28vh;
  max-width: 100%;
}

.dark .bg-desktop {
  background: url('~/assets/images/bg-desktop-dark.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  min-height: 28vh;
  max-width: 100%;
}

.item-style {
  padding: 1rem !important;
}

@media only screen and (max-width: 375px) {
  .light .bg-desktop {
    background: url('~/assets/images/bg-mobile-light.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 28vh;
    max-width: 100vw;
    width: 100vw;
  }

  .dark .bg-desktop {
    background: url('~/assets/images/bg-mobile-dark.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 28vh;
    max-width: 100vw;
    width: 100vw;
  }
}

@media only screen and (max-width: 600px) {

  html,
  body {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
  }

  .w-screen {
    height: 100vh !important;
    max-height: 100vh !important;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0;
  }

  p,
  .normal-font-size,
  .small-font-size {
    font-size: 12px !important;
  }

  .w-full {
    width: 80vw;
  }

  .main-content {
    padding-left: 8vw;
    padding-right: 8vw;
    max-height: 100% !important;
    row-gap: 0.75rem !important;
    transform: translateY(-25%) !important;
  }

  .text-h1 {
    font-size: 1.5em !important;
    width: 70vw !important;
  }

  .input-box {
    height: 2.5rem !important;
  }

  .item-style {
    padding: 0.5rem !important;
  }

  .items-footer {
    padding: 0.75rem !important;
  }

  .buttons-box {
    padding: 0.75rem !important;
    margin-bottom: 1.5rem !important;
  }

  .new-todo-input {
    margin-left: 0.5rem !important;
  }

  .main-background {
    max-height: 65vh !important;
  }
}

.light .bg-mobile-light {
  background: url('~/assets/images/bg-mobile-light.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  /*min-height: 28vh;*/
  max-width: 100%;
}

.dark .bg-mobile-dark {
  background: url('~/assets/images/bg-mobile-dark.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  /*min-height: 28vh;*/
  max-width: 100%;
}

.main-content {
  min-height: 60vh;
  transform: translateY(-30%);
}

.text-bright-blue {
  color: hsl(220, 98%, 61%);
}

.todo-checkbox {
  position: relative !important;
  vertical-align: middle !important;
}

.hidden-content {
  display: none;
}

.display-content {
  display: block;
}

textarea:focus,
input:focus {
  outline: none;
}

.hide-button {
  visibility: hidden;
}

.show-button {
  visibility: visible;
}

input::-webkit-input-placeholder {
  /* WebKit browsers */
  margin-left: 1.4em;
}

input:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  margin-left: 1.4em;
}

input::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  margin-left: 1.4em;
}

input:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  margin-left: 1.4em;
}

.todo-list {
  max-height: 40vh;
  min-height: 40vh;
  overflow-y: auto;
}

.shadow {
  --tw-shadow: 0 10px 100px 0 rgb(0 0 0 / 0.1), 0 10px 20px -20px rgb(0 0 0 / 0.1) !important
}

.input-box {
  height: 3.5rem;
}

.light .input-box {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.dark .input-box {
  background-color: hsl(235, 24%, 19%) !important;

}

.light .buttons-box {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.dark .buttons-box {
  background-color: hsl(235, 24%, 19%) !important;

}

.light .list-box {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.dark .list-box {
  background-color: hsl(235, 24%, 19%) !important;

}

.light li {
  border-color: #e5e7eb !important;
}

.dark li {
  border-color: hsl(233, 14%, 35%) !important;
}
</style>
<style src="./checkbox.css"></style>