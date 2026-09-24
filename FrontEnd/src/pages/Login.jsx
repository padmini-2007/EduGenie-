import Button from "../ui/Button";
import Field from "../ui/Field";
import PageLoader from "../ui/PageLoader";
import { useForm } from "react-hook-form";
import useLogin from "../features/Login/useLogin";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { login, isLoading } = useLogin();
  const onSubmit = (data) => {
    login(data, {
      onSettled: () => {
        setValue("username", "");
        setValue("password", "");
      },
    });
  };
  const navigate = useNavigate();

  //if (isLoading) return <PageLoader type="read" />;
  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white">
      {isLoading && <PageLoader type="read" />}
      {/* Image Section (Top on mobile, right on desktop) */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <img src="/image.png" alt="EduGenie" className="w-3/4 h-auto" />
      </div>

      {/* Form Section */}
      <div className="flex flex-col justify-center items-start w-full md:w-1/2 px-6 md:px-20 pb-10 md:pb-0">
        <h1 className="text-5xl font-extrabold  text-[#1A237E] mb-3 ">
          EduGenie
        </h1>
        <h2 className="text-2xl font-semibold text-[#1A237E] mb-6">
          Welcome Back
        </h2>

        <form className="w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
          <Field
            type="text"
            placeholder="@pav6n"
            text="Username"
            to="login"
            register={register}
            variable="username"
            errors={errors}
          />
          <Field
            type="password"
            placeholder="at least 8 characters"
            text="Password"
            to="login"
            register={register}
            variable="password"
            errors={errors}
            validation={{
              minLength: {
                value: 8,
                message: "Must be at least 8 characters",
              },
            }}
          />
          <div className="flex justify-end mb-6">
            <a href="#" className="text-sm text-blue-700 hover:underline">
              Forgot Password?
            </a>
          </div>
          <Button text="Sign in" type="submit" kind="primary" />
          <p className="text-sm text-center text-[#1A237E] mt-6">
            Don't you have an account?{" "}
            <span
              className="text-blue-700 hover:underline hover:cursor-pointer"
              onClick={() => navigate("/home")}
            >
              Sign up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
