<script setup lang="ts">
const props = defineProps<{
  match: Match;
}>();
</script>

<template>
  <NuxtLink href="me">
    <UCard class="transition-all hover:shadow-md">
      <div class="flex items-center justify-between mb-2">
        <div>
          <h3 class="text-xl font-medium mb-1">
            Match à {{ props.match.club.name }}
          </h3>
        </div>
        <UBadge color="neutral" variant="soft">
          <UIcon name="i-heroicons-calendar" />
          <span class="text-sm">10 Mars 2025</span>
        </UBadge>
      </div>

      <div class="flex items-center flex-wrap gap-2 mb-6 w-8/12">
        <UBadge color="primary" variant="soft">
          Niveau {{ props.match.level }}
        </UBadge>
        <UBadge color="neutral" variant="soft">
          {{ 4 - props.match.playersCount }} places disponibles
        </UBadge>
        <UBadge color="neutral" variant="soft">
          Court N°{{ props.match.courtNumber }}
        </UBadge>
        <UBadge color="neutral" variant="soft">
          {{ props.match.price }} € / personne
        </UBadge>
        <UBadge color="neutral" variant="soft">
          {{ props.match.duration }} min
        </UBadge>
      </div>

      <div>
        <div class="flex items-center mb-2">
          <UIcon name="i-heroicons-map-pin" class="mr-2 text-gray-500" />
          <span class="text-sm text-gray-600">{{ props.match.club.name }}</span>
        </div>
        <div class="flex items-center mb-6">
          <UIcon
            name="i-heroicons-building-office-2"
            class="mr-2 text-gray-500"
          />
          <span class="text-sm text-gray-600"
            >{{ props.match.club.address }}, {{ props.match.club.city }}
            {{ props.match.club.zipCode }}</span
          >
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <UIcon name="i-heroicons-user" class="mr-2 text-gray-500" />
          <span class="text-sm text-gray-600">Créé par Thomas Dupont</span>
        </div>
        <UButton class="cursor-pointer">
          Rejoindre
          <UIcon name="i-material-symbols:arrow-right-alt" class="w-5 h-5" />
        </UButton>
      </div>
    </UCard>
  </NuxtLink>
</template>
