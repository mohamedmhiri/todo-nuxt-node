<template>
  <div v-if="isMounted && isMobile" class="basis-1/12 lg:w-4/12 xl:w-4/12 sm:w-10/12 md:w-10/12">
    <div class="p-4 flex flex-row items-center justify-center sm:content-around bg-teal-lightest buttons-box w-full">
      <!-- All items button (mobile) -->
      <button @mouseover="onHoverAllItemsButton" @mouseleave="onLeaveAllItemsButton" @click="onClickAllItemsButton"
        :class="allItemsButtonColor" class="m-1">All</button>
      <!-- Active items button (mobile) -->
      <button @mouseover="onHoverActiveItemsButton" @mouseleave="onLeaveActiveItemsButton"
        @click="onClickActiveItemsButton" :class="activeItemsButtonColor" class="m-1">Active</button>
      <!-- Completed items button (mobile) -->
      <button @mouseover="onHoverCompletedItemsButton" @mouseleave="onLeaveCompletedItemsButton"
        @click="onClickCompletedItemsButton" :class="completedItemsButtonColor" class="m-1">Completed</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FilterButtons'
}
</script>
