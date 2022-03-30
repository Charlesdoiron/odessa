import { LocationMarkerIcon, UsersIcon, BriefcaseIcon } from "@heroicons/react/solid";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import useWindowFocus from "use-window-focus";

// Mocks
import { useEffect, useState } from "react";
import { ConvoyType } from "typings";
import API from "services/api";

export const Cards = () => {
  const [state, setState] = useState<ConvoyType[] | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const windowFocused = useWindowFocus();
  const location = useLocation();

  const refresh = async () => {
    const response = await API.get({
      path: `/${searchParams.get("type")}`,
    });
    if (response.ok) {
      setState(response.data);
    } else {
      setError(response.error);
    }
  };

  useEffect(() => {
    if (windowFocused) {
      refresh();
    }
  }, [windowFocused, location.pathname, searchParams]);

  useEffect(() => {
    if (!state) {
      refresh();
    }
  }, [state]);

  if (!state) return <>Chargement ...</>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {state.map(({ _id, availableSeat, phone, pickupName, availableVolume, status, title }) => {
          const isConvoy = true;

          const goTo = () => {
            if (isConvoy) {
              navigate(`/convoy/${_id}`);
            } else navigate(`/collect/${_id}`);
          };

          return (
            <li
              key={_id}
              onClick={() => goTo()}
              className="block hover:bg-gray-50 hover:cursor-pointer">
              <div className="px-4 py-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-indigo-600 truncate">{title}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <p
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
                        isConvoy ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                      Convoi - {status?.label.toLowerCase()}
                    </p>
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="mt-2 flex  text-[12px] text-gray-500 sm:mt-0 sm:mr-6">
                      <LocationMarkerIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {pickupName}
                    </p>
                    {isConvoy && (
                      <p className="flex items-center text-sm text-gray-500 ">
                        <UsersIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {availableSeat}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-2 sm:flex sm:justify-between">
                  <div className="sm:flex">
                    <p className="flex items-center text-sm text-gray-500">
                      <BriefcaseIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      {availableVolume}% plein
                    </p>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
