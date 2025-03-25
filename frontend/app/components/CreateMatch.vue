<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";
import type { FormSubmitEvent } from "@nuxt/ui";
import { matchSchema, type MatchSchema } from "~/schemas/matchs.schema";

const df = new DateFormatter("fr-FR", {
  dateStyle: "medium",
});

const modelValue = shallowRef(new CalendarDate(2022, 1, 10));
const clubs = ref<{ label: string; value: string }[]>([]);

const state = reactive<Partial<MatchSchema>>({
  date: modelValue.value.toDate(getLocalTimeZone()).toISOString(),
  price: 32,
  duration: 60,
  court: 1,
  level: ["3"],
});

onMounted(async () => {
  clubs.value = await useClub().fetchClubs();
});

const onSubmit = (event: FormSubmitEvent<MatchSchema>) => {
  console.log("submit", event);
};
</script>

<template>
  <UModal title="Créer ton match">
    <UButton label="Créer ton match" />

    <template #body>
      <UForm
        :schema="matchSchema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <div class="flex items-center gap-2">
          <UFormField class="w-full" label="Date" required>
            <UPopover class="w-full">
              <UButton
                color="neutral"
                variant="subtle"
                icon="i-lucide-calendar"
              >
                {{
                  modelValue
                    ? df.format(modelValue.toDate(getLocalTimeZone()))
                    : "Choisir une date"
                }}
              </UButton>

              <template #content>
                <UCalendar v-model="modelValue" class="p-2" />
              </template>
            </UPopover>
          </UFormField>

          <UFormField class="w-full" label="Durée de la partie" required>
            <USelect
              v-model="state.duration"
              :items="useMatchs().durations"
              class="w-full"
            />
          </UFormField>
        </div>

        <div class="flex items-center gap-2">
          <UFormField class="w-full" label="Niveau" required>
            <USelectMenu
              v-model="state.level"
              multiple
              :items="useMatchs().levels"
              class="w-full"
            />
          </UFormField>
        </div>

        <div class="flex items-center gap-2">
          <UFormField class="w-4/12" label="Places disponibles" required>
            <UInputNumber class="w-full" :default-value="1" :min="1" :max="3" />
          </UFormField>

          <UFormField class="w-4/12" label="Court n°" required>
            <UInputNumber class="w-full" :default-value="1" />
          </UFormField>

          <UFormField class="w-4/12" label="Prix" required>
            <UInputNumber
              class="w-full"
              :default-value="32"
              :format-options="{
                style: 'currency',
                currency: 'EUR',
                currencyDisplay: 'symbol',
                currencySign: 'accounting',
              }"
            />
          </UFormField>
        </div>

        <UFormField class="w-full" label="Choisir un club" required>
          <USelectMenu
            v-model="state.club"
            value-key="value"
            :items="clubs"
            class="w-full"
          />
        </UFormField>

        <UButton class="mt-4" type="submit" block> Créer ton match </UButton>
      </UForm>
    </template>
  </UModal>
</template>
