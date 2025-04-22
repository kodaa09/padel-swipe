import { useAuthStore } from "~/store/auth.js";
import type { Club } from "./club";

export const useMatchs = () => {
  const config = useRuntimeConfig();
  const authStore = useAuthStore();

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
  const durations = [
    { label: "1 heure", value: 60 },
    { label: "1 heure 30", value: 90 },
    { label: "2 heures", value: 120 },
  ];

  const fetchMatchs = async () => {
    const { data } = await useFetch<MatchsResponse>(
      `${config.public.apiBase}/matches`
    );
    return data.value;
  };

  const createMatch = async (match: Match) => {
    const token = authStore.token;
    const data = await $fetch(`${config.public.apiBase}/matches`, {
      method: "POST",
      body: match,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  };

  return { levels, durations, fetchMatchs, createMatch };
};

export interface MatchResponse {
  data: Match;
  message: string;
  status: string;
}

export interface MatchsResponse {
  data: Match[];
  message: string;
  status: string;
}

export interface Match {
  id: string;
  date: string;
  price: number;
  duration: number;
  level: string[];
  clubId: string;
  club: Club;
  courtNumber: number;
  playersCount: number;
}
