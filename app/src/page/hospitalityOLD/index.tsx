// @ts-nocheck

import { getCollects } from "call/collect";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CollectType } from "typings";

export const Hospitality: React.FC = () => {
  const [state, setState] = useState<CollectType[] | null>(null);
  const [error, setError] = useState(undefined);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getCollects().then((res) => {
      if (res.ok) setState(res.data);
      else setError(res.error);
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
