import { SubFilters } from "components/filters/subFilters";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import classNames from "services/classNames";

const filters = [
  {
    label: "Je cherche une collecte",
    value: "collect",
  },
  {
    label: "Je cherche un convoi",
    value: "convoy",
  },
  // {
  //   label: "Je cherche une place dans un véhicule",
  //   value: "availableSeat",
  // },
  // {
  //   label: "Шукаю житло",
  //   value: "housing",
  // },
];
export const Filters: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = useState(searchParams.get("type") || "");

  const handleSelect = (type: string) => {
    if (type === "housing") {
      window.open("https://hu.eu4ua.org/", "_blank");
    } else {
      setSelected(type);
      setSearchParams({ type });
    }
  };

  useEffect(() => {
    if (!searchParams.get("type")) {
      const currentLocation = searchParams.get("location");

      setSelected(filters[0].value);
      if (currentLocation) {
        setSearchParams({ type: filters[0].value, currentLocation });
      } else {
        setSearchParams({ type: filters[0].value });
      }
    }
  }, [searchParams, setSearchParams]);

  return (
    <>
      <div className="items-center py-5">
        <div className="col-span-12">
          <nav className="flex space-x-4">
            {filters.map(({ label, value }) => {
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
            <SubFilters parentFilter={selected} />
          </nav>
        </div>
      </div>
    </>
  );
};
