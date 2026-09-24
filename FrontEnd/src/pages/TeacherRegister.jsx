import Button from "../ui/Button";
import { useForm } from "react-hook-form";
import Field from "../ui/Field";
import useTeacherRegister from "../features/Register/useTeacherRegister";
import { useNavigate } from "react-router";
import PageLoader from "../ui/PageLoader";

export default function TeacherRegistration() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const { registerTeacher, isLoading } = useTeacherRegister();
  const onSubmit = (data) => {
    const { value, city, state, country, ...rest } = data;
    const teacherData = {
      ...rest,
      Address: {
        value,
        city,
        state,
        country,
      },
    };
    registerTeacher(teacherData);
  };
  const navigate = useNavigate();

  if (isLoading) return <PageLoader type="write" />;
  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen w-full bg-white">
      {/* Image Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-between items-center pt-8 md:pt-32 px-6 order-1">
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
          className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Field
              type="text"
              text="Full Name"
              placeholder="Pavan.D"
              register={register}
              variable="name"
              errors={errors}
            />
          </div>
          <div>
            <Field
              type="text"
              text="Username"
              placeholder="@pav6n"
              register={register}
              variable="username"
              errors={errors}
            />
          </div>

          <div>
            <Field
              type="date"
              text="DOB"
              register={register}
              variable="DOB"
              errors={errors}
            />
          </div>
          <div>
            <Field
              type="password"
              text="Password"
              placeholder="at least 8 charecters"
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
              text="Department"
              placeholder="ex. Computer Science"
              register={register}
              variable="Department"
              errors={errors}
            />
          </div>
          <div>
            <Field
              type="password"
              text="Confirm Password"
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
              type="text"
              text="Designation"
              placeholder="ex. Assistant Professor"
              register={register}
              variable="Designation"
              errors={errors}
            />
          </div>
          <div>
            <Field
              type="text"
              text="Phone Number"
              placeholder="ex. +91 2345678912"
              register={register}
              variable="Phone_Number"
              errors={errors}
            />
          </div>

          <div>
            <Field
              type="text"
              text="Address"
              placeholder="ex. Door No. 123...."
              register={register}
              variable="value"
              errors={errors}
            />
          </div>
          <div>
            <Field
              type="text"
              text="City"
              placeholder="Bangalore"
              register={register}
              variable="city"
              errors={errors}
            />
          </div>

          <div>
            <Field
              type="text"
              text="State"
              placeholder="eg. karnataka"
              register={register}
              variable="state"
              errors={errors}
            />
          </div>
          <div>
            <Field
              type="text"
              text="Country"
              placeholder="India"
              register={register}
              variable="country"
              errors={errors}
            />
          </div>
          <div className="md:col-span-2">
            {/* <button
              type="submit"
              className="w-full bg-[#0D1B4C] text-white py-3 rounded-lg font-semibold hover:bg-[#1A237E] transition"
            >
              Create an account
            </button> */}

            <Button text="Create an account" type="submit" kind="primary" />
          </div>

          <div className="md:col-span-2 text-center text-sm">
            Already have an account?{" "}
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
