<script setup lang="ts">
import { useAuthStore } from "~/store/auth";

const authStore = useAuthStore();
</script>

<template>
  <header class="mb-16">
    <div class="flex justify-between items-center container mx-auto py-8">
      <div>
        <h1 class="text-2xl font-bold">
          <NuxtLink to="/">Padel swipe</NuxtLink>
        </h1>
      </div>
      <ClientOnly>
        <nav>
          <ul class="flex items-center gap-4" v-if="!authStore.user">
            <li>
              <SignupForm />
            </li>
            <li>
              <LoginForm />
            </li>
          </ul>
          <ul class="flex items-center gap-8" v-else>
            <li>
              <ULink to="/me" active-class="text-primary"> Mon profil </ULink>
            </li>
            <li>
              <UButton @click="authStore.logout">Déconnexion</UButton>
            </li>
          </ul>
        </nav>
        <template #fallback>
          <nav>
            <ul class="flex items-center gap-4">
              <li>
                <SignupForm />
              </li>
              <li>
                <LoginForm />
              </li>
            </ul>
          </nav>
        </template>
      </ClientOnly>
    </div>
    <UDivider />
  </header>
</template>
