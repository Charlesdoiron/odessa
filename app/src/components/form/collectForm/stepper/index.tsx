import { useState } from "react";
import { CollectForm } from "..";
import { NoConvoyFound } from "./noConvoyFound";
import { Start } from "./start";
import { Success } from "./success";

interface Props {
  onAbort: () => void;
}

export type StepStatus = "start" | "prohibided" | "form" | "success";

export const Stepper: React.FC<Props> = ({ onAbort }) => {
  const [step, setStep] = useState<StepStatus>("start");

  const renderStep = () => {
    switch (step) {
      case "start":
        return <Start onAbort={onAbort} setStep={(newStep: StepStatus) => setStep(newStep)} />;
      case "form":
        return (
          <CollectForm onAbort={onAbort} setStep={(newStep: StepStatus) => setStep(newStep)} />
        );
      case "prohibided":
        return <NoConvoyFound />;
      case "success":
        return <Success />;

      default:
        return <div>default</div>;
    }
  };

  return renderStep();
};
