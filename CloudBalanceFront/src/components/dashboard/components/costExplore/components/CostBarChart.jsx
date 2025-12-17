import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import CandyTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFusioncharts.fcRoot(FusionCharts, charts, CandyTheme);

const dataSource = {
  chart: {
    caption: "App Publishing Trend",
    subcaption: "2018-2024",
    xaxisname: "Years",
    yaxisname: "Total number of apps in store",
    theme: "candy",
  },
  categories: [
    {
      category: [
        { label: "2018" },
        { label: "2019" },
        { label: "2020" },
        { label: "2021" },
        { label: "2022" },
        { label: "2023" },
        { label: "2024" }
      ]
    }
  ],
  dataset: [
    {
      seriesname: "Apple App Store",
      data: [
        { value: "1962576" },
        { value: "1798024" },
        { value: "1961897" },
        { value: "1903654" },
        { value: "1642759" },
        { value: "1725000" },
        { value: "1850000" }
      ]
    },
    {
      seriesname: "Google Play Store",
      data: [
        { value: "2108450" },
        { value: "2469894" },
        { value: "2868084" },
        { value: "4229856" },
        { value: "3553050" },
        { value: "3700000" },
        { value: "3900000" }
      ]
    },
    {
      seriesname: "Amazon Appstore",
      data: [
        { value: "500000" },
        { value: "600000" },
        { value: "700000" },
        { value: "850000" },
        { value: "900000" },
        { value: "950000" },
        { value: "1000000" }
      ]
    }
  ]
};

function CostBarChart() {
  return (
    <ReactFusioncharts
      type="mscolumn2d"
      width="100%"
      height="42%"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
}

export default CostBarChart;