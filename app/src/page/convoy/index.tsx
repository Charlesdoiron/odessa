import { getConvoy } from "call/convoy";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ConvoyType } from "typings";
import React from "react";

export const Convoy: React.FC = () => {
  const [state, setState] = useState<ConvoyType | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    getConvoy(id).then((res) => {
      if (res?.ok) setState(res.data);
      else setError(res?.error);
    });
  }, [id]);
  if (!state) return <></>;
  if (error) return <p>{error}</p>;
  return (
    <div className="grid grid-cols-1 gap-4 lg:col-span-2 ">
      <section aria-labelledby="section-1-title">
        <div className="rounded-lg bg-white overflow-hidden shadow">
          <div className="p-6">
            <p> {state.availableVolume}m3 disponibles</p>
            <p> {state.availableSeat} places disponibles</p>
            <p>Organisateur: {state.name}</p>
            <p>email de l'organisateur: {state.email}</p>
            <p>Téléphone de l'organisateur: {state.phone}</p>
            <p>Adresse de départ {state.pickupName}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
