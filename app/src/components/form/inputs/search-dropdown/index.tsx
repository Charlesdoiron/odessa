// @ts-nocheck
import { Fragment } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

interface Props {
  type: string;
  label: string;
  placeholder: string;
  id: string;
  autoComplete: string;
  register: any;
  error?: any;
  onChange?: any;
  choices?: any;
  setSelected?: any;
  setQuery?: any;
  query?: any;
  selected?: any;
}

// https://headlessui.dev/react/combobox
export const InputDropDown: React.FC<Props> = ({
  type = "text",
  label,
  placeholder,
  id,
  autoComplete = "",
  error,
  onChange,
  choices = [],
  setSelected,
  setQuery,
  query,
  selected,
}) => {
  return (
    <Combobox value={selected} onChange={setSelected}>
      <div className="relative">
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="mt-1 relative">
          <Combobox.Input
            className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-5 ${
              error ? "border-red-500" : ""
            }`}
            displayValue={(item: any) => item?.name}
            placeholder={placeholder}
            autoComplete="off"
            onChange={(event) => setQuery(event.target.value)}
          />
          <Combobox.Button className="absolute inset-y-0 right-0 my-auto flex items-center pr-2">
            <SelectorIcon
              className="w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <Combobox.Options
            className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            open={query !== ""}
          >
            {choices.length === 0 && query !== "" ? (
              <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                Nous n'avons rien trouvé ...
              </div>
            ) : (
              choices.map((place: any) => (
                <Combobox.Option
                  key={place.name}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 pl-10 pr-4 ${
                      active ? "text-white bg-teal-600" : "text-gray-900"
                    }`
                  }
                  value={place}
                >
                  {({ selected: isSelected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          isSelected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {place.name}
                      </span>
                      {isSelected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? "text-white" : "text-teal-600"
                          }`}
                        >
                          <CheckIcon className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};
