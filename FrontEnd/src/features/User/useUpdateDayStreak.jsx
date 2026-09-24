import { apiUpdateDayStreak } from "../../utils/apiData";
import { useMutation } from "@tanstack/react-query";

export default function useUpdateDayStreak() {
  const { mutate: updateDayStreak, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiUpdateDayStreak(data),
  });

  return { updateDayStreak, isLoading };
}
