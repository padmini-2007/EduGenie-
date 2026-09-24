import { useNavigate } from "react-router";
import useStudentRegister from "../features/Register/useStudentRegister";
import Button from "../ui/Button";
import Field from "../ui/Field";
import { useForm } from "react-hook-form";
import PageLoader from "../ui/PageLoader";

export default function StudentRegistration() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { registerStudent, isLoading } = useStudentRegister();
  const onSubmit = (data) => {
    const { value, city, state, country, ...rest } = data;
    const studentData = {
      ...rest,
      Address: {
        value,
        city,
        state,
        country,
      },
    };
    registerStudent(studentData);
  };
  const password = watch("password");
  const navigate = useNavigate();

  if (isLoading) return <PageLoader type="write" />;

  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen w-full bg-white">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-between items-center pt-8 md:pt-32 px-4 order-1">
        <img src="/image.png" alt="EduGenie" className="w-3/4 h-auto" />
        <h2 className="text-5xl font-extrabold text-[#1A237E] mt-4 md:hidden">
          Edu Genie
        </h2>
      </div>

      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-20 py-10 order-2">
        <h1 className="text-3xl font-bold text-[#1A237E] mb-8 hidden md:block">
          Welcome to Edu Genie
        </h1>

        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Field
              text="Full Name"
              type="text"
              placeholder="Pavan.D"
              register={register}
              variable="Name"
              errors={errors}
            />
          </div>
          <div>
            <Field
              text="Username"
              type="text"
              placeholder="@pav6n"
              register={register}
              variable="username"
              errors={errors}
            />
          </div>
          <div>
            <Field
              text="DOB"
              type="date"
              register={register}
              variable="DOB"
              errors={errors}
            />
          </div>
          <div>
            <Field
              text="Password"
              type="password"
              placeholder="at least 8 characters"
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
          </div>
          <div>
            <Field
              type="text"
              text="Course"
              placeholder="ex. Data Science"
              register={register}
              variable="Course"
              errors={errors}
            />
          </div>
          <div>
            <Field
              text="Confirm Password"
              type="password"
              placeholder="at least 8 characters"
              register={register}
              variable="conf_pw"
              errors={errors}
              validation={{
                minLength: {
                  value: 8,
                  message: "Must be at least 8 characters",
                },
                validate: (value) =>
                  value === password || "Passwords do not match",
              }}
            />
          </div>
          <div>
            <Field
              text="Phone Number"
              type="text"
              placeholder="ex. +91 2345678912"
              register={register}
              variable="Phone_Number"
              errors={errors}
            />
          </div>
          <div>
            <Field
              text="Address"
              type="text"
              placeholder="ex. Door No. 123...."
              register={register}
              variable="value"
              errors={errors}
            />
          </div>
          <div>
            <Field
              text="City"
              type="text"
              placeholder="Bangalore"
              register={register}
              variable="city"
              errors={errors}
            />
          </div>
          <div>
            <Field
              text="State"
              type="text"
              placeholder="Karnataka"
              register={register}
              variable="state"
              errors={errors}
            />
          </div>
          <div className="md:col-span-2">
            <Field
              text="Country"
              type="text"
              placeholder="India"
              register={register}
              variable="country"
              errors={errors}
            />
          </div>
          <div className="md:col-span-2">
            <Button text="Create an account" type="submit" kind="primary" />
          </div>
          <div className="md:col-span-2 text-center text-sm">
            Already have an account?
            <span
              className="text-blue-700 hover:underline pl-2 hover:cursor-pointer"
              onClick={() => navigate("/auth/login")}
            >
              Login
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
