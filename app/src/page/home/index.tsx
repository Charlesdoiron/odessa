import { Map } from "components/map";

export const Home = () => {
  return (
    <section aria-labelledby="section-1-title">
      <h2 className="sr-only" id="section-1-title">
        Création d'un convoi
      </h2>
      <div className="rounded-lg bg-white overflow-hidden shadow">
        <div className="p-6">
          <Map />
        </div>
      </div>
    </section>
  );
};
