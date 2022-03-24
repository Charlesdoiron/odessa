import { useForm } from "react-hook-form";

import { Input } from "components/form/input";
import { Textarea } from "components/form/textarea";
import { StepStatus } from "./stepper";

// interface FormValues {
//   adress: string;
//   startDate: string;
//   availableSeat: string;
//   availableVolume: string;
//   needs: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone: string;
// }

interface Props {
  onAbort: () => void;
  setStep: (step: StepStatus) => void;
}

export const CollectForm: React.FC<Props> = ({ onAbort, setStep }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    setStep("success");
  });
  return (
    <>
      <div>
        <div className=" w-full">
          <div className="bg-white space-y-6 sm:p-6 w-full">
            <form onSubmit={onSubmit}>
              <div className=" bg-white ">
                <div className="grid grid-cols-6 gap-6 mb-5 ">
                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      type="text"
                      id="adress"
                      autoComplete="adress"
                      label="Adresse de la collecte"
                      placeholder="Renseigner l'adresse de départ de la collecte"
                      register={register("adress", { required: true })}
                      error={errors.adress}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      type="text"
                      id="startDate"
                      autoComplete="date"
                      label="Date de la collecte"
                      placeholder="Renseigner l'heure de départ de la collecte"
                      register={register("startDate", { required: true })}
                      error={errors.startDate}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-6 mb-5 ">
                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      type="text"
                      id="availableVolume"
                      autoComplete="date"
                      label="Niveau de remplissage de la collecte"
                      placeholder="Renseigner le volume disponible en m3"
                      register={register("availableVolume", {
                        required: true,
                      })}
                      error={errors.availableVolume}
                    />
                  </div>
                </div>
                {/* BESOIN */}
                <div className="mb-5 pb-5 border-b border-dark">
                  <Textarea
                    id="needs"
                    rows={8}
                    label="Besoins"
                    placeholder="Besoins"
                    register={register("needs")}
                    error={errors.needs}
                  />
                </div>
                {/* NAME */}
                <div className="grid grid-cols-6 gap-6 mb-5">
                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      type="text"
                      id="firstName"
                      autoComplete="given-name"
                      label="Prénom du responsable"
                      placeholder="Prénom de la personne à contacter"
                      register={register("firstName", {
                        required: true,
                      })}
                      error={errors.firstName}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      type="text"
                      id="lastName"
                      autoComplete="given-name"
                      placeholder="Nom de la personne à contacter"
                      label="Nom du responsable"
                      register={register("lastName", {
                        required: true,
                      })}
                      error={errors.lastName}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-6 mb-5">
                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      type="email"
                      id="email"
                      autoComplete="email"
                      placeholder="Email de la personne à contacter"
                      label="Email du responsable"
                      register={register("email", {
                        required: true,
                      })}
                      error={errors.email}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      type="text"
                      id="phone"
                      autoComplete="phone"
                      label="Téléphone du responsable"
                      placeholder="Téléphone de la personne à contacter"
                      register={register("phone", {
                        required: true,
                      })}
                      error={errors.phone}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={onAbort}
                  type="submit"
                  className="text-dark underline"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-4 px-20 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Créer la collecte
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
