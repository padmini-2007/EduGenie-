export default function Button({ text, type, kind, onClick }) {
  if (kind === "primary")
    return (
      <button
        type="submit"
        className="w-full bg-[#0D1B4C] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#1A237E] transition"
      >
        {text}
      </button>
    );

  if (kind == "secondary")
    return (
      <button
        type={type}
        className="bg-[#0D1B4C] text-white text-lg px-10 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
      >
        {text}
      </button>
    );

  return (
    <button
      type={type}
      className="bg-blue-600 text-white text-lg px-10 py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
