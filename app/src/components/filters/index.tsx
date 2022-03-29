import { Transition } from "@headlessui/react";
import { SubFilters } from "components/filters/subFilters";
import { useState } from "react";
import classNames from "services/classNames";

export const Filters: React.FC = () => {
  const data = [
    {
      label: "Je cherche une collecte",
      value: "collect",
    },
    {
      label: "Je cherche un convoi",
      value: "convoy",
    },
    {
      label: "Je cherche une place dans un véhicule",
      value: "availableSeat",
    },
    {
      label: "Шукаю житло",
      value: "housing",
    },
  ];

  const [selected, setSelected] = useState(data[0].value);

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-8 items-center py-5">
        <div className="col-span-2">
          <nav className="flex space-x-4">
            {data.map(({ label, value }) => {
              const isActive = selected === value;
              return (
                <button
                  onClick={() => handleSelect(value)}
                  key={value}
                  className={classNames(
                    isActive
                      ? "bg-indigo-900  border-transparent text-white"
                      : "bg-transparent",
                    "text-white text-sm  rounded-md  border  px-3 py-2   hover:text-indigo-200 focus:outline-none "
                  )}
                >
                  {label}
                </button>
              );
            })}
            {Boolean(selected !== "collect") && (
              <button
                onClick={() => handleSelect(data[0].value)}
                key="delete"
                className="text-white text-sm  underline  hover:text-indigo-200 focus:outline-none "
              >
                Effacer la selection
              </button>
            )}
          </nav>
        </div>
      </div>
      <Transition
        show={selected !== "collect"}
        enter="transition-all duration-400 ease-in"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-all duration-350 ease-in"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="hidden lg:block border-t border-white border-opacity-20 py-5 transition-all">
          <SubFilters parentFilter={selected} />
        </div>
      </Transition>
    </>
  );
};
