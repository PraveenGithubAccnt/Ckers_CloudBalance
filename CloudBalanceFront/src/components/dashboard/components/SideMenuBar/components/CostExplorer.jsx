import CostExplorerHeading from "../../costExplore/components/CostExplorerHeading";
import ChartSection from "../../costExplore/components/ChartSection";
import AwsServiceTable from "../../costExplore/components/AwsServiceTable";

function CostExplorer() {
  return (
    <div className="bg-gray-50 h-full overflow-y-auto">
      <div>
        <CostExplorerHeading />
      </div>

      <div>
        <ChartSection />
      </div>

      <div className="w-full px-6">
        <div className="py-4 mt-2 bg-blue-100 border rounded-sm">
          <h3 className="text-sm text-blue-500 font-medium text-center">
            We are showing up top 1000 records by cost
          </h3>
        </div>
      </div>
      
      <div className="mt-3">
        <AwsServiceTable />
      </div>
    </div>
  );
}

export default CostExplorer;