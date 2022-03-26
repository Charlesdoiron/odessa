import { DriverForm } from "components/form/driverForm";
import { useNavigate } from "react-router-dom";

export const DriverCreate = () => {
  let navigate = useNavigate();

  return (
    <section aria-labelledby="section-1-title">
      <h2 className="sr-only" id="section-1-title">
        Je suis chauffeur
      </h2>
      <div className="rounded-lg bg-white overflow-hidden shadow">
        <div className="p-6">
          <DriverForm onAbort={() => navigate("/")} />
        </div>
      </div>
    </section>
  );
};
