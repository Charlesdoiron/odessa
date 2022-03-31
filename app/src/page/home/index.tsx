import { CustomMap } from "components/ mapGlsl";
import { Cards } from "components/cards";
import { useEffect, useState } from "react";
import { ConvoyType } from "typings";
import { useLocation, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useWindowFocus from "use-window-focus";
import API from "services/api";

export const Home = () => {
  const { t } = useTranslation();
  const [state, setState] = useState<ConvoyType[] | null>(null);
  const [error, setError] = useState<string | undefined>(undefined);
  const [searchParams] = useSearchParams();
  const windowFocused = useWindowFocus();
  const location = useLocation();

  const refresh = async () => {
    const response = await API.get({ path: "/event" }); // searchParams are automatically added
    if (response.ok) {
      setState(response.data);
    } else {
      setError(response.error);
    }
  };

  useEffect(() => {
    if (windowFocused) {
      refresh();
    }
  }, [windowFocused, location.pathname, searchParams]);

  useEffect(() => {
    if (!state) {
      refresh();
    }
  }, [state]);

  if (!state) return <>{t("app.loading")}</>;
  if (error) return <p>{error}</p>;

  if (!state) return <>Chargement ...</>;
  if (error) return <p>{error}</p>;
  return (
    <main className="-mt-24 pb-8">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 ">
        <h1 className="sr-only">Page title</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className="grid grid-cols-1 gap-4">
            <section aria-labelledby="section-2-title">
              <h2 className="sr-only" id="section-2-title">
                Section title
              </h2>
              <div className="rounded-lg bg-white overflow-hidden shadow">
                <div className="p-6">
                  <Cards data={state} />
                </div>
              </div>
            </section>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:col-span-2 ">
            <section aria-labelledby="section-1-title">
              <h2 className="sr-only" id="section-1-title">
                Création d'un convoi
              </h2>
              <div className="rounded-lg bg-white overflow-hidden shadow">
                <div className="p-6  h-[70vh] w-full">
                  {state && <CustomMap data={state} zoom={5} />}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
};
