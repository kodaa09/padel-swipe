<script setup lang="ts">
import { clubSchema, type ClubSchema } from "~/schemas/clubs.schema";
import type { FormSubmitEvent } from "@nuxt/ui";

const state = reactive<ClubSchema>({
  name: "",
  address: "",
  city: "",
  zipCode: "",
  phone: "",
  email: null,
  country: "France",
});
const isLoading = ref(false);

const onSubmit = async (event: FormSubmitEvent<ClubSchema>) => {
  try {
    isLoading.value = true;
    const response = await useClub().addClub(event.data);

    if (response.status === "success") {
      useToast().add({
        title: "Club ajouté avec succès",
        description: "Votre club a été ajouté avec succès",
        icon: "i-heroicons-check-circle",
        color: "success",
      });
      navigateTo("/matchs");
    }
  } catch (error) {
    console.error(error, "error");
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div>
    <UForm
      :schema="clubSchema"
      :state="state"
      class="space-y-4"
      @submit="onSubmit"
    >
      <UFormField label="Nom" required>
        <UInput
          v-model="state.name"
          placeholder="Ex: Padel Horizon"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Pays" required>
        <UInput v-model="state.country" class="w-full" disabled />
      </UFormField>

      <UFormField label="Ville" required>
        <UInput v-model="state.city" placeholder="Ex: Paris" class="w-full" />
      </UFormField>

      <UFormField label="Adresse" required>
        <UInput
          v-model="state.address"
          placeholder="Ex: 123 Rue de la Paix"
          class="w-full"
        />
      </UFormField>

      <UFormField label="Code postal" required>
        <UInput v-model="state.zipCode" class="w-full" />
      </UFormField>

      <UFormField label="Téléphone" required>
        <UInput v-model="state.phone" class="w-full" />
      </UFormField>

      <UFormField label="Email">
        <UInput v-model="state.email" class="w-full" />
      </UFormField>

      <UButton class="mt-4" type="submit" block :loading="isLoading">
        Ajoute ton club
      </UButton>
    </UForm>
  </div>
</template>
