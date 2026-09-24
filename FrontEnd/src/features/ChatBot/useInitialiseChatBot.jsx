import { useMutation } from "@tanstack/react-query";
import { initializeChatBot } from "../../utils/apiChatBot";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function useInitialiseChatBot() {
  const navigate = useNavigate();
  const { mutate: initializedChatBot, isPending: isLoading } = useMutation({
    mutationFn: (data) => initializeChatBot(data),
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/user/studentChatbot");
    },
    onError: (error) => {
      toast.error(error.message);
      navigate("/user/dashboard");
    },
  });
  return { initializedChatBot, isLoading };
}
