<template>
  <div class="flex flex-col w-screen hidden-overflow">
    <div class="flex-auto bg-desktop"></div>
    <div class="grow hidden-overflow main-background">
      <div class="flex flex-col items-center justify-center main-content gap-y-8">
        <div class="basis-1/12 w-4/12">
          <div class="h-100 flex-row flex">
            <h1 class="text-5xl bold-font-family text-white grow tracking-widest">TODO</h1>
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
        <div class="basis-1/12 w-4/12">
          <div class="h-100 w-full flex items-center p-3 container input-box rounded h-14">
            <label class="checkbox-block" for="newTodoState" @mouseover="showWhiteMark()" @mouseleave="hideWhiteMark()">
              <input class="todo-checkbox" type="checkbox" id="newTodoState" :checked="newTodo.state"
                @change="toggleNewTodoItemState()" />
              <span class="checkmark" ref="checkMark"></span>
              <span class="hide-white-mark" ref="whiteMark"></span>
            </label>
            <div class="flex items-center grow">
              <span :class="currentlyTypingSpanIsDisplayed ? 'display-content' : 'hidden-content'"
                class="ml-9 flex select-none items-center pl-3 text-very-dark-gray sm:text-sm bg-transparent">Currently
                typing</span>
              <span :class="currentlyTypingSpanIsDisplayed ? 'display-content' : 'hidden-content'"
                class="ml-1 flex select-none items-center pl-3 text-gray-500 sm:text-sm bg-transparent text-bright-blue">
                |</span>
              <input class="ml-9 block grow bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400
                sm:text-sm sm:leading-6 bg-transparent normal-font-size" :placeholder="newTodoPlaceholder"
                v-model="newTodo.label" @keyup.enter="addTodo" @keyup="displayCurrentlyTypingSpan"
                @mousedown="displayCurrentlyTypingSpan" @mouseleave="hideCurrentlyTypingSpan">
            </div>
          </div>
        </div>
        <div class="grow w-4/12">
          <div class="h-100 max-w-screen-xl flex bg-teal-lightest">
            <div class="list-box rounded shadow w-full">
              <ul class="divide-y divide-solid todo-list">
                <li v-for="(item, key) in todo" :key="item._id" class="flex p-4 items-center"
                  @mouseover="showXButton(key)" @mouseleave="hideXButton(key)">
                  <label class="checkbox-block" :for="'todo-item-' + key" @mouseover="showWhiteMarkByKey(key)"
                    @mouseleave="hideWhiteMarkByKey(key)">
                    <input class="todo-checkbox" type="checkbox" :id="'todo-item-' + key"
                      :checked="todoItemStateVModels[key]" @change="toggleTodoItemState(key)" />
                    <span class="checkmark" :ref="el => { checkMarks[key] = el }"></span>
                    <span class="hide-white-mark" :ref="el => { whiteMarks[key] = el }"></span>
                  </label>
                  <p @click="toggleTodoItemState(key)"
                    :class="todoItemStateVModels[key] ? 'line-through text-very-light-gray' : 'text-very-dark-gray'"
                    class="w-full ml-9 normal-font-weight normal-font-family pointer"
                    :ref="el => { todoItems[key] = el }">
                    {{ item.label }}
                  </p>
                  <button type="button" class="hide-button" :ref="el => { xButtons[key] = el }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6 x-button">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              </ul>
              <div class="sticky p-4 flex flex-row items-center justify-center">
                <p class="basis-1/4 small-font-size bold-font-weight light-font-family text-dark-gray">
                  {{ todo.length }} item{{ todo.length > 1 ? 's' : '' }} left
                </p>
                <div class="basis-2/4 ml-6">
                  <button @mouseover="onHoverAllItemsButton" @mouseleave="onLeaveAllItemsButton"
                    @click="onClickAllItemsButton" :class="allItemsButtonColor" class="m-1">All</button>
                  <button @mouseover="onHoverActiveItemsButton" @mouseleave="onLeaveActiveItemsButton"
                    @click="onClickActiveItemsButton" :class="activeItemsButtonColor" class="m-1">Active</button>
                  <button @mouseover="onHoverCompletedItemsButton" @mouseleave="onLeaveCompletedItemsButton"
                    @click="onClickCompletedItemsButton" :class="completedItemsButtonColor" class="m-1">Completed</button>
                </div>
                <button type="button" @mouseover="onHoverClearCompleted" @mouseleave="onLeaveClearCompleted"
                  :class="clearCompletedTextColor" class="basis-1/4 small-font-size">
                  Clear Completed
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="basis-1/12 w-4/12">
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
<script setup>
import { ref, onBeforeMount } from 'vue';
const colorMode = useColorMode();

// data init
let todo = ref([]);
const newTodo = ref({ state: false, label: '' });
const nextPosition = ref(0);
const currentlyTypingSpanIsDisplayed = ref(false);
let todoItemStateVModels = ref([]);
// new todo placeholder
const newTodoPlaceholder = ref('Create a new todo...');
// clear completed button
const clearCompletedTextColor = ref('bold-font-weight light-font-family text-dark-gray');
// buttons style
const allItemsButtonColor = ref('small-font-size bold-font-weight normal-font-family text-light-gray');
const activeItemsButtonColor = ref('small-font-size bold-font-weight normal-font-family text-light-gray');
const completedItemsButtonColor = ref('small-font-size bold-font-weight normal-font-family text-light-gray');
// todo items marked as completed
const itemCompleted = ref('');

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


const fetchTodoData = async () => {
  todo.value = await $fetch('http://localhost:4000/api/todos');
  todoItemStateVModels.value = todo.value.map(i => i.state === 'completed');
}

const addTodo = async () => {
  let nextPositionInTodo = todo.value.map(t => t.position).reduce((p, v) => p > v ? p : v);
  nextPosition.value = nextPositionInTodo++;
  newTodo.value.state = newTodo.value.state ? 'completed' : 'active';
  const createNewTodo = Object.assign({ position: nextPosition.value }, newTodo.value);
  await $fetch('http://localhost:4000/api/todos', { method: 'POST', body: createNewTodo });
  newTodo.value = { state: false, label: '' };
  await fetchTodoData();
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
  if (newTodo.value.state === true) return;
  whiteMark.value.classList.value = 'show-white-mark';
  checkMark.value.classList.value = 'hide-checkmark';
}
const hideWhiteMark = () => {
  whiteMark.value.classList.value = 'hide-white-mark';
  checkMark.value.classList.value = 'checkmark';
}
const toggleTodoItemState = (key) => {
  hideWhiteMarkByKey(key);
  if (typeof todoItemStateVModels.value[key] !== 'boolean') return;
  todoItemStateVModels.value[key] = !todoItemStateVModels.value[key];
  todoItems.value[key].classList.value = !todoItems.value[key].classList.value.includes('line-through') ?
    'w-full ml-9 normal-font-weight normal-font-family line-through text-very-light-gray pointer' :
    'w-full ml-9 normal-font-weight normal-font-family text-very-dark-gray pointer';
}
const toggleNewTodoItemState = () => {
  hideWhiteMark();
  if (typeof newTodo.value.state !== 'boolean') return;
  newTodo.value.state = !newTodo.value.state;
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

.light .main-background {
  background-color: hsl(0, 0%, 98%);
}

.light .x-button {
  color: hsl(235, 19%, 35%);
}

.dark .x-button {
  color: hsl(233, 14%, 35%);
}

/*
- Very Dark Blue: hsl(235, 21%, 11%)
- Very Dark Desaturated Blue: hsl(235, 24%, 19%)
- Light Grayish Blue: hsl(234, 39%, 85%)
- Light Grayish Blue (hover): hsl(236, 33%, 92%)
- Dark Grayish Blue: hsl(234, 11%, 52%)
- Very Dark Grayish Blue: hsl(233, 14%, 35%)
- Very Dark Grayish Blue: hsl(237, 14%, 26%)
*/
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
  /*background-size: cover;*/
  background-size: cover;
  /* width: 100%;
  min-height: 100%; */
  min-height: 28vh;
  max-width: 100%;
}

.dark .bg-desktop {
  background: url('~/assets/images/bg-desktop-dark.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  /*background-size: 100%;*/
  min-height: 28vh;
  max-width: 100%;
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
  overflow-y: auto;
}

.shadow {
  --tw-shadow: 0 10px 100px 0 rgb(0 0 0 / 0.1), 0 10px 20px -20px rgb(0 0 0 / 0.1) !important
}

.light .input-box {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.dark .input-box {
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