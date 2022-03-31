// @ts-nocheck
import { useForm, Controller } from "react-hook-form";

import { Input } from "components/form/inputs/input";
import { Textarea } from "components/form/inputs/textarea";
import API from "services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputLocation } from "../inputs/input-location";
import { CollectType } from "typings";
import { Dropdown } from "../inputs/dropdown";

interface Props {
  onAbort: () => void;
  initialValues?: CollectType | null;
  isEditing?: boolean;
}

const formatInitialValues = (initialValues: CollectType) => {
  if (!initialValues) return null;
  const formatted = {};
  for (const key of Object.keys(initialValues)) {
    if (["departure"].includes(key)) {
      // hack to react-hook-form, I didn't find a better way yet
      formatted[key] = new Date(initialValues[key]).toISOString().slice(0, 16);
    } else {
      formatted[key] = initialValues[key];
    }
  }
  return formatted;
};
export const CollectForm: React.FC<Props> = ({ onAbort, initialValues, isEditing }) => {
  const navigate = useNavigate();

  const [pickupGeometry, setPickupGeometry] = useState(initialValues?.pickupGeometry);
  const [pickupName, setPickupName] = useState(initialValues?.pickupName);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({ defaultValues: formatInitialValues(initialValues) });

  const onSubmit = handleSubmit(async (form) => {
    const response = await API.post({
      path: "/event",
      body: { ...form, type: "collect", pickupGeometry, pickupName },
    });
    if (!response.ok) return alert(response.error);
    navigate("/");
  });
  return (
    <>
      <div>
        <div className=" w-full">
          <div className="bg-white space-y-6 sm:p-6 w-full">
            <p className="text-[30px] font-bold text-dark inline-block">Je Créer une</p>
            <p className="text-[30px] font-bold text-indigo-600 inline-block ml-2 underline">
              collecte
            </p>
            <form onSubmit={onSubmit}>
              <div className=" bg-white ">
                <div className="w-full mb-5">
                  <div className="col-span-12 sm:col-span-3">
                    <Input
                      type="text"
                      id="title"
                      label="Titre de ma collectee"
                      placeholder="La collecte des Lilas (Pour retrouver / partager facilement la collecte)"
                      register={register("title", { required: true })}
                      error={errors.title}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-6 mb-5 ">
                  <div className="col-span-6 sm:col-span-3">
                    <InputLocation
                      id="pickupName"
                      label="Adresse de départ de la collecte"
                      placeholder="Ex : 9 avenue de l'horloge, 35300 Rennes"
                      name={pickupName}
                      geometry={pickupGeometry}
                      onChange={setPickupName}
                      onChangeGeometry={setPickupGeometry}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      id="departure"
                      type="datetime-local"
                      autoComplete="off"
                      label="Date de la collecte"
                      placeholder="Renseigner l'heure de la collecte"
                      register={register("departure", { required: true })}
                      error={errors.departure}
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
                  <div className="col-span-6 sm:col-span-3 ">
                    <Controller
                      name="status"
                      control={control}
                      defaultValue={{ label: "En cours", value: "accepted" }}
                      render={({ field }) => (
                        <Dropdown
                          label="Status de la collecte"
                          values={[
                            { label: "En attente", value: "pending" },
                            { label: "En cours", value: "accepted" },
                            { label: "Chargée !", value: "completed" },
                            { label: "Annulée", value: "canceled" },
                          ]}
                          register={register("status")}
                          error={errors.status}
                          id="status"
                          field={field}
                        />
                      )}
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
                <div className="grid grid-cols-6 gap-6 mb-5">
                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      type="text"
                      id="whatsappLink"
                      autoComplete="off"
                      placeholder="Lien du groupe whatsapp"
                      label="Lien du groupe whatsapp"
                      register={register("whatsappLink")}
                      error={errors.whatsappLink}
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
