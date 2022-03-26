// @ts-nocheck
import { useForm } from "react-hook-form";

import { Input } from "components/form/inputs/input";
import { Checkbox } from "components/form/inputs/checkbox";

import { Textarea } from "components/form/inputs/textarea";
import API from "services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
}

export const DriverForm: React.FC<Props> = ({ onAbort }) => {
  const [pickupGeometry] = useState(null);
  const [pickupName] = useState(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const onSubmit = handleSubmit(async (form) => {
    const response = await API.post({
      path: "/convoy",
      body: { ...form, pickupName, pickupGeometry },
    });
    if (!response.ok) return alert(response.error);
    navigate("/");
  });

  const showAvailableSeat = watch("hadVehicle");

  return (
    <>
      <div>
        <div className=" w-full">
          <div className="bg-white space-y-6 sm:p-6 w-full">
            <p className="text-[30px] font-bold text-dark inline-block">
              Je suis
            </p>
            <p className="text-[30px] font-bold text-indigo-600 inline-block ml-2 underline">
              chauffeur
            </p>
            <form onSubmit={onSubmit}>
              <div className=" bg-white ">
                {/* <div className="grid grid-cols-6 gap-6 mb-5 ">
                  <div className="col-span-6 sm:col-span-3">
                    <InputLocation
                      id="pickupName"
                      label="Adresse de départ du convoi"
                      placeholder="Renseigner l'adresse de départ du convoi"
                      value={pickupName}
                      onChange={setPickupName}
                      onChangeGeometry={setPickupGeometry}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      id="startDate"
                      type="datetime-local"
                      autoComplete="off"
                      label="Heure de départ du convoi"
                      placeholder="Renseigner l'heure de départ du convoi"
                      register={register("startDate", { required: true })}
                      error={errors.startDate}
                    />
                  </div>
                </div> */}
                {/* <div className="grid grid-cols-6 gap-6 mb-5">
                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      type="text"
                      id="carModel"
                      autoComplete="off"
                      placeholder="Modèle du véhicule"
                      label="Modèle du véhicule"
                      register={register("carModel", {
                        required: true,
                      })}
                      error={errors.carModel}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      type="number"
                      id="availableVolume"
                      autoComplete="off"
                      label="Volume disponible dans le véhicule"
                      placeholder="Renseigner le volume disponible en m3"
                      register={register("availableVolume", {
                        required: true,
                      })}
                      error={errors.availableVolume}
                    />
                  </div>
                </div> */}
                {/* <div className="grid grid-cols-6 gap-6 mb-5">
                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      type="number"
                      id="availableSeat"
                      autoComplete="off"
                      placeholder="Renseigner le nombre de place disponible dans le véhicule"
                      label="Nombre de places disponibles"
                      register={register("availableSeat", {
                        required: true,
                      })}
                      error={errors.availableSeat}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      type="number"
                      id="availableVolume"
                      autoComplete="off"
                      label="Volume disponible dans le véhicule"
                      placeholder="Renseigner le volume disponible en m3"
                      register={register("availableVolume", {
                        required: true,
                      })}
                      error={errors.availableVolume}
                    />
                  </div>
                </div> */}

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
                <div className="grid grid-cols-6 gap-6 mb-5">
                  <div className="col-span-6 sm:col-span-3 flex items-center">
                    <Checkbox
                      type="checkbox"
                      id="hadVehicle"
                      autoComplete="tel"
                      label="Je possède un véhicule"
                      register={register("hadVehicle")}
                      error={errors.hadVehicle}
                    />
                  </div>
                  {showAvailableSeat && (
                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        type="number"
                        id="availableSeat"
                        autoComplete={null}
                        label="Place disponible dans le véhicule"
                        placeholder="Place disponible dans le véhicule"
                        register={register("phone", {
                          required: true,
                        })}
                        error={errors.availableSeat}
                      />
                    </div>
                  )}
                </div>
                {showAvailableSeat && (
                  <div className="grid grid-cols-6 gap-6 mb-5 border-b border-dark pb-5">
                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        type="number"
                        id="availableVolume"
                        autoComplete={null}
                        placeholder="Volume en m3"
                        label="Volume disponible dans le véhicule"
                        register={register("availableVolume", {
                          required: true,
                        })}
                        error={errors.availableVolume}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        type="text"
                        id="vehicleModel"
                        autoComplete={null}
                        label="Modèle du véhicule"
                        placeholder="Téléphone de la personne à contacter"
                        register={register("vehicleModel")}
                        error={errors.vehicleModel}
                      />
                    </div>
                  </div>
                )}

                {/* BESOIN */}
                <div className="mb-5 ">
                  <Textarea
                    id="needs"
                    rows={8}
                    label="Remarques"
                    placeholder="Mettre votre lieu de départ / vos disponibilités, langues parlées etc ..."
                    register={register("needs")}
                    error={errors.needs}
                  />
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
