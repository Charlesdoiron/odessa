import { HospitalityForm } from "components/form/hospitalityForm";
import { useNavigate } from "react-router-dom";

export const HospitalityCreate = () => {
  let navigate = useNavigate();

  return (
    <section aria-labelledby="section-1-title">
      <h2 className="sr-only" id="section-1-title">
        Je prête un logement
      </h2>
      <div className="rounded-lg bg-white overflow-hidden shadow">
        <div className="p-6">
          <HospitalityForm onAbort={() => navigate("/")} />
        </div>
      </div>
    </section>
  );
};
