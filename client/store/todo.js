import { defineStore } from 'pinia';
import { load, add, patchIsCompleted, patchPosition, remove } from '~/api/todo';

const getIndex = (arr, item) => arr.findIndex(t => t._id === item._id);

export const useTodoStore = defineStore('todo', () => {
  // state
  const todo = ref([]);
  const todoVM = ref([]);
  // getters
  const countActive = computed(() => todoVM.value.filter(t => t.isCompleted !== true).length);
  const todoNextPosition = computed(() => todo.value.length ? (todo.value[todo.value.length - 1].position + 1) : 0);
  // actions
  async function fetchData() {
    const data = await load();
    todo.value = data;
    todoVM.value = data;
  }
  async function addItem(item) {
    const addedItem = await add(item);
    todo.value.push(addedItem);
    filterAllTodo();
  }
  function filterAllTodo() {
    todoVM.value = todo.value;
  }
  function filterActiveTodo() {
    todoVM.value = todo.value.filter(t => t.isCompleted === false);
  }
  function filterCompletedTodo() {
    todoVM.value = todo.value.filter(t => t.isCompleted === true);
  }
  async function toggleItemCompletion(item) {
    await patchIsCompleted(item);
    let index = todo.value.findIndex(t => t._id === item._id);
    todo.value[index] = { ...todo.value[index], isCompleted: item.isCompleted };
    index = todoVM.value.findIndex(t => t._id === item._id);
    todoVM.value[index] = { ...todoVM.value[index], isCompleted: item.isCompleted };
  }
  async function toggleItemPosition(item) {
    await patchPosition(item);
    let index = todo.value.findIndex(t => t._id === item._id);
    todo.value[index] = { ...todo.value[index], position: item.position };
    index = todoVM.value.findIndex(t => t._id === item._id);
    todoVM.value[index] = { ...todoVM.value[index], position: item.position };
  }
  async function deleteItem(id) {
    await remove([id]);
    todo.value = todo.value.filter(t => t._id !== id);
    todoVM.value = todo.value;
  }
  async function deleteItems() {
    const ids = todo.value.filter(v => v.isCompleted === true).map(v => v._id);
    await remove(ids);
    todo.value = todo.value.filter(t => !ids.includes(t._id));
    todoVM.value = todo.value;
  }

  return { todo, todoVM, countActive, todoNextPosition, fetchData, addItem, filterAllTodo, filterActiveTodo, filterCompletedTodo, toggleItemCompletion, toggleItemPosition, deleteItem, deleteItems };
});