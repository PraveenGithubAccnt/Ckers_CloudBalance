import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";
import { chartTypeConfig, buildChartDataSource } from "./chartData";

ReactFusioncharts.fcRoot(FusionCharts, charts, CandyTheme);

function UnifiedChart({ chartType = "bar", data }) {
  // Get the chart type configuration
  const config = chartTypeConfig[chartType] || chartTypeConfig.bar;
  
  // Build the data source from API data and chart type
  const dataSource = buildChartDataSource(chartType, data);

  return (
    <ReactFusioncharts
      type={config.type}
      width="100%"
      height="43%"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
}

export default UnifiedChart;