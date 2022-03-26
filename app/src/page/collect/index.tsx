import { actions } from "mocks";
import { useParams } from "react-router-dom";

export const Collect: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // TODO: Get the current collect data form the API
  const res = id && actions.filter((a) => a.id === parseInt(id, 12))[0];

  if (!res) return <></>;
  return (
    <div className="grid grid-cols-1 gap-4 lg:col-span-2 ">
      <section aria-labelledby="section-1-title">
        <div className="rounded-lg bg-white overflow-hidden shadow">
          <div className="p-6">
            <p> {res.title}</p>
            <p> {res.city}</p>
            <p> {res.availableSeat} places disponibles</p>
          </div>
        </div>
      </section>
    </div>
  );
};
