import { Header } from "components/header";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactElement<any, any>;
}

export const AuthLayout: React.FC<Props> = ({ children }) => {
  return <div className="h-[100vh] flex items-center justify-center">{children}</div>;
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
        {children}
        <footer>
          <div className="border-t border-gray-200 py-8 text-sm text-gray-500 text-center sm:text-left pl-20 space-x-6">
            <Link to="/mentions-legales" className="block sm:inline underline">
              Mentions légales
            </Link>

            <Link to="/a-propos" className="block sm:inline underline">
              A propos
            </Link>
            <div className="mt-2">
              <span className="block sm:inline">&copy; 2021 Odessa.</span>{" "}
              <span className="block sm:inline">Tous droits réservés.</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
