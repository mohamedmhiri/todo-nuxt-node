<template>
  <div :class="boxClass">
    <!-- All items button -->
    <the-button @button-hover="onHoverAllItemsButton" @button-leave="onLeaveAllItemsButton"
      @button-click="onClickAllItemsButton" :button-classes="allItemsButtonColor">All</the-button>
    <!-- Active items button -->
    <the-button @button-hover="onHoverActiveItemsButton" @button-leave="onLeaveActiveItemsButton"
      @button-click="onClickActiveItemsButton" :button-classes="activeItemsButtonColor">Active</the-button>
    <!-- Completed items button -->
    <the-button @button-hover="onHoverCompletedItemsButton" @button-leave="onLeaveCompletedItemsButton"
      @button-click="onClickCompletedItemsButton" :button-classes="completedItemsButtonColor">Completed</the-button>
  </div>
</template>
<script>
import TheButton from '@/components/ui/TheButton.vue';

export default {
  name: 'FilterButtons',
  components: {
    TheButton
  }
}
</script>
<script setup>
import { useTodoStore } from '@/store/todo';

const props = defineProps([
  'boxClass'
]);

// buttons style
const allItemsButtonColor = ref('m-1 small-font-size bold-font-weight normal-font-family text-bright-blue');
const activeItemsButtonColor = ref('m-1 small-font-size bold-font-weight normal-font-family text-light-gray');
const completedItemsButtonColor = ref('m-1 small-font-size bold-font-weight normal-font-family text-light-gray');

const store = useTodoStore();

const getResetFilterButtonStyle = () => 'm-1 small-font-size bold-font-weight normal-font-family text-light-gray';
const getPrimaryFilterButtonStyle = () => 'm-1 small-font-size bold-font-weight normal-font-family text-bright-blue';

const onClickAllItemsButton = async () => {
  await store.filterAllTodo();
  allItemsButtonColor.value = getPrimaryFilterButtonStyle();
  activeItemsButtonColor.value = getResetFilterButtonStyle();
  completedItemsButtonColor.value = getResetFilterButtonStyle();
}

const onHoverAllItemsButton = () => {
  if (allItemsButtonColor.value.includes('text-bright-blue')) return;
  allItemsButtonColor.value = 'm-1 small-font-size bold-font-weight normal-font-family text-very-dark-gray';
}

const onLeaveAllItemsButton = () => {
  if (allItemsButtonColor.value.includes('text-bright-blue')) return;
  allItemsButtonColor.value = getResetFilterButtonStyle();
}

const onClickActiveItemsButton = async () => {
  await store.filterActiveTodo();
  activeItemsButtonColor.value = getPrimaryFilterButtonStyle();
  completedItemsButtonColor.value = getResetFilterButtonStyle();
  allItemsButtonColor.value = getResetFilterButtonStyle();
}

const onHoverActiveItemsButton = () => {
  if (activeItemsButtonColor.value.includes('text-bright-blue')) return;
  activeItemsButtonColor.value = 'm-1 small-font-size bold-font-weight normal-font-family text-very-dark-gray';
}

const onLeaveActiveItemsButton = () => {
  if (activeItemsButtonColor.value.includes('text-bright-blue')) return;
  activeItemsButtonColor.value = getResetFilterButtonStyle();
}

const onClickCompletedItemsButton = async () => {
  await store.filterCompletedTodo();
  completedItemsButtonColor.value = getPrimaryFilterButtonStyle();
  activeItemsButtonColor.value = getResetFilterButtonStyle();
  allItemsButtonColor.value = getResetFilterButtonStyle();
}

const onHoverCompletedItemsButton = () => {
  if (completedItemsButtonColor.value.includes('text-bright-blue')) return;
  completedItemsButtonColor.value = 'm-1 small-font-size bold-font-weight normal-font-family text-very-dark-gray';
}

const onLeaveCompletedItemsButton = () => {
  if (completedItemsButtonColor.value.includes('text-bright-blue')) return;
  completedItemsButtonColor.value = getResetFilterButtonStyle();
}

</script>
