import { LocationMarkerIcon, UsersIcon, BriefcaseIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Mocks
import { ConvoyType } from "typings";

type Props = {
  data: ConvoyType[] | null;
};

export const Cards = ({ data }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {data?.map(
          ({ _id, type, availableSeat, phone, pickupName, availableVolume, status, title }) => {
            return (
              <li key={_id} className="block hover:bg-gray-50 hover:cursor-pointer">
                <Link to={`/${type}/${_id}`} target="_blank">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">{title}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
                            type === "convoy"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}>
                          {t(`cards.${type}`)} - {status?.label.toLowerCase()}
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
                        {type === "convoy" && (
                          <p className="flex items-center text-sm text-gray-500 ">
                            <UsersIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            {availableSeat}
                          </p>
                        )}
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <BriefcaseIcon
                              className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                              aria-hidden="true"
                            />
                            {availableVolume}% {t("cards.full")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};
