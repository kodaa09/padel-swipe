<script setup lang="ts"></script>

<template>
  <NuxtLink href="me">
    <UCard class="transition-all hover:shadow-md">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-xl font-medium mb-1">Partie à Paris</h3>
          <div class="flex items-center gap-2">
            <UBadge color="primary" variant="soft">Niveau 3</UBadge>
            <UBadge color="neutral" variant="soft">3 places</UBadge>
          </div>
        </div>
        <UBadge :color="true ? 'primary' : 'error'">
          <UIcon name="i-heroicons-calendar" />
          <span class="text-sm">10 Mars 2025</span>
        </UBadge>
      </div>

      <div class="flex items-center mb-3">
        <UIcon name="i-heroicons-user" class="mr-2 text-gray-500" />
        <span class="text-sm text-gray-600">Créé par Thomas Dupont</span>
      </div>

      <div>
        <div class="flex items-center mb-2">
          <UIcon name="i-heroicons-map-pin" class="mr-2 text-gray-500" />
          <span class="text-sm text-gray-600">Club de Padel Central</span>
        </div>
        <div class="flex items-center">
          <UIcon
            name="i-heroicons-building-office-2"
            class="mr-2 text-gray-500"
          />
          <span class="text-sm text-gray-600">12 Rue du Sport</span>
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex gap-2"></div>
        <UIcon name="i-material-symbols:arrow-right-alt" class="w-5 h-5" />
      </div>
    </UCard>
  </NuxtLink>
</template>
