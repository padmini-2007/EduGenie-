import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authenticateUser } from "../../utils/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import useUpdateDayStreak from "../User/useUpdateDayStreak";

export default function useLogin() {
  const { updateDayStreak } = useUpdateDayStreak();
  const query = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoading } = useMutation({
    mutationFn: (data) => authenticateUser(data),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/user/dashboard");
      updateDayStreak(data.username);
      query.setQueryData(["login"], data);
    },
    onError: (error) => {
      toast.error(error.message);
      navigate("/auth/login");
    },
  });

  return { login, isLoading };
}
