import {
  LocationMarkerIcon,
  UsersIcon,
  BriefcaseIcon,
} from "@heroicons/react/solid";

type action = {
  id: number;
  title: string;
  actionType: "Collecte" | "Convoi";
  availableSeat: string;
  city: string;
  fillingLevel: number;
};

const actions: action[] = [
  {
    id: 1,
    title: "Départ de Rennes - 28 Mars - 18h",
    actionType: "Convoi",
    city: "Rennes",
    availableSeat: "3 places",
    fillingLevel: 20,
  },
  {
    id: 2,
    title: "Départ de Rennes - 30 Mars - 18h",
    actionType: "Convoi",
    city: "Rennes",
    availableSeat: "1 place",
    fillingLevel: 20,
  },
  {
    id: 3,
    title: "Départ de Saint-Malo - 1 Mai - 9h",
    actionType: "Convoi",
    city: "Rennes",
    availableSeat: "complet",
    fillingLevel: 20,
  },
  {
    id: 4,
    title: "Collecte à Saint-Malo - 3 Mai - 9h",
    actionType: "Collecte",
    city: "Rennes",
    availableSeat: "complet",
    fillingLevel: 20,
  },
];

export const Cards = () => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {actions.map(
          ({ id, title, actionType, city, availableSeat, fillingLevel }) => {
            const isConvoy = actionType === "Convoi";
            return (
              <li key={id}>
                <a href="/" className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-indigo-600 truncate">
                        {title}
                      </p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full  ${
                            isConvoy
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {actionType}
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
                          {city}
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
                          {fillingLevel}% plein
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </li>
            );
          }
        )}
      </ul>
    </div>
  );
};
