import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";

type Item = { label: string; value: string };

interface Props {
  values: Item[];
  label: string;
  id: string;
  error?: string;
  field: {
    onChange: (event: any) => void;
    value: Item;
  };
}

export const Dropdown: React.FC<Props> = ({
  values,
  label,
  id,
  error,
  field,
}) => {
  const { onChange, value } = field;
  if (!values) return <></>;

  return (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative">
          <Listbox.Button
            className={`text-left mt-1 border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm  rounded-md p-5 text-gray-700  ${
              error ? "border-red-500" : ""
            }`}
          >
            {field.value.label}
          </Listbox.Button>
        </div>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute left-0 right-0 py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {values?.map((item) => (
              <Listbox.Option
                key={item.value}
                value={item}
                className={({ active }) =>
                  `cursor-default select-none relative py-2 pl-5 pr-4 ${
                    active ? "text-white bg-indigo-500" : "text-gray-900"
                  }`
                }
              >
                <span
                  className={`block truncate  ${
                    item.value === field.value.value
                      ? "font-medium flex text-indigo-500 font-bold"
                      : "font-normal"
                  }`}
                >
                  {item.value === field.value.value && (
                    <CheckIcon
                      className="w-5 h-5 mr-2 color-indigo-500"
                      aria-hidden="true"
                    />
                  )}

                  {item.label}
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};
