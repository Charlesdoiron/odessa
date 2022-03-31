import { Cards } from "components/cards";
import { Header } from "components/header";
import { ReactElement } from "react";

interface Props {
  children: ReactElement<any, any>;
}

export const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-[100vh] flex items-center justify-center">{children}</div>
  );
};

export const SimpleMenuLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full">
      <Header isSimple />
      {children}
    </div>
  );
};

export const MenuLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="w-full">
      <Header />
      {children}
    </div>
  );
};

export const PrimaryLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header showFilters={true} />
      <div className="min-h-full">
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
                      <Cards />
                    </div>
                  </div>
                </section>
              </div>
              <div className="grid grid-cols-1 gap-4 lg:col-span-2 ">
                {children}
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left">
              <span className="block sm:inline">&copy; 2021 Odessa.</span>{" "}
              <span className="block sm:inline">Tous droits réservés.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
