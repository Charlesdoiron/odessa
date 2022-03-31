// @ts-nocheck
import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "components/form/inputs/checkbox";

import { Input } from "components/form/inputs/input";
import { Textarea } from "components/form/inputs/textarea";
import API from "services/api";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { InputLocation } from "../inputs/input-location";
import { Dropdown } from "../inputs/dropdown";

interface Props {
  onAbort: () => void;
  initialValues?: ConvoyType | null;
  isEditing?: boolean;
}

const formatInitialValues = (initialValues = {}) => {
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

export const ConvoyForm: React.FC<Props> = ({ onAbort, initialValues, isEditing }) => {
  const [pickupGeometry, setPickupGeometry] = useState(initialValues?.pickupGeometry);
  const [pickupName, setPickupName] = useState(initialValues?.pickupName);
  const [dropOffGeometry, setDropOffGeometry] = useState(initialValues?.dropOffGeometry);
  const [dropOffName, setDropOffName] = useState(initialValues?.dropOffName);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
  } = useForm({ defaultValues: formatInitialValues(initialValues) });

  const onSubmit = handleSubmit(async (form) => {
    let response;

    const body = {
      ...form,
      pickupName,
      pickupGeometry,
      dropOffName,
      dropOffGeometry,
      type: "convoy",
    };

    if (isEditing) {
      response = await API.put({
        path: `/event/${initialValues?._id}`,
        body,
      });
    } else {
      response = await API.post({
        path: "/event",
        body,
      });
    }
    if (!response.ok) return alert(response.error);
    else navigate(`/convoy/${response.data._id}`);
  });

  const showOtherDrivers = watch("needDrivers");

  return (
    <>
      <div>
        <div className=" w-full">
          <div className="bg-white space-y-6 sm:p-6 w-full">
            {isEditing ? (
              <p className="text-[30px] font-bold text-dark inline-block">Modifier le convoi</p>
            ) : (
              <p className="text-[30px] font-bold text-dark inline-block">
                Créer un
                <em className="text-[30px] font-bold text-indigo-600 inline-block ml-2 underline">
                  convoi
                </em>
              </p>
            )}
            <form onSubmit={onSubmit}>
              <div className=" bg-white ">
                <div className="w-full mb-5">
                  <div className="col-span-12 sm:col-span-3">
                    <Input
                      type="text"
                      id="title"
                      label="Titre de mon convoi"
                      placeholder="Le convoi des Lilas (Pour retrouver / partager facilement le convoi)"
                      register={register("title", { required: true })}
                      error={errors.title}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-6 mb-5 ">
                  <div className="col-span-6 sm:col-span-3">
                    <InputLocation
                      id="pickupName"
                      label="Adresse de départ du convoi"
                      placeholder="Ex : 9 avenue de l'horloge, 35300 Rennes"
                      name={pickupName}
                      geometry={pickupGeometry}
                      onChange={setPickupName}
                      onChangeGeometry={setPickupGeometry}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <InputLocation
                      id="dropOffName"
                      label="Ville d'arrivée du convoi"
                      placeholder="Ex: Medyka, etc ..."
                      name={dropOffName}
                      geometry={dropOffGeometry}
                      onChange={setDropOffName}
                      onChangeGeometry={setDropOffGeometry}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <Input
                      id="departure"
                      type="datetime-local"
                      autoComplete="off"
                      label="Date de départ du convoi"
                      placeholder="Renseigner la date de départ du convoi"
                      register={register("departure", { required: true })}
                      error={errors.departure}
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

                <div className="grid grid-cols-6 gap-6 mb-5">
                  <div className="col-span-6 sm:col-span-3 flex items-center">
                    <Checkbox
                      type="checkbox"
                      id="needCollects"
                      autoComplete="off"
                      label="Je peux aller chercher des collectes proches"
                      register={register("needCollects")}
                      error={errors.needDrivers}
                    />
                  </div>
                  <div className="col-span-6 sm:col-span-3 ">
                    <Controller
                      name="status"
                      control={control}
                      defaultValue={{ label: "En cours", value: "accepted" }}
                      render={({ field }) => (
                        <Dropdown
                          label="Status du convoi"
                          values={[
                            { label: "En attente", value: "pending" },
                            { label: "En cours", value: "accepted" },
                            { label: "Annulée", value: "canceled" },
                            { label: "Sur la route", value: "delivering" },
                            { label: "Livrée !", value: "completed" },
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
                <div className="grid grid-cols-6 gap-6 mb-5">
                  <div className="col-span-6 sm:col-span-3 flex items-center mt-5">
                    <Checkbox
                      type="checkbox"
                      id="needDrivers"
                      autoComplete="off"
                      label="Je cherche d'autres chauffeurs"
                      register={register("needDrivers")}
                      error={errors.needDrivers}
                    />
                  </div>
                  {showOtherDrivers && (
                    <div className="col-span-6 sm:col-span-3">
                      <Input
                        type="number"
                        id="availableSeat"
                        autoComplete="off"
                        placeholder="Renseigner le nombre de place disponible dans le véhicule"
                        label="Nombre de places disponibles dans le véhicule"
                        register={register("availableSeat", {
                          required: true,
                        })}
                        error={errors.availableSeat}
                      />
                    </div>
                  )}
                </div>

                {/* BESOIN */}
                <div className="mb-5 pb-5 border-b border-dark">
                  <Textarea
                    id="needs"
                    rows={8}
                    label="Besoins"
                    placeholder="Nous cherchons un autre chauffeur, nous voulons transporter des affaires pour enfants etc ..."
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
                  {isEditing ? "Modifier le convoi" : "Créer le convoi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
