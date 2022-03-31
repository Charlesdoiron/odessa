import { deleteConvoy, getConvoy } from "call/convoy";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ConvoyType } from "typings";
import { CustomMap } from "components/ mapGlsl";
import { Header } from "./header";
import { Body } from "./body";

import { ArrowLeftIcon } from "@heroicons/react/solid";

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
    <div className="grid grid-cols-1 gap-4 lg:col-span-2 mx-5 md:mx-10 md:-mt-[70px] -mt-[90px] md:mb-10 mb-5 ">
      <section aria-labelledby="section-1-title ">
        <div
          className=" text-white text-right text-[14px] md:-mt-6 mb-2 cursor-pointer flex justify-start"
          onClick={() => navigate("/")}
        >
          <p>
            <ArrowLeftIcon
              className="mr-4 h-4 w-4 text-white mt-[3.5px]"
              aria-hidden="true"
            />
          </p>

          <p>Revenir à l'accueil</p>
        </div>
        <div className="rounded-lg bg-white overflow-hidden shadow">
          <div className="rounded-lg bg-white  relative ">
            <div className="w-full h-[300px]">
              <CustomMap data={[state]} />
            </div>
          </div>
          <div className="p-6">
            <Header
              title={state.title}
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
