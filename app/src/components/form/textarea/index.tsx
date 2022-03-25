interface Props {
  label: string;
  placeholder: string;
  id: string;
  register: any;
  error: any;
  rows: number;
}

export const Textarea: React.FC<Props> = ({
  label,
  placeholder,
  id,
  register,
  rows = 6,
  error,
}) => {
  return (
    <>
      <label
        htmlFor="first-name"
        className="block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <textarea
        rows={rows}
        {...register}
        id={id}
        name={id}
        className={`shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md ${
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
