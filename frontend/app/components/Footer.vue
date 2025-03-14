<script setup lang="ts">
defineOptions({
  name: "AppFooter",
});
</script>

<template>
  <footer class="mt-16">
    <USeparator />
    <div class="container mx-auto py-8">
      <p>&copy; {{ new Date().getFullYear() }} Padel swipe</p>
    </div>
  </footer>
</template>
