export const useMatchs = () => {
  const config = useRuntimeConfig();

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
  const clubs = [
    { label: "Padel horizon", value: "1" },
    { label: "Esprit padel", value: "2" },
    { label: "4padel Creteil", value: "3" },
  ];

  const fetchMatchs = async () => {
    const { data } = await useFetch(`${config.public.apiBase}/matchs`);
    return data.value;
  };

  return { levels, durations, clubs, fetchMatchs };
};
