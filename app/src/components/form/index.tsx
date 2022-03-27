import { useState } from "react";
import { Stepper } from "./collectForm/stepper";
import { ConvoyForm } from "./convoyForm";

type State = "convoy" | "collect" | null;

export const Form = () => {
  const [formType, setFormType] = useState<State>(null);

  const renderForm = () => {
    switch (formType) {
      case "convoy":
        return <ConvoyForm onAbort={() => setFormType(null)} />;
      case "collect":
        return <Stepper onAbort={() => setFormType(null)} />;
      // return <CollectForm onAbort={() => setFormType(null)} />;
      default:
        return <></>;
    }
  };

  const renderTitle = () => {
    switch (formType) {
      case "convoy":
        return "Créer un convoi";
      case "collect":
        return "Créer une collecte";
      default:
        return "Choisir une action";
    }
  };

  return (
    <div className="shadow sm:rounded-md sm:overflow-hidden">
      <div className="px-4 py-5 bg-white space-y-6 sm:p-6 w-full">
        <div className="">
          <p className="block text-xl font-medium text-gray-700 mb-10 text-center">
            {renderTitle()}
          </p>

          {formType === null && (
            <>
              <div className="pl-5 flex justify-center mb-5">
                <button
                  onClick={() => setFormType("convoy")}
                  className="inline-flex justify-center py-4 px-20 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Je Créer un convoi
                </button>
                <button
                  onClick={() => setFormType("collect")}
                  className="ml-10 inline-flex justify-center py-4 px-20 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Je Créer une collecte
                </button>
              </div>
            </>
          )}
        </div>
        {renderForm()}
      </div>
    </div>
  );
};
