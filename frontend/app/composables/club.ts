import type { ClubSchema } from "~/schemas/clubs.schema";

export const useClub = () => {
  const config = useRuntimeConfig();

  const fetchClubs = async () => {
    const response = await $fetch<ClubsResponse>(
      `${config.public.apiBase}/clubs`
    );
    const payload = response.data.map((club: Club) => ({
      label: `${club.name} - ${club.address} ${club.city} ${club.zipCode}`,
      value: club.id,
    }));
    return payload;
  };

  const addClub = async (club: ClubSchema) => {
    const response = await $fetch<ClubResponse>(
      `${config.public.apiBase}/clubs`,
      {
        method: "POST",
        body: club,
      }
    );
    return response;
  };

  return { fetchClubs, addClub };
};

export interface ClubResponse {
  data: Club;
  message: string;
  status: string;
}

export interface ClubsResponse {
  data: Club[];
  message: string;
  status: string;
}

export interface Club {
  id: string;
  name: string;
  address: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
  email: string;
}
