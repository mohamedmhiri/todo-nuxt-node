<template>
  <div class="flex flex-col w-screen hidden-overflow">
    <div class="flex-auto bg-desktop-light"></div>
    <div class="grow hidden-overflow very-light-gray">
      <div class="flex flex-col items-center justify-center main-content gap-y-8">
        <div class="basis-1/12 w-4/12">
          <div class="h-100 flex-row flex">
            <h1 class="text-5xl text-white grow tracking-widest">TODO</h1>
            <button type="button basis-1/6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" class="fill-white w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                  d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            </button>
          </div>
        </div>
        <div class="basis-1/12 w-4/12">
          <div class="h-100 w-full flex items-center p-6 container bg-white rounded h-16">
            <label class="checkbox-block" for="newTodoState" @mouseover="showWhiteMark()"
              @mouseleave="hideWhiteMark()">
              <input class="todo-checkbox" type="checkbox" id="newTodoState"
                :checked="newTodo.state" @change="toggleNewTodoItemState()" />
              <span class="checkmark" ref="checkMark"></span>
              <span class="hide-white-mark" ref="whiteMark"></span>
            </label>
            <div class="flex items-center grow">
              <span :class="currentlyTypingSpanIsDisplayed ? 'display-content' : 'hidden-content'"
                class="flex select-none items-center pl-3 text-gray-500 sm:text-sm bg-transparent">Currently
                typing</span>
              <span :class="currentlyTypingSpanIsDisplayed ? 'display-content' : 'hidden-content'"
                class="ml-1 flex select-none items-center pl-3 text-gray-500 sm:text-sm bg-transparent txt-bright-blue">
                |</span>
              <input class="ml-1 block grow bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400
                sm:text-sm sm:leading-6 bg-transparent" placeholder="Create a new todo..." v-model="newTodo.label"
                @keyup.enter="addTodo" @keyup="displayCurrentlyTypingSpan" @mousedown="displayCurrentlyTypingSpan"
                @mouseout="hideCurrentlyTypingSpan">
            </div>
          </div>
        </div>
        <div class="grow w-4/12">
          <div class="h-100 max-w-screen-xl flex bg-teal-lightest">
            <div class="bg-white rounded shadow w-full">
              <ul class="divide-y divide-solid todo-list">
                <li v-for="(item, key) in todo" :key="item._id" class="flex p-6 items-center"
                  @mouseover="showXButton(key)" @mouseleave="hideXButton(key)">
                  <label class="checkbox-block" :for="'todo-item-' + key" @mouseover="showWhiteMarkByKey(key)"
                    @mouseleave="hideWhiteMarkByKey(key)">
                    <input class="todo-checkbox" type="checkbox" :id="'todo-item-' + key"
                      :checked="todoItemStateVModels[key]" @change="toggleTodoItemState(key)" />
                    <span class="checkmark" :ref="el => { checkMarks[key] = el }"></span>
                    <span class="hide-white-mark" :ref="el => { whiteMarks[key] = el }"></span>
                  </label>
                  <!-- <input class="todo-checkbox" type="checkbox" /> -->
                  <p class="w-full text-grey-darkest ml-9 bold-font-weight">{{ item.label }}</p>
                  <button type="button" class="hide-button" :ref="el => { xButtons[key] = el }">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                      stroke="currentColor" class="w-6 h-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </li>
              </ul>
              <div class="sticky p-6 flex flex-row items-center justify-center">
                <p class="basis-1/4">
                  {{ todo.length }} item{{ todo.length > 1 ? 's' : '' }} left
                </p>
                <div class="basis-2/4 ml-6">
                  <button class="m-1">All</button>
                  <button class="m-1">Active</button>
                  <button class="m-1">Completed</button>
                </div>
                <button type="button" class="basis-1/4">
                  Clear Completed
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="basis-1/12 w-4/12">
          <div class="h-100 w-full flex items-center justify-center">
            <p class="text-gray-500">
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

// data init
let todo = ref([]);
// should be a const and not within the vue data
const newTodoInitialValue = { state: false, label: '' };
const newTodo = ref({ state: false, label: '' });
const nextPosition = ref(0);
const currentlyTypingSpanIsDisplayed = ref(false);
let todoItemStateVModels = ref([]);

// $refs 
const checkMark = ref(null);
const checkMarks = ref([]);
const whiteMark = ref(null);
const whiteMarks = ref([]);
const xButtons = ref([]);

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
  await $fetch('http://localhost:4000/api/todos', {
    method: 'POST',
    body: createNewTodo
  });
  newTodo.value = newTodoInitialValue;
  await fetchTodoData();
}

const displayCurrentlyTypingSpan = () => {
  currentlyTypingSpanIsDisplayed.value = true;
}

const hideCurrentlyTypingSpan = () => {
  if (newTodo.value.label.length) {
    currentlyTypingSpanIsDisplayed.value = false;
  }
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
}
const toggleNewTodoItemState = () => {
  hideWhiteMark();
  if (typeof newTodo.value.state !== 'boolean') return;
  newTodo.value.state = !newTodo.value.state;
}
</script>
<style>
@font-face {
  font-family: 'Josefin Sans';
  src: url('~/assets/fonts/static/JosefinSans-Regular.ttf') format('truetype')
}

* {
  font-family: 'Josefin Sans';
}

.normal-font-size {
  font-size: 18px !important;
}

.small-font-size {
  font-size: 12px !important;
}

.normal-font-weight {
  font-weight: 400 !important;
}

.bold-font-weight {
  font-weight: 700 !important;
}

.very-light-gray {
  background-color: hsl(0, 0%, 98%);
}

.w-screen {
  max-height: 100vh !important;
}

.bg-desktop-light {
  background: url('~/assets/images/bg-desktop-light.jpg');
  background-repeat: no-repeat;
  background-size: 100vw;
  min-height: 28vh;
}

.bg-desktop-dark {
  background: url('~/assets/images/bg-desktop-dark.jpg');
  background-repeat: no-repeat;
  background-size: 100vw;
  min-height: 28vh;
}

.bg-mobile-light {
  background: url('~/assets/images/bg-mobile-light.jpg');
  background-repeat: no-repeat;
  background-size: 100vw;
  min-height: 28vh;
}

.bg-mobile-dark {
  background: url('~/assets/images/bg-mobile-dark.jpg');
  background-repeat: no-repeat;
  background-size: 100vw;
  min-height: 28vh;
}

.main-content {
  min-height: 60vh;
  transform: translateY(-25%);
}

.txt-bright-blue {
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
  display: none;
}

.show-button {
  display: block;
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
  max-height: 440px;
  overflow-y: auto;
}

.shadow {
  --tw-shadow: 0 3px 6px 0 rgb(0 0 0 / 0.1), 0 3px 6px -1px rgb(0 0 0 / 0.1) !important;
}
</style>
<style src="./checkbox.css"></style>