import { useAuthStore } from "~/store/auth";

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore();

  if (import.meta.client && localStorage.getItem("token")) {
    try {
      await authStore.me();
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations utilisateur:",
        error
      );
    }
  }
});
