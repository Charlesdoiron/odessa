interface Props {
  type: string;
  label: string;
  placeholder: string;
  id: string;
  autoComplete?: string;
  register: any;
  error?: any;
  onChange?: any;
  required?: boolean;
}

export const Input: React.FC<Props> = ({
  type = "text",
  label,
  placeholder,
  id,
  autoComplete = "",
  register,
  error,
  // only for showing * in front (use form already manage required)
  required,
}) => {
  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label} {required ? "*" : ""}
      </label>
      <input
        {...register}
        type={type}
        id={id}
        name={id}
        autoComplete={autoComplete}
        className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-5 ${
          error ? "border-red-500" : ""
        }`}
        placeholder={placeholder}
      />
      {error?.type === "required" && (
        <p className="text-xs pt-1 text-red-500">Ce champs est requis.</p>
      )}
    </>
  );
};
