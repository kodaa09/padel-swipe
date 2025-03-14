<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

defineOptions({
  name: "AppHeader",
});

const authStore = useAuthStore();
</script>

<template>
  <header class="mb-16">
    <div class="flex justify-between items-center container mx-auto py-8">
      <div>
        <h1 class="text-2xl font-bold">
          <NuxtLink to="/">
            <span class="text-black">Padel</span>
            <span class="text-primary-500">swipe</span>
          </NuxtLink>
        </h1>
      </div>
      <ClientOnly>
        <nav>
          <ul v-if="!authStore.user" class="flex items-center gap-4">
            <li>
              <UButton to="/login" color="neutral" variant="outline"
                >Connexion</UButton
              >
            </li>
            <li>
              <UButton to="/signup" color="neutral">Inscription</UButton>
            </li>
          </ul>
          <ul v-else class="flex items-center gap-8">
            <li>
              <ULink
                to="/padel"
                active-class="text-primary-500"
                inactive-class="text-black"
              >
                Ajoute ton club
              </ULink>
            </li>
            <li>
              <ULink
                to="/me"
                active-class="text-primary-500"
                inactive-class="text-black"
              >
                Mon profil
              </ULink>
            </li>
            <li>
              <UButton class="cursor-pointer" @click="authStore.logout"
                >Déconnexion</UButton
              >
            </li>
          </ul>
        </nav>
        <template #fallback>
          <nav>
            <ul class="flex items-center gap-4">
              <li>
                <UButton to="/login" color="neutral" variant="outline"
                  >Connexion</UButton
                >
              </li>
              <li>
                <UButton to="/signup" color="neutral">Inscription</UButton>
              </li>
            </ul>
          </nav>
        </template>
      </ClientOnly>
    </div>
    <USeparator />
  </header>
</template>
