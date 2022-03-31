import { getConvoy } from "call/convoy";
import { ConvoyForm } from "components/form/convoyForm";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { ConvoyType } from "typings";

export const ConvoyCreate = () => {
  const [state, setState] = useState<ConvoyType | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const { id } = useParams<{ id: string }>();

  let navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const isEditing = pathname.includes("/edit");

  useEffect(() => {
    if (isEditing) {
      getConvoy(id).then((res) => {
        if (res?.ok) setState(res.data);
        else setError(res?.error);
      });
    }
  }, [isEditing, id]);

  if (isEditing && !state) {
    // Wait initialValues to populate the form
    return <p>...Chargement</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div className="grid grid-cols-1 gap-4 lg:col-span-2 ">
      <section aria-labelledby="section-1-title">
        <h2 className="sr-only" id="section-1-title">
          Création d'un convoi
        </h2>
        <div className="rounded-lg bg-white  shadow lg:mx-auto rounded-lg bg-white shadow -mt-[80px] mb-10 max-w-5xl mx-5  ">
          <div className="p-6 w-full  ">
            <ConvoyForm
              onAbort={() => navigate("/")}
              initialValues={state}
              isEditing={isEditing}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
