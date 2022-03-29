import { deleteConvoy, getConvoy } from "call/convoy";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ConvoyType } from "typings";
import { CustomMap } from "components/ mapGlsl";
import { Header } from "./header";
import { Body } from "./body";

export const Convoy: React.FC = () => {
  const navigate = useNavigate();
  const [state, setState] = useState<ConvoyType | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getConvoy(id).then((res) => {
      if (res?.ok) setState(res.data);
      else setError(res?.error);
    });
  }, [id]);

  const handleDelete = () => {
    deleteConvoy(id);
    // dev stuff
    window.location.reload();
  };
  const handleEdit = () => {
    navigate(`/convoy/${id}/edit`);
  };

  if (!state) return <></>;
  if (error) return <p>{error}</p>;
  return (
    <div className="grid grid-cols-1 gap-4 lg:col-span-2 ">
      <section aria-labelledby="section-1-title">
        <div className="rounded-lg bg-white overflow-hidden shadow">
          <div className="rounded-lg bg-white overflow-hidden ">
            <div className="w-full h-[300px]">
              <CustomMap data={[state]} />
            </div>
          </div>
          <div className="p-6">
            <Header
              title="Ma collecte de Rennes"
              availableVolume={state.availableVolume}
              availableSeat={state.availableSeat}
              departure={state.departure}
              status={state.status}
            />

            <Body data={state} />

            <div className="flex justify-between w-full">
              <button className="btn text-red-400 mt-20" onClick={handleEdit}>
                Editer ce convoi
              </button>
              <button className="btn text-red-400 mt-20" onClick={handleDelete}>
                Supprimer ce convoi
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
