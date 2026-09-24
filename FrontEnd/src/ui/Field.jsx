export default function Field({
  type,
  placeholder,
  text,
  to,
  register,
  variable,
  validation,
  errors,
}) {
  const message = "this field is required";
  if (to === "login")
    return (
      <>
        <label className="block mb-1 text-[#1A237E] font-medium">{text}</label>
        <div className="mb-6">
          <input
            type={type}
            placeholder={placeholder}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register(variable, { required: message, ...validation })}
          />
          {errors[variable] && (
            <p style={{ color: "red" }}>{errors[variable].message}</p>
          )}
        </div>
      </>
    );

  return (
    <>
      <label className="block text-[#1A237E] font-medium mb-1">{text}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        {...register(variable, { required: message, ...validation })}
      />
      {errors[variable] && (
        <p style={{ color: "red" }}>{errors[variable].message}</p>
      )}
    </>
  );
}
