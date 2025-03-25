<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const modelValue = shallowRef(new CalendarDate(2022, 1, 10));

const levels = [
  "1",
  "2",
  "3",
  "3+",
  "4",
  "4+",
  "5",
  "5+",
  "6",
  "6+",
  "7",
  "7+",
  "8",
];
const selectedLevel = ref("");
</script>

<template>
  <UCard>
    <h3 class="text-lg font-medium mb-4">Filtrer les matchs</h3>

    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
      <UFormField label="Niveau">
        <USelect
          v-model="selectedLevel"
          :items="levels"
          placeholder="Sélectionner un niveau"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Date">
        <UPopover class="w-full">
          <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
            {{
              modelValue
                ? df.format(modelValue.toDate(getLocalTimeZone()))
                : "Select a date"
            }}
          </UButton>

          <template #content>
            <UCalendar v-model="modelValue" class="p-2" />
          </template>
        </UPopover>
      </UFormField>

      <UFormField label="Villes">
        <USelect
          v-model="selectedLevel"
          :items="levels"
          placeholder="Sélectionner une ville"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Nombre de joueurs">
        <USelect
          v-model="selectedLevel"
          :items="levels"
          placeholder="Sélectionner un nombre de joueurs"
          class="w-full"
        />
      </UFormField>
    </div>
    <div class="flex justify-end">
      <UButton color="neutral" icon="i-heroicons-x-mark" variant="outline">
        Réinitialiser
      </UButton>
    </div>
  </UCard>
</template>
