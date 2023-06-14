// @vitest-environment node

import { describe, test, vi, beforeEach, afterEach } from 'vitest';
import { setup, $fetch, } from '@nuxt/test-utils';
import { setActivePinia, createPinia, defineStore } from 'pinia';
import { createTestingPinia } from '@pinia/testing';
import { useTodoStore } from '../store/todo';

vi.mock('../store/todo', () => ({
  useTodoStore() {
    return {
      todo: [],
      todoVM: [],
      addItem(item) {
        this.todo.push(item);
        this.todoVM.push(item);
      },
      filterAllTodo() {
        this.todoVM = this.todo;
      },
      filterActiveTodo() {
        this.todoVM = this.todo.filter(t => t.isCompleted === false);
      },
      filterCompletedTodo() {
        this.todoVM = this.todo.filter(t => t.isCompleted === true);
      },
      toggleItemCompletion(item) {
        let index = this.todo.findIndex(t => t._id === item._id);
        this.todo[index] = { ...this.todo[index], isCompleted: item.isCompleted };
        index = this.todoVM.findIndex(t => t._id === item._id);
        this.todoVM[index] = { ...this.todoVM[index], isCompleted: item.isCompleted };
      },
      toggleItemPosition(item) {
        let index = this.todo.findIndex(t => t._id === item._id);
        this.todo[index] = { ...this.todo[index], position: item.position };
        index = this.todoVM.findIndex(t => t._id === item._id);
        this.todoVM[index] = { ...this.todoVM[index], position: item.position };
      },
      deleteItem(id) {
        this.todo = this.todo.filter(t => t._id !== id);
        this.todoVM = this.todo;
      },
      deleteItems() {
        const ids = this.todo.filter(v => v.isCompleted === true).map(v => v._id);
        this.todo = this.todo.filter(t => !ids.includes(t._id));
        this.todoVM = this.todo;
      },
    }
  },
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe('index.vue', async () => {
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
  })

  await setup({
  })

  test('default layout', async () => {
    const html = await $fetch('/');
    expect(html).toContain('TODO');

    // light theme by default
    expect(html).toContain('light');
    expect(html).toContain('input');
  });

  it('todo store v1', () => {
    const todoStore = useTodoStore();
    expect(todoStore.todo.length).toBe(0);
    expect(todoStore.todoVM.length).toBe(0);
    todoStore.addItem({ _id: 1, label: 'coding', isCompleted: false, position: 0 });
    expect(todoStore.todo.length).toBe(1);
    expect(todoStore.todoVM.length).toBe(1);
    todoStore.addItem({ _id: 2, label: 'testing', isCompleted: true, position: 1 });
    expect(todoStore.todo.length).toBe(2);
    expect(todoStore.todoVM.length).toBe(2);
    todoStore.filterActiveTodo();
    expect(todoStore.todoVM.length).toBe(1);
    todoStore.filterCompletedTodo();
    expect(todoStore.todoVM.length).toBe(1);
    todoStore.filterAllTodo();
    expect(todoStore.todoVM.length).toBe(2);
    todoStore.toggleItemCompletion({_id: 1, isCompleted: true});
    expect(todoStore.todoVM[0].isCompleted).toBe(true);
    todoStore.toggleItemPosition({_id: 1, position: 2});
    expect(todoStore.todoVM[0].position).toBe(2);
  })
  
  it('todo store v2', () => {
    const todoStore = useTodoStore();
    todoStore.addItem({ _id: 1, label: 'coding', isCompleted: false, position: 0 });
    todoStore.addItem({ _id: 2, label: 'testing', isCompleted: true, position: 1 });
    todoStore.addItem({ _id: 3, label: 'playing', isCompleted: false, position: 2 });
    expect(todoStore.todo.length).toBe(3);
    expect(todoStore.todoVM.length).toBe(3);
    todoStore.deleteItems();
    expect(todoStore.todo.length).toBe(2);
    expect(todoStore.todoVM.length).toBe(2);
    todoStore.deleteItem(3);
    expect(todoStore.todo.length).toBe(1);
    expect(todoStore.todoVM.length).toBe(1);
  })

})
