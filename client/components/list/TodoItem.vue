<template>
  <li class="flex item-style items-center" @mouseover="showXButton" @mouseleave="hideXButton">
    <item-checkbox :index="index" :element="element" :white-mark-classes="whiteMarkClasses" :check-mark-classes="checkMarkClasses"
      @checkbox-hover="onCheckboxHover" @checkbox-leave="onCheckboxLeave" @checkbox-change="onItemCompletionChange" />
    <item-label :element="element" @label-change="onItemCompletionChange" />
    <item-delete-button :element="element" :delete-button-class="deleteButtonClass" />
  </li>
</template>
<script>
import ItemCheckbox from './item/ItemCheckbox.vue';
import ItemDeleteButton from './item/ItemDeleteButton.vue';
import ItemLabel from './item/ItemLabel.vue';

export default {
  name: 'TodoItem',
  components: {
    ItemCheckbox,
    ItemLabel,
    ItemDeleteButton,
  }
}
</script>
<script setup>
import { useTodoStore } from '@/store/todo';

const props = defineProps([
  'index',
  'element',
]);

const deleteButtonClass = ref('hide-button');
const checkMarkClasses = ref('');
const whiteMarkClasses = ref('');

// store
const store = useTodoStore();

watch(
  () => props.element.isCompleted,
  (newIsCompleted) => {
    const itemClasses = {
      'checkMark': {
        true: 'checkmark',
        false: 'checkmark'
      },
      'whiteMark': {
        true: 'hide-white-mark',
        false: 'show-white-mark',
      },
    };
    checkMarkClasses.value = itemClasses['checkMark'][newIsCompleted];
    whiteMarkClasses.value = itemClasses['whiteMark'][newIsCompleted];
  },
  { immediate: true }
);

const showXButton = () => deleteButtonClass.value = 'show-button';
const hideXButton = () => deleteButtonClass.value = 'hide-button';

const onCheckboxHover = () => {
  if (props.element.isCompleted === true) return;
  whiteMarkClasses.value = 'show-white-mark';
  checkMarkClasses.value = 'hide-checkmark';
}

const onCheckboxLeave = () => {
  whiteMarkClasses.value = 'hide-white-mark';
  checkMarkClasses.value = 'checkmark';
}

const onItemCompletionChange = async () => {
  onCheckboxLeave();
  const updateItem = {
    _id: props.element._id,
    isCompleted: !props.element.isCompleted
  };
  await store.toggleItemCompletion(updateItem);
}

</script>