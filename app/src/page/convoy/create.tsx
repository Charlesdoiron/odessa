import { ConvoyForm } from "components/form/convoyForm";
import { useNavigate } from "react-router-dom";

export const ConvoyCreate = () => {
  let navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 gap-4 lg:col-span-2 ">
      <section aria-labelledby="section-1-title">
        <h2 className="sr-only" id="section-1-title">
          Création d'un convoi
        </h2>
        <div className="rounded-lg bg-white overflow-hidden shadow">
          <div className="p-6">
            <ConvoyForm onAbort={() => navigate("/")} />
          </div>
        </div>
      </section>
    </div>
  );
};
