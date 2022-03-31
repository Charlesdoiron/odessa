import React from "react";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import relativeTime from "dayjs/plugin/relativeTime";
import { ConvoyType } from "typings";
import { Share } from "components/share";

dayjs.extend(relativeTime);
dayjs.locale("fr");

interface Props {
  title: string;
  availableSeat: number | undefined;
  availableVolume: number | undefined;
  departure: Date;
  status: ConvoyType["status"];
}

export const Header: React.FC<Props> = ({
  title,
  availableVolume,
  availableSeat,
  departure,
  status,
}) => {
  const stats = [
    { name: "Départ dans:", stat: dayjs().from(dayjs(departure)) },
    {
      name: "Volume disponible en m3:",
      stat: availableVolume ? `${availableVolume}m3` : "complet",
    },
    {
      name: "Places disponibles:",
      stat: availableSeat ? availableSeat : "complet",
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex align-center py-5 ">
          <h3 className="text-[40px] leading-6 font-bold text-gray-900 mr-10">
            {title}
          </h3>
          <Share />
        </div>
        <div className="ml-2 flex-shrink-0 flex">
          <p
            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${"bg-green-100 text-green-800"}`}
          >
            Convoi {status?.label && "-"} {status?.label.toLowerCase()}
          </p>
        </div>
      </div>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3 mb-5 text-center">
        {stats.map((item) => (
          <div
            key={item.name}
            className="px-4 py-5 bg-white shadow rounded-lg overflow-hidden sm:p-6"
          >
            <dt className="text-sm font-medium text-gray-500 truncate">
              {item.name}
            </dt>
            <dd className="mt-1 text-2xl font-semibold text-gray-900">
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};
