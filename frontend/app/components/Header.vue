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
            <span class="text-black">meetn</span>
            <span class="text-primary-500">match</span>
          </NuxtLink>
        </h1>
      </div>
      <nav>
        <ul class="flex items-center gap-4">
          <li>
            <ULink
              to="/matchs"
              active-class="text-primary-500"
              inactive-class="text-black"
              >Matchs</ULink
            >
          </li>
          <li>
            <ULink
              to="/padel"
              active-class="text-primary-500"
              inactive-class="text-black"
              >Ajoute ton club</ULink
            >
          </li>
          <ClientOnly>
            <li v-if="!authStore.user">
              <UButton to="/login" color="neutral" variant="outline"
                >Connexion</UButton
              >
            </li>
            <li v-if="!authStore.user">
              <UButton to="/signup" color="neutral">Inscription</UButton>
            </li>
            <li v-if="authStore.user">
              <ULink
                to="/me"
                active-class="text-primary-500"
                inactive-class="text-black"
              >
                Mon profil
              </ULink>
            </li>
            <li v-if="authStore.user">
              <UButton class="cursor-pointer" @click="authStore.logout"
                >Déconnexion</UButton
              >
            </li>
            <template #fallback>
              <li>
                <UButton to="/login" color="neutral" variant="outline"
                  >Connexion</UButton
                >
              </li>
              <li>
                <UButton to="/signup" color="neutral">Inscription</UButton>
              </li>
            </template>
          </ClientOnly>
        </ul>
      </nav>
    </div>
    <USeparator />
  </header>
</template>
