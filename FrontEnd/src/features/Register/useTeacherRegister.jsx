import { useMutation } from "@tanstack/react-query";
import { apiRegisterTeacher } from "../../utils/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function useTeacherRegister() {
  const navigate = useNavigate();
  const { mutate: registerTeacher, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiRegisterTeacher(data),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message);
      navigate("/auth/register/teacher");
    },
  });
  return { registerTeacher, isLoading };
}
