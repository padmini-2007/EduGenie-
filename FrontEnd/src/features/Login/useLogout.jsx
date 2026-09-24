import { useNavigate } from "react-router";
import { logOutUser } from "../../utils/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useLogout() {
  const query = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending: isLoading } = useMutation({
    mutationFn: logOutUser,
    onSuccess: (data) => {
      navigate("/home");
      toast.success(data.message);
      query.setQueriesData(["login"], data);
    },
  });
  return { logout, isLoading };
}
