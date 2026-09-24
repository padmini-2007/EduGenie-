import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiUploadDocument } from "../../utils/apiUser";
import toast from "react-hot-toast";

export default function useUploadDocument() {
  const query = useQueryClient();
  const { mutate: uploadDocument, isPending: isLoading } = useMutation({
    mutationFn: (data) => apiUploadDocument(data),
    onSuccess: (data) => {
      toast.success(data.message);
      query.invalidateQueries(["data"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { uploadDocument, isLoading };
}
