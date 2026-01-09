import { useState } from "react";
import OnBoardingHeader from "../../onBoarding/components/OnBoardingHeader";
import IamRoleBody from "../../onBoarding/components/IamRoleBody";
import ActionButton from "../../onBoarding/components/ActionButton";
import AdCustManagPolicies from "../../onBoarding/components/AdCustManagPolicies";
import CreateCostUsgRpt from "../../onBoarding/components/CreateCostUsgRpt";

function OnBoarding() {
  const [currentStep, setCurrentStep] = useState(1);

  //lift state 
  const [arn, setArn] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accountName, setAccountName] = useState("");

  //derived state 
  const arnFilled = Boolean(
    arn.trim() &&
    accountId.trim() &&
    accountName.trim()
  );

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleCancel = () => {
    console.log("Cancel clicked");
  };

  return (
    <div className="h-230 overflow-y-auto">
      <OnBoardingHeader currentStep={currentStep} />

      {currentStep === 1 && (
        <IamRoleBody
          arn={arn}
          accountId={accountId}
          accountName={accountName}
          setArn={setArn}
          setAccountId={setAccountId}
          setAccountName={setAccountName}
        />
      )}

      {currentStep === 2 && <AdCustManagPolicies />}
      {currentStep === 3 && <CreateCostUsgRpt />}

      <ActionButton
        onCancel={handleCancel}
        onBack={handleBack}
        onNext={handleNext}
        nextDisabled={currentStep === 1 && !arnFilled}
        showBack={currentStep > 1}
        isLastStep={currentStep === 3}
        isSecondStep={currentStep === 2}
      />
    </div>
  );
}

export default OnBoarding;
