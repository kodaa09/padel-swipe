<script setup lang="ts"></script>
<template>
  <div>
    <div class="mb-10">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-medium">Parties disponibles</h2>
        <MatchFilter />
      </div>

      <div class="flex gap-2 flex-wrap mb-6">
        <UBadge color="neutral" variant="soft" class="text-sm py-1 px-3">
          <span class="flex items-center gap-1">
            <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
            date
          </span>
        </UBadge>

        <UBadge color="neutral" variant="soft" class="text-sm py-1 px-3">
          <span class="flex items-center gap-1">
            <UIcon name="i-heroicons-chart-bar" class="w-4 h-4" />
            Niveau 3
          </span>
        </UBadge>

        <UBadge color="neutral" variant="soft" class="text-sm py-1 px-3">
          <span class="flex items-center gap-1">
            <UIcon name="i-heroicons-user-group" class="w-4 h-4" />
            1 places
          </span>
        </UBadge>

        <UBadge color="neutral" variant="soft" class="text-sm py-1 px-3">
          <span class="flex items-center gap-1">
            <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
            Paris
          </span>
        </UBadge>
      </div>
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
