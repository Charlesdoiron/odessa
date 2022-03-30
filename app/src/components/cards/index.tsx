import {
  LocationMarkerIcon,
  UsersIcon,
  BriefcaseIcon,
} from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

// Mocks
import { useEffect, useState } from "react";
import { getConvoys } from "call/convoy";
import { ConvoyType } from "typings";
import React from "react";

export const Cards = () => {
  const [state, setState] = useState<ConvoyType[] | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    getConvoys().then((res) => {
      if (res.ok) setState(res.data);
      else setError(res.error);
    });
  }, []);

  if (!state) return <>Chargement ...</>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {state.map(
          ({
            _id,
            name,
            email,
            needs,
            availableSeat,
            phone,
            pickupName,
            availableVolume,
          }) => {
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
                className="block hover:bg-gray-50 hover:cursor-pointer"
              >
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 truncate">
                      {pickupName}
                    </p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
                          isConvoy
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        Convoi
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 sm:flex sm:justify-between">
                    <div className="sm:flex">
                      <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:mr-6">
                        <LocationMarkerIcon
                          className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        {phone}
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
          }
        )}
      </ul>
    </div>
  );
};
