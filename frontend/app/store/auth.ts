import { defineStore } from "pinia";
import type { LoginSchema, SignupSchema } from "~/schemas/auth.schema";

export const useAuthStore = defineStore("auth", () => {
  const config = useRuntimeConfig();
  const user = useState("user", (): null | UserType => null);
  const token = useState("token", (): null | string => null);

  async function api(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    url: string,
    payload = {}
  ) {
    const response = await $fetch(`${config.public.apiBase}/${url}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
      body: method !== "GET" ? JSON.stringify(payload) : undefined,
    });
    return response;
  }

  async function authenticate(result: {
    token: { token: string };
    user: UserType;
  }) {
    token.value = result.token.token;
    user.value = result.user;

    if (import.meta.client) {
      localStorage.setItem("token", token.value);
    }
  }

  async function login(payload: LoginSchema) {
    const result = await api("POST", "login", payload);
    authenticate(result);
  }

  async function register(payload: SignupSchema) {
    const result = await api("POST", "register", payload);
    authenticate(result);
  }

  async function me() {
    checkToken();
    try {
      if (!token.value) {
        user.value = null;
        return null;
      }
      const result = await api("GET", "me");
      user.value = result.user;
      return user.value;
    } catch (error) {
      console.error(error);
      token.value = null;
      user.value = null;
      if (import.meta.client) {
        localStorage.removeItem("token");
      }
      return null;
    }
  }

  function checkToken() {
    if (import.meta.client) {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        token.value = storedToken;
      }
    }
  }

  async function logout() {
    await api("DELETE", "logout");
    token.value = null;
    user.value = null;
    if (import.meta.client) {
      localStorage.removeItem("token");
    }
  }

  return { user, token, login, register, logout, me };
});

export type UserType = {
  id: string | null;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  role: string | null;
};
