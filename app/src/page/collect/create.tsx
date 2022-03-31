import { CollectForm } from "components/form/collectForm";
import { useNavigate } from "react-router-dom";

export const CollectCreate = () => {
  let navigate = useNavigate();

  return (
    <section aria-labelledby="section-1-title">
      <h2 className="sr-only" id="section-1-title">
        Création d'un convoi
      </h2>
      <div className="rounded-lg bg-white  shadow lg:mx-auto rounded-lg bg-white shadow -mt-[80px] mb-10 max-w-5xl mx-5  ">
        <div className="p-6 w-full  ">
          <CollectForm onAbort={() => navigate("/")} />
        </div>
      </div>
    </section>
  );
};
