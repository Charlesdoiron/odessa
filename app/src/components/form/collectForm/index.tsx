import { useForm } from "react-hook-form";

import { Input } from "components/form/inputs/input";
import { Textarea } from "components/form/inputs/textarea";
import { StepStatus } from "./stepper";
import API from "services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const [pickupGeometry] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (form) => {
    const response = await API.post({
      path: "/collect",
      body: { ...form, pickupGeometry },
    });
    if (!response.ok) return alert(response.error);
    navigate("/");
  });
  return (
    <>
      <div>
        <div className=" w-full">
          <div className="bg-white space-y-6 sm:p-6 w-full">
            <p className="text-[30px] font-bold text-dark inline-block">
              Je Créer une
            </p>
            <p className="text-[30px] font-bold text-indigo-600 inline-block ml-2 underline">
              collecte
            </p>
            <form onSubmit={onSubmit}>
              <div className=" bg-white ">
                <div className="grid grid-cols-6 gap-6 mb-5 ">
                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      type="text"
                      id="pickupName"
                      label="Adresse de la collecte"
                      placeholder="Renseigner l'adresse de départ de la collecte"
                      register={register("pickupName", { required: true })}
                      error={errors.pickupName}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      id="date"
                      type="datetime-local"
                      autoComplete="off"
                      label="Date de la collecte"
                      placeholder="Renseigner l'heure de la collecte"
                      register={register("date", { required: true })}
                      error={errors.date}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-6 mb-5 ">
                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      id="availableVolume"
                      type="number"
                      autoComplete="off"
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
                {/* NAME */}
                <div className="grid grid-cols-6 gap-6 mb-5">
                  <div className="col-span-12 sm:col-span-6">
                    <Input
                      type="text"
                      id="name"
                      autoComplete="given-name"
                      placeholder="Prénom et nom de la personne à contacter"
                      label="Prénom et nom du responsable"
                      register={register("name", {
                        required: true,
                      })}
                      error={errors.name}
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
                      autoComplete="tel"
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
