import { getConvoys } from "call/convoy";
import { CustomMap } from "components/ mapGlsl";
import { useEffect, useState } from "react";
import { ConvoyType } from "typings";

export const Home = () => {
  const [state, setState] = useState<ConvoyType[] | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    getConvoys().then((res) => {
      if (res?.ok) setState(res.data);
      else setError(res?.error);
    });
  }, []);

  if (!state) return <>Chargement ...</>;
  if (error) return <p>{error}</p>;
  return (
    <section aria-labelledby="section-1-title">
      <h2 className="sr-only" id="section-1-title">
        Création d'un convoi
      </h2>
      <div className="rounded-lg bg-white overflow-hidden shadow">
        <div className="p-6  h-[70vh] w-full">{state && <CustomMap data={state} zoom={5} />}</div>
      </div>
    </section>
  );
};
