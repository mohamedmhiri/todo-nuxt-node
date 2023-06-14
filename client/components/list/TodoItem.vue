<template>
  <li class="flex item-style items-center" @mouseover="showXButton" @mouseleave="hideXButton">
    <item-checkbox :index="index" :element="element" :white-mark-classes="whiteMarkClasses"
      :check-mark-classes="checkMarkClasses" @checkbox-hover="onCheckboxHover" @checkbox-leave="onCheckboxLeave"
      @checkbox-change="onItemCompletionChange" />
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
import { useTodoStore } from '../../store/todo';
import { CHECK_MARK_CLASSES, HIDE_CHECK_MARK_CLASSES, WHITE_MARK_CLASSES, HIDE_WHITE_MARK_CLASSES, SHOW_BUTTON, HIDE_BUTTON } from '../../constants';

const props = defineProps([
  'index',
  'element',
]);

const deleteButtonClass = ref(HIDE_BUTTON);
const checkMarkClasses = ref('');
const whiteMarkClasses = ref('');

// store
const store = useTodoStore();

watch(
  () => props.element.isCompleted,
  (newIsCompleted) => {
    const itemClasses = {
      'checkMark': {
        true: CHECK_MARK_CLASSES,
        false: CHECK_MARK_CLASSES
      },
      'whiteMark': {
        true: HIDE_WHITE_MARK_CLASSES,
        false: WHITE_MARK_CLASSES,
      },
    };
    checkMarkClasses.value = itemClasses['checkMark'][newIsCompleted];
    whiteMarkClasses.value = itemClasses['whiteMark'][newIsCompleted];
  },
  { immediate: true }
);

const showXButton = () => deleteButtonClass.value = SHOW_BUTTON;
const hideXButton = () => deleteButtonClass.value = HIDE_BUTTON;

const onCheckboxHover = () => {
  if (props.element.isCompleted === true) return;
  whiteMarkClasses.value = WHITE_MARK_CLASSES;
  checkMarkClasses.value = HIDE_CHECK_MARK_CLASSES;
}

const onCheckboxLeave = () => {
  whiteMarkClasses.value = HIDE_WHITE_MARK_CLASSES;
  checkMarkClasses.value = CHECK_MARK_CLASSES;
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