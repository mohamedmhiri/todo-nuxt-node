<template>
  <label class="checkbox-block" :for="checkboxId" @mouseover="onCheckboxHover" @mouseleave="onCheckboxLeave">
    <input class="todo-checkbox" type="checkbox" :id="checkboxId" :checked="element.isCompleted"
      @change="onCheckboxChange" />
    <span :class="checkMarkClasses"></span>
    <span :class="whiteMarkClasses"></span>
  </label>
</template>
<script>
export default {
  name: 'TheCheckbox'
}
</script>
<script setup>
const props = defineProps(['checkboxId', 'checkMarkClasses', 'whiteMarkClasses', 'element']);
const emit = defineEmits(['checkboxChange', 'checkboxHover', 'checkboxLeave']);

const onCheckboxChange = () => emit('checkboxChange');
const onCheckboxHover = () => emit('checkboxHover');
const onCheckboxLeave = () => emit('checkboxLeave');
</script>