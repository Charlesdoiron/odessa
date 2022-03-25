import { CollectForm } from "components/form/collectForm";
import { useNavigate } from "react-router-dom";

export const CollectCreate = () => {
  let navigate = useNavigate();

  return (
    <section aria-labelledby="section-1-title">
      <h2 className="sr-only" id="section-1-title">
        Création d'un convoi
      </h2>
      <div className="rounded-lg bg-white overflow-hidden shadow">
        <div className="p-6">
          <CollectForm onAbort={() => navigate("/")} setStep={console.log} />
        </div>
      </div>
    </section>
  );
};
