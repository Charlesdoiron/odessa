import { BadgeCheckIcon } from "@heroicons/react/solid";

export const Success: React.FC = () => {
  return (
    <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white p-20">
      <BadgeCheckIcon
        className="h-12 w-12 text-green-500 mb-10"
        aria-hidden="true"
      />{" "}
      Bravo !
      <p className="text-md text-gray-800 mb-10">
        Merci d'avoir créer cette collecte. Elle vient d'être publiée
      </p>
      <a href="/" className="underline">
        Retourner à la carte
      </a>
    </div>
  );
};
