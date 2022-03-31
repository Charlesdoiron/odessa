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
    // TODO: Don't delete the location params
    (value: string) => {
      const currentLocation = searchParams.get("location");

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
      setSearchParams({
        ...searchParamsObject,
        extra: newFilter.join(","),
        location: currentLocation,
      });
    },
    [searchParams, selected, setSearchParams]
  );

  const handleDelete = () => {
    // TODO: Don't delete the location params
    // const currentLocation = searchParams.get("location");
    // console.log("current", currentLocation);
    // if (currentLocation) {
    //   const loc = { location: currentLocation };
    //   setSearchParams(loc);
    // }
    setSearchParams({});
    setSelected([]);
  };

  if (data.length === 0) return <></>;
  return (
    <div>
      <nav className="flex space-x-4 items-center">
        <p className="text-indigo-900">|</p>
        {data.map(({ label, value }) => {
          const isActive = selected.includes(value);
          return (
            <button
              onClick={() => handleClick(value)}
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
        {Boolean(selected[0]) && (
          <button
            onClick={() => handleDelete()}
            key="delete"
            className={classNames(
              "text-white text-sm   underline  hover:text-indigo-200 focus:outline-none "
            )}
          >
            Effacer la selection
          </button>
        )}
      </nav>
    </div>
  );
};
