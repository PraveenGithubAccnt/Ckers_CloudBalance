import { useState } from "react";
import toast from "react-hot-toast";
import OnBoardingHeader from "../../onBoarding/components/OnBoardingHeader";
import IamRoleBody from "../../onBoarding/components/IamRoleBody";
import ActionButton from "../../onBoarding/components/ActionButton";
import AdCustManagPolicies from "../../onBoarding/components/AdCustManagPolicies";
import CreateCostUsgRpt from "../../onBoarding/components/CreateCostUsgRpt";
import { createArnAccnt } from "../../../../../api/awsArnApi";
function OnBoarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [arn, setArn] = useState("");
  const [accountId, setAccountId] = useState("");
  const [accountName, setAccountName] = useState("");
  const [loading, setLoading] = useState(false);

  const arnFilled = Boolean(arn.trim() && accountId.trim() && accountName.trim());

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
    setArn("");
    setAccountId("");
    setAccountName("");
    setCurrentStep(1);
  };

const handleSubmit = async () => {
  setLoading(true);

  try {
    await createArnAccnt({
      arnNumber: arn.trim(),
      accountId: accountId.trim(),
      name: accountName.trim(),
    });

    toast.success("AWS Account successfully saved!");
    
    setArn("");
    setAccountId("");
    setAccountName("");
    setCurrentStep(1);
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to save account");
  } finally {
    setLoading(false);
  }
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
        onNext={currentStep === 3 ? handleSubmit : handleNext}
        nextDisabled={(currentStep === 1 && !arnFilled) || loading}
        showBack={currentStep > 1}
        isLastStep={currentStep === 3}
        isSecondStep={currentStep === 2}
        loading={loading}
      />
    </div>
  );
}

export default OnBoarding;