export const useMatchs = () => {
  const config = useRuntimeConfig();

  const fetchMatchs = async () => {
    const { data } = await useFetch(`${config.public.apiBase}/matchs`);
    return data.value;
  };

  return { fetchMatchs };
};
