<template>
  <the-button :button-classes="clearCompletedClasses" @button-hover="onHoverClearCompleted"
    @button-click="onClickClearCompleted" @button-leave="onLeaveClearCompleted">
    {{ clearCompletedDescription }}
  </the-button>
</template>
<script>
import TheButton from './ui/TheButton.vue';

export default {
  name: 'ClearCompleted',
  components: {
    TheButton
  }
}
</script>
<script setup>
import { ref, computed } from 'vue';
import { useTodoStore } from '../store/todo';

const props = defineProps(['isMobile']);

const clearCompletedTextColor = ref('bold-font-weight light-font-family text-dark-gray');
const clearCompletedDescription = ref('Clear Completed');
const clearCompletedClasses = ref('');

const clearCompletedDesktopClasses = computed(() => `basis-1/4 small-font-size ${clearCompletedTextColor.value}`);
const clearCompletedMobileClasses = computed(() => `basis-1/3 small-font-size ${clearCompletedTextColor.value}`);

const colorMode = useColorMode();

const store = useTodoStore();

watch(
  () => props.isMobile,
  () => {
    clearCompletedClasses.value = props.isMobile === true ? clearCompletedMobileClasses.value : clearCompletedDesktopClasses.value;
  },
  { immediate: true }
);

watch(
  clearCompletedTextColor,
  () => {
    clearCompletedClasses.value = props.isMobile === true ? clearCompletedMobileClasses.value : clearCompletedDesktopClasses.value;
  },
  { immediate: true }
);

const onClickClearCompleted = async () => {
  await store.deleteItems();
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
</script>