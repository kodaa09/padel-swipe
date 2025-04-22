<script setup lang="ts">
const matchs = ref<Match[]>([]);

onMounted(async () => {
  const matches = await useMatchs().fetchMatchs();
  console.log(matches);
  if (matches) {
    matchs.value = matches.data;
  }
});
</script>

<template>
  <div>
    <div class="flex items-center justify-between mb-10">
      <h1 class="text-2xl font-bold">Matchs</h1>
      <CreateMatch />
    </div>

    <!-- <div class="mb-10">
      <MatchFilter />
    </div> -->

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MatchCard v-for="match in matchs" :key="match.id" :match="match" />
    </div>
  </div>
</template>
