import { useMutation } from "@tanstack/react-query";
import { queryChatBot } from "../../utils/apiChatBot";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addResponse } from "./chatBotSlice";

export default function useQueryChatBot() {
  const dispatch = useDispatch();
  const { mutate: query, isPending: isLoading } = useMutation({
    mutationFn: (data) => queryChatBot(data),
    onSuccess: (data) => {
      dispatch(addResponse(data.response));
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { query, isLoading };
}
