interface Props {
  label: string;
  id: string;
  register: any;
  error?: any;
  onChange?: any;
}

export const Checkbox: React.FC<Props> = ({ label, id, register, error }) => {
  return (
    <div className="hover:cursor-pointer">
      <div className="flex items-center my-5">
        <input
          {...register}
          type="checkbox"
          id={id}
          name={id}
          className={`focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md p-3 hover:cursor-pointer ${
            error ? "border-red-500" : ""
          }`}
        />
        <label
          htmlFor={id}
          className="text-sm font-medium text-gray-700 ml-3 hover:cursor-pointer"
        >
          {label}
        </label>
      </div>
      {error?.type === "required" && (
        <p className="text-xs pt-1 text-red-500">Ce champs est requis.</p>
      )}
    </div>
  );
};
