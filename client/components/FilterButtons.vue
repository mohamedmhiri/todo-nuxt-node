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
import { SMALL_NORMAL_BOLD_FONT, TEXT_BRIGHT_BLUE, TEXT_VERY_DARK_GRAY, TEXT_LIGHT_GRAY } from '@/constants';

const props = defineProps([
  'boxClass'
]);

// buttons style
const allItemsButtonColor = ref(`${SMALL_NORMAL_BOLD_FONT} ${TEXT_BRIGHT_BLUE}`);
const activeItemsButtonColor = ref(`${SMALL_NORMAL_BOLD_FONT} ${TEXT_LIGHT_GRAY}`);
const completedItemsButtonColor = ref(`${SMALL_NORMAL_BOLD_FONT} ${TEXT_LIGHT_GRAY}`);

const store = useTodoStore();

const getResetFilterButtonStyle = () => `${SMALL_NORMAL_BOLD_FONT} ${TEXT_LIGHT_GRAY}`;
const getPrimaryFilterButtonStyle = () => `${SMALL_NORMAL_BOLD_FONT} ${TEXT_BRIGHT_BLUE}`;

const onClickAllItemsButton = async () => {
  await store.filterAllTodo();
  allItemsButtonColor.value = getPrimaryFilterButtonStyle();
  activeItemsButtonColor.value = getResetFilterButtonStyle();
  completedItemsButtonColor.value = getResetFilterButtonStyle();
}

const onHoverAllItemsButton = () => {
  if (allItemsButtonColor.value.includes(TEXT_BRIGHT_BLUE)) return;
  allItemsButtonColor.value = `${SMALL_NORMAL_BOLD_FONT} ${TEXT_VERY_DARK_GRAY}`;
}

const onLeaveAllItemsButton = () => {
  if (allItemsButtonColor.value.includes(TEXT_BRIGHT_BLUE)) return;
  allItemsButtonColor.value = getResetFilterButtonStyle();
}

const onClickActiveItemsButton = async () => {
  await store.filterActiveTodo();
  activeItemsButtonColor.value = getPrimaryFilterButtonStyle();
  completedItemsButtonColor.value = getResetFilterButtonStyle();
  allItemsButtonColor.value = getResetFilterButtonStyle();
}

const onHoverActiveItemsButton = () => {
  if (activeItemsButtonColor.value.includes(TEXT_BRIGHT_BLUE)) return;
  activeItemsButtonColor.value = `${SMALL_NORMAL_BOLD_FONT} ${TEXT_VERY_DARK_GRAY}`;
}

const onLeaveActiveItemsButton = () => {
  if (activeItemsButtonColor.value.includes(TEXT_BRIGHT_BLUE)) return;
  activeItemsButtonColor.value = getResetFilterButtonStyle();
}

const onClickCompletedItemsButton = async () => {
  await store.filterCompletedTodo();
  completedItemsButtonColor.value = getPrimaryFilterButtonStyle();
  activeItemsButtonColor.value = getResetFilterButtonStyle();
  allItemsButtonColor.value = getResetFilterButtonStyle();
}

const onHoverCompletedItemsButton = () => {
  if (completedItemsButtonColor.value.includes(TEXT_BRIGHT_BLUE)) return;
  completedItemsButtonColor.value = `${SMALL_NORMAL_BOLD_FONT} ${TEXT_VERY_DARK_GRAY}`;
}

const onLeaveCompletedItemsButton = () => {
  if (completedItemsButtonColor.value.includes(TEXT_BRIGHT_BLUE)) return;
  completedItemsButtonColor.value = getResetFilterButtonStyle();
}

</script>
