<script setup lang="ts">

  const props = defineProps(['text'])

</script>

<template>
  <div class="fixed w-full top-16">
    <div class="p-5 text-white text-center bg-rosewood w-fit m-auto rounded-xl">
      {{ props.text }}
    </div>
  </div>
</template>