import { Input } from "components/form/input";
import { useForm } from "react-hook-form";
import { AnnotationIcon } from "@heroicons/react/outline";
import { StepStatus } from "..";

interface Props {
  onAbort: () => void;
  setStep: (step: StepStatus) => void;
}

export const Start: React.FC<Props> = ({ onAbort, setStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setStep("form");
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="col-span-6 sm:col-span-3">
        <div className="bg-gray-100 p-5 rounded-md mb-10 text-gray-700">
          <AnnotationIcon className="h-6 w-6 mb-2" aria-hidden="true" />
          <p className="text-left text-sm">
            Il n'est pas possible de créer une collecte si aucun convoi n'est
            disponible <strong>à moins de 50km</strong>.
            <br />
            <strong>
              Merci de rentrer l'adresse de votre future collecte
            </strong>{" "}
            afin de nous assurer que nous trouverons un convoi pour vos produits
            :)
          </p>
        </div>
        <Input
          type="text"
          id="adress"
          autoComplete="adress"
          label="Adresse de ma collecte"
          placeholder="Renseigner l'adresse de ma collecte"
          register={register("adress", { required: true })}
          error={errors.adress}
        />
        <div className="flex justify-between mt-10">
          <button
            onClick={onAbort}
            type="submit"
            className="text-dark underline"
          >
            Revenir en arrière
          </button>
          <button
            disabled={isSubmitting}
            type="submit"
            className="inline-flex justify-center py-4 px-20 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Chercher un convoi
          </button>
        </div>
      </div>
    </form>
  );
};
