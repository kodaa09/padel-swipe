<script setup lang="ts">
import { fromDate, DateFormatter } from "@internationalized/date";
import type { FormSubmitEvent } from "@nuxt/ui";
import { matchSchema, type MatchSchema } from "~/schemas/matchs.schema";

const isOpen = ref(false);
const isLoading = ref(false);

const df = new DateFormatter("fr-FR", {
  dateStyle: "medium",
});

const modelValue = shallowRef(fromDate(new Date(), "Europe/Paris"));
const clubs = ref<{ label: string; value: string }[]>([]);

const state = reactive<Partial<MatchSchema>>({
  date: modelValue.value.toDate().toISOString(),
  price: 32,
  duration: 60,
  courtNumber: 1,
  level: [],
  clubId: "",
  playersCount: 1,
});

onMounted(async () => {
  clubs.value = await useClub().fetchClubs();
});

const onSubmit = async (event: FormSubmitEvent<MatchSchema>) => {
  isLoading.value = true;
  try {
    await useMatchs().createMatch(event.data);
    isOpen.value = false;
    useToast().add({
      title: "Match créé avec succès",
      description: "Votre match a été créé avec succès",
      color: "success",
    });
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
    resetForm();
  }
};

const resetForm = () => {
  state.date = modelValue.value.toDate().toISOString();
  state.price = 32;
  state.duration = 60;
  state.courtNumber = 1;
  state.level = [];
  state.playersCount = 1;
};
</script>

<template>
  <UModal v-model:open="isOpen" title="Créer ton match">
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
                    ? df.format(modelValue.toDate())
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
              placeholder="Choisi le niveau du match"
              class="w-full"
            />
          </UFormField>
        </div>

        <div class="flex items-center gap-2">
          <UFormField class="w-4/12" label="Places disponibles" required>
            <UInputNumber
              v-model="state.playersCount"
              class="w-full"
              :default-value="1"
              :min="1"
              :max="3"
            />
          </UFormField>

          <UFormField class="w-4/12" label="Court n°" required>
            <UInputNumber
              v-model="state.courtNumber"
              class="w-full"
              :default-value="1"
            />
          </UFormField>

          <UFormField class="w-4/12" label="Prix" required>
            <UInputNumber
              v-model="state.price"
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
            v-model="state.clubId"
            value-key="value"
            :items="clubs"
            icon="i-lucide-search"
            placeholder="Choisi l'emplacement du match"
            class="w-full"
          />
        </UFormField>

        <UButton class="mt-4" type="submit" block :loading="isLoading">
          Créer ton match
        </UButton>
      </UForm>
    </template>
  </UModal>
</template>
