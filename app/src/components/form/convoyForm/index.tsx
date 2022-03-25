// @ts-nocheck
import { useForm } from "react-hook-form";

import { Input } from "components/form/input";
import { Textarea } from "components/form/textarea";
import API from "services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputLocation } from "../input-location";

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

export const ConvoyForm: React.FC<Props> = ({ onAbort }) => {
  const [pickupGeometry, setPickupGeometry] = useState(null);
  const [pickupName, setPickupName] = useState(null);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = handleSubmit(async (form) => {
    const response = await API.post({
      path: "/convoy",
      body: { ...form, pickupName, pickupGeometry },
    });
    if (!response.ok) return alert(response.error);
    navigate("/");
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
                </div>
                <div className="grid grid-cols-6 gap-6 mb-5">
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
                </div>
                {/* BESOIN */}
                <div className="mb-5 pb-5 border-b border-dark">
                  <Textarea
                    id="needs"
                    rows={8}
                    label="Volume disponible dans le véhicule"
                    placeholder="Besoins"
                    register={register("needs")}
                    error={errors.needs}
                  />
                </div>
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
                <button onClick={onAbort} type="submit" className="text-dark underline">
                  Annuler
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center py-4 px-20 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
