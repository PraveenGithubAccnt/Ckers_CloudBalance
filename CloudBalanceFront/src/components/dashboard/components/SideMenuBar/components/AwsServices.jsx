import { useState } from "react";
import EcAsgRds from "../../awsServices/components/EcAsgRds";
import EcAsgRdsDataTable from "../../awsServices/components/EcAsgRdsDataTable";
import { awsServiceTableRows } from "../../awsServices/components/awsServicesTabData";

function AwsServices() {
  const [activeService, setActiveService] = useState("EC2");

  return (
    <div>
      <h3 className="text-2xl font-semibold text-gray-800">Scheduler</h3>

      <div className="mt-3.5">
        <EcAsgRds onChange={setActiveService} />

        <div className="mt-4">
          <EcAsgRdsDataTable
            service={activeService}
            data={awsServiceTableRows[activeService]}
          />
        </div>
      </div>
    </div>
  );
}

export default AwsServices;
