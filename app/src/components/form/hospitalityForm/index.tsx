// @ts-nocheck
import { useForm } from "react-hook-form";

import { Input } from "components/form/inputs/input";
import { Textarea } from "components/form/inputs/textarea";
import API from "services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputLocation } from "../inputs/input-location";

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

export const HospitalityForm: React.FC<Props> = ({ onAbort }) => {
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
            <p className="text-[30px] font-bold text-dark inline-block">
              Je propose un
            </p>
            <p className="text-[30px] font-bold text-indigo-600 inline-block ml-2 underline">
              logement
            </p>
            <form onSubmit={onSubmit}>
              <div className=" bg-white ">
                <div className="grid grid-cols-6 gap-6 mb-5 ">
                  <div className="col-span-6 sm:col-span-3">
                    <InputLocation
                      id="pickupName"
                      label="Adresse du logement"
                      placeholder="Renseigner l'adresse du logement"
                      value={pickupName}
                      onChange={setPickupName}
                      onChangeGeometry={setPickupGeometry}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      type="number"
                      id="availableSeat"
                      autoComplete="off"
                      placeholder="Renseigner le nombre de place disponible dans le logement"
                      label="Nombre de places disponibles"
                      register={register("availableSeat", {
                        required: true,
                      })}
                      error={errors.availableSeat}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-6 mb-5">
                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      type="text"
                      id="duration"
                      autoComplete="off"
                      placeholder="Durée"
                      label="Durée du prêt"
                      register={register("availableSeat", {
                        required: true,
                      })}
                      error={errors.availableSeat}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3"></div>
                </div>
                {/* BESOIN */}
                <div className="mb-5">
                  <Textarea
                    id="description"
                    rows={8}
                    label="Description"
                    placeholder="Description du logement, école proche etc ..."
                    register={register("description")}
                    error={errors.description}
                  />
                </div>
                <div className="mb-5">
                  <label className="block text-sm font-medium text-gray-700">
                    Photos
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Ajouter des photos</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  </div>
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
                  Mettre à disposition mon logement
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
