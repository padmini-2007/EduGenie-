import { useQuery } from "@tanstack/react-query";
import { getUserDatById } from "../../utils/apiUser";

export default function useUserData(username) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserDatById(username),
  });
  return { data, isLoading, isError };
}
