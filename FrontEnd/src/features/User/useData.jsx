import { useQuery } from "@tanstack/react-query";
import { getData } from "../../utils/apiData";

function useData(username) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["data"],
    queryFn: () => getData(username),
  });
  return { data, isLoading, isError };
}

export default useData;
