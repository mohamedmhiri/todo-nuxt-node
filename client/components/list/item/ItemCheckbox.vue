<template>
  <the-checkbox :check-mark-classes="checkMarkClasses" :white-mark-classes="whiteMarkClasses" :checkbox-id="itemCheckboxId"
    :element="element" @checkbox-hover="onCheckboxHover" @checkbox-leave="onCheckboxLeave"
    @checkbox-change="onCheckboxChange" />
</template>
<script>
import TheCheckbox from '@/components/ui/TheCheckbox.vue';

export default {
  name: 'ItemCheckbox',
  components: {
    TheCheckbox
  }
}
</script>
<script setup>
import { computed } from 'vue';

const props = defineProps([
  'index',
  'element',
  'checkMarkClasses',
  'whiteMarkClasses',
]);

const emit = defineEmits([
  'checkboxHover',
  'checkboxLeave',
  'checkboxChange',
]);

const itemCheckboxId = computed(() => `todo-item-${props.index}`);

const onCheckboxHover = () => emit('checkboxHover');
const onCheckboxLeave = () => emit('checkboxLeave');
const onCheckboxChange = () => emit('checkboxChange');

</script>