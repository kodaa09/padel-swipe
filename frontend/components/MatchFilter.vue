<script setup lang="ts">
const isOpen = ref(false);

const levels = ref([
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "3+", value: "3+" },
  { label: "4", value: "4" },
  { label: "4+", value: "4+" },
  { label: "5", value: "5" },
  { label: "5+", value: "5+" },
]);

const places = ref([
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
]);

const locations = ref([
  { label: "Paris", value: "Paris" },
  { label: "Lyon", value: "Lyon" },
  { label: "Marseille", value: "Marseille" },
]);
</script>

<template>
  <div>
    <UButton
      label="Filtres"
      icon="i-heroicons-adjustments-horizontal"
      color="gray"
      @click="isOpen = true"
    />

    <UModal v-model="isOpen" prevent-close>
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Modal
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <div class="p-4">
          <h2 class="text-lg font-medium">Filtres</h2>
        </div>
      </UCard>
    </UModal>
  </div>
</template>
