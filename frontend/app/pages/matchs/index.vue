<script setup lang="ts"></script>
<template>
  <div>
    <div class="flex items-center justify-between mb-10">
      <h1 class="text-2xl font-bold">Matchs</h1>
      <CreateMatch />
    </div>

    <div class="mb-10">
      <MatchFilter />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MatchCard />
      <MatchCard />
      <MatchCard />
      <MatchCard />
      <MatchCard />
      <MatchCard />
    </div>
  </div>
</template>
