<template>
  <div class="grow lg:w-4/12 xl:w-4/12 sm:w-10/12 md:w-10/12">
    <div class="h-100 max-w-screen-xl flex bg-teal-lightest">
      <div class="list-box rounded shadow w-full">
        <!-- Todo List -->
        <draggable v-model="filteredTodo" tag="ul" item-key="_id" class="divide-y divide-solid todo-list"
          @update="moveItem">
          <template #item="{ element, index }">
            <li class="flex item-style items-center" @mouseover="showXButton(index)" @mouseleave="hideXButton(index)">
              <!-- Todo Item -->
              <!-- Item checkbox -->
              <label class="checkbox-block" :for="'todo-item-' + index" @mouseover="showWhiteMarkByKey(index)"
                @mouseleave="hideWhiteMarkByKey(index)">
                <input class="todo-checkbox" type="checkbox" :id="'todo-item-' + index"
                  :checked="todoItemStateVModels[index]" @change="toggleTodoItemState(index)" />
                <span class="checkmark" :ref="el => { checkMarks[index] = el }"></span>
                <span class="hide-white-mark" :ref="el => { whiteMarks[index] = el }"></span>
              </label>
              <!-- Item label -->
              <p @click="toggleTodoItemState(index)"
                :class="todoItemStateVModels[index] ? 'line-through text-very-light-gray' : 'text-very-dark-gray'"
                class="w-full ml-9 normal-font-weight normal-font-family pointer" :ref="el => { todoItems[index] = el }">
                {{ element.label }}
              </p>
              <!-- Item delete button -->
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
        <!-- Todo footer -->
        <div class="sticky items-footer p-4 flex flex-row md:items-center md:justify-center">
          <!-- Left items (mobile) -->
          <p v-if="isMounted && isMobile"
            class="basis-1/4 small-font-size bold-font-weight light-font-family text-dark-gray">
            {{ leftItems }} item{{ leftItems > 1 ? 's' : '' }} left
          </p>
          <!-- Left items (desktop) -->
          <p v-if="isMounted && !isMobile"
            class="basis-1/3 small-font-size bold-font-weight light-font-family text-dark-gray">
            {{ leftItems }} item{{ leftItems > 1 ? 's' : '' }} left
          </p>
          <!-- White space (mobile) -->
          <div v-if="isMounted && isMobile" class="grow ml-6"></div>
          <!-- Filter buttons (desktop) -->
          <div v-if="isMounted && !isMobile" class="basis-2/4 ml-6">
            <!-- All items button (desktop) -->
            <button @mouseover="onHoverAllItemsButton" @mouseleave="onLeaveAllItemsButton" @click="onClickAllItemsButton"
              :class="allItemsButtonColor" class="m-1">All</button>
            <!-- Active items button (desktop) -->
            <button @mouseover="onHoverActiveItemsButton" @mouseleave="onLeaveActiveItemsButton"
              @click="onClickActiveItemsButton" :class="activeItemsButtonColor" class="m-1">Active</button>
            <!-- Completed items button (desktop) -->
            <button @mouseover="onHoverCompletedItemsButton" @mouseleave="onLeaveCompletedItemsButton"
              @click="onClickCompletedItemsButton" :class="completedItemsButtonColor" class="m-1">Completed</button>
          </div>
          <!-- Clear completed (desktop) -->
          <button v-if="isMounted && !isMobile" type="button" @mouseover="onHoverClearCompleted" @click="onClearCompleted"
            @mouseleave="onLeaveClearCompleted" :class="clearCompletedTextColor" class="basis-1/4 small-font-size">
            Clear Completed
          </button>
          <!-- Clear completed (mobile) -->
          <button v-if="isMounted && isMobile" type="button" @mouseover="onHoverClearCompleted" @click="onClearCompleted"
            @mouseleave="onLeaveClearCompleted" :class="clearCompletedTextColor" class="basis-1/3 small-font-size">
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from 'vuedraggable';
export default {
  name: 'ListSection',
  components: {
    draggable
  }
}
</script>
