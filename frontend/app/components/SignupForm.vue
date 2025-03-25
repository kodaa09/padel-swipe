<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { signupSchema, type SignupSchema } from "~/schemas/auth.schema";
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();

const levels = ref<
  (
    | "1"
    | "2"
    | "3"
    | "3+"
    | "4"
    | "4+"
    | "5"
    | "5+"
    | "6"
    | "6+"
    | "7"
    | "7+"
    | "8"
  )[]
>(["1", "2", "3", "3+", "4", "4+", "5", "5+", "6", "6+", "7", "7+", "8"]);
const initialState: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  level:
    | "1"
    | "2"
    | "3"
    | "3+"
    | "4"
    | "4+"
    | "5"
    | "5+"
    | "6"
    | "6+"
    | "7"
    | "7+"
    | "8"
    | undefined;
} = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  level: "3",
};

// const toast = useToast();
const isOpen = ref(false);
const state = reactive(initialState);
const errorMessage = ref("");
const isLoading = ref(false);
const showPassword = ref(false);

async function onSubmit(event: FormSubmitEvent<SignupSchema>) {
  isLoading.value = true;

  try {
    await authStore.register(event.data);
    resetForm();
    navigateTo("/matchs");
    // toast.add({ title: "Inscription réussie" });
  } catch (error) {
    // @ts-expect-error error.response is not typed
    console.log(error.response._data);
  }

  isLoading.value = false;
}

const resetForm = () => {
  isOpen.value = false;
  state.lastname = "";
  state.firstname = "";
  state.email = "";
  state.password = "";
  state.level = "3" as const;
};
</script>

<template>
  <div>
    <UCard class="max-w-md mx-auto">
      <div class="mb-8 text-center">
        <h2 class="text-3xl font-bold mb-2">Inscription</h2>
        <p class="text-sm text-gray-500">
          Vous avez déjà un compte ?
          <NuxtLink to="/login" class="text-primary-500">
            Connectez-vous
          </NuxtLink>
        </p>
      </div>
      <UForm
        :schema="signupSchema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField class="w-full" label="Prénom" name="firstname" required>
          <UInput v-model="state.firstname" class="w-full" />
        </UFormField>

        <UFormField class="w-full" label="Nom" name="lastname" required>
          <UInput v-model="state.lastname" class="w-full" />
        </UFormField>

        <UFormField class="w-full" label="Niveau" name="level">
          <USelect v-model="state.level" class="w-full" :items="levels" />
        </UFormField>

        <UFormField class="w-full" label="Email" name="email" required>
          <UInput v-model="state.email" class="w-full" />
        </UFormField>

        <UFormField
          class="w-full"
          label="Mot de passe"
          name="password"
          required
        >
          <UInput
            v-model="state.password"
            class="w-full"
            :type="showPassword ? 'text' : 'password'"
            :ui="{ trailing: 'pe-1' }"
          >
            <template #trailing>
              <UButton
                color="neutral"
                variant="link"
                size="sm"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
                :aria-pressed="showPassword"
                aria-controls="password"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormField>

        <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>

        <UButton class="!mt-4" type="submit" :loading="isLoading" block>
          S'inscrire
        </UButton>
      </UForm>
    </UCard>
  </div>
</template>
