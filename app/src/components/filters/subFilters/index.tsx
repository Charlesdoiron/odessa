import { useCallback, useState } from "react";
import { useSearchParams } from "react-router-dom";
import classNames from "services/classNames";

interface Props {
  // parent Filter
  parentFilter: string;
}

const convoyFilters = [
  {
    label: "Qui part dans moins de 2 semaines",
    value: "twoWeeks",
  },
  {
    label: "Avec une place disponible",
    value: "availableSeat",
  },
  {
    label: "Disponible pour emmener une collecte",
    value: "availableForCollect",
  },
];
const availableSeat = [
  {
    label: "Qui part dans moins de 2 semaines",
    value: "twoWeeks",
  },
  {
    label: "Je n'ai pas le permis",
    value: "noLicense",
  },
];
export const SubFilters: React.FC<Props> = ({ parentFilter }) => {
  const renderSubFilters = () => {
    switch (parentFilter) {
      case "convoy":
        return convoyFilters;
      case "availableSeat":
        return availableSeat;
      default:
        return [];
    }
  };

  const data = renderSubFilters();

  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState<string[]>([]);

  const handleClick = useCallback(
    (value: string) => {
      let newFilter = [];
      if (selected.includes(value)) {
        newFilter = selected.filter((item) => item !== value);
      } else {
        newFilter = [...selected, value];
      }
      setSelected(newFilter);
      const searchParamsObject: any = {};
      for (const [key, param] of searchParams.entries()) {
        searchParamsObject[key] = param;
      }
      setSearchParams({ ...searchParamsObject, extra: newFilter.join(",") });
    },
    [searchParams, selected, setSearchParams]
  );

  return (
    <div className="grid grid-cols-3 gap-8 items-center">
      <div className="col-span-2">
        <nav className="flex space-x-4">
          {data.map(({ label, value }) => {
            const isActive = selected.includes(value);
            return (
              <button
                onClick={() => handleClick(value)}
                key={value}
                className={classNames(
                  isActive ? "bg-indigo-900  border-transparent text-white" : "bg-transparent",
                  "text-white text-sm  rounded-md  border  px-3 py-2   hover:text-indigo-200 focus:outline-none "
                )}>
                {label}
              </button>
            );
          })}
          {Boolean(selected[0]) && (
            <button
              onClick={() => setSelected([])}
              key="delete"
              className={classNames(
                "text-white text-sm   underline  hover:text-indigo-200 focus:outline-none "
              )}>
              Effacer la selection
            </button>
          )}
        </nav>
      </div>
    </div>
  );
};
