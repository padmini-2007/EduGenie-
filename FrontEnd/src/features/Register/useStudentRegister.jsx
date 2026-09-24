import { useMutation } from "@tanstack/react-query";
import { apiRegisterStudent } from "../../utils/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

export default function useStudentRegister(){
    const navigate = useNavigate()
    const { mutate : registerStudent, isPending: isLoading}=useMutation({
       mutationFn:(data)=> apiRegisterStudent(data),
       onSuccess:(data)=>{
        toast.success(data.message)
        navigate("/auth/login");
       },
       onError : (error) =>{
        toast.error(error.message)
        navigate("/auth/register/student")
       }
    })
    return {
        registerStudent , isLoading
    }
}