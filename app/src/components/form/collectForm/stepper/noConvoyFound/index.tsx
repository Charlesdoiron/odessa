import { XCircleIcon } from "@heroicons/react/solid";

export const NoConvoyFound: React.FC = () => {
  return (
    <>
      <div className="bg-gray-100 p-5 rounded-md mb-10 text-gray-700">
        <XCircleIcon className="h-9 w-9 text-red-500 mb-2 -ml-2" aria-hidden="true" />
        <p className="text-md text-gray-800 text-left">
          Il n'y a pas de convoi disponible dans les 50km autour de votre future collecte. <br />
        </p>
      </div>
      <div className="bg-gray-100 p-5 rounded-md mb-10 text-gray-700">
        {/*       <p className="text-md text-gray-800 mb-5 text-md">
          Mais voici une{" "}
          <strong>
            liste des collectes près de chez vous, ayant des convois, que vous pouvez rejoindre{" "}
          </strong>
          !
        </p> */}
        <button className="underline mt-5">Annuler</button>
      </div>
    </>
  );
};
