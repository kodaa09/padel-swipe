<script setup lang="ts">
import { z } from "zod";
import { format } from "date-fns";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const state = ref({
  email: "",
  password: "",
});

const date = ref(new Date());
</script>
<template>
  <div>
    <div class="mb-10">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-medium text-gray-700 dark:text-gray-200">
          Parties disponibles
        </h2>
        <MatchFilter />
      </div>

      <div class="flex gap-2 flex-wrap mb-6">
        <UBadge color="gray" variant="soft" class="text-sm py-1 px-3">
          <span class="flex items-center gap-1">
            <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
            {{ format(date, "d MMM, yyy") }}
          </span>
        </UBadge>

        <UBadge color="gray" variant="soft" class="text-sm py-1 px-3">
          <span class="flex items-center gap-1">
            <UIcon name="i-heroicons-chart-bar" class="w-4 h-4" />
            Niveau 3
          </span>
        </UBadge>

        <UBadge color="gray" variant="soft" class="text-sm py-1 px-3">
          <span class="flex items-center gap-1">
            <UIcon name="i-heroicons-user-group" class="w-4 h-4" />
            1 places
          </span>
        </UBadge>

        <UBadge color="gray" variant="soft" class="text-sm py-1 px-3">
          <span class="flex items-center gap-1">
            <UIcon name="i-heroicons-map-pin" class="w-4 h-4" />
            Paris
          </span>
        </UBadge>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <MatchCard />
    </div>
  </div>
</template>
