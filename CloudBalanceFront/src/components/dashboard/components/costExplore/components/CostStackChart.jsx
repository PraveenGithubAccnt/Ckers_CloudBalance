import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

charts(FusionCharts);

const dataSource = {
  chart: {
    caption: "Break-up of Annual Revenue",
    subcaption: "In Million $",
    xaxisname: "Year",
    yaxisname: "Sales in M$",
    numberprefix: "$",
    numbersuffix: "M",
    showsum: "1",
    plottooltext:
      "Revenue from <b>$seriesName</b> in $label was <b>$dataValue</b>",
    theme: "candy"
  },
  categories: [
    {
      category: [
        {
          label: "2019"
        },
        {
          label: "2020"
        },
        {
          label: "2021"
        },
        {
          label: "2022"
        },
        {
          label: "2023"
        }
      ]
    }
  ],
  dataset: [
    {
      dataset: [
        {
          seriesname: "Developer libraries",
          data: [
            {
              value: "30"
            },
            {
              value: "26"
            },
            {
              value: "29"
            },
            {
              value: "31"
            },
            {
              value: "34"
            }
          ]
        },
        {
          seriesname: "Business Tools",
          data: [
            {
              value: "21"
            },
            {
              value: "28"
            },
            {
              value: "39"
            },
            {
              value: "41"
            },
            {
              value: "24"
            }
          ]
        }
      ]
    },
    {
      dataset: [
        {
          seriesname: "Infrastructure Consulting",
          data: [
            {
              value: "27"
            },
            {
              value: "25"
            },
            {
              value: "28"
            },
            {
              value: "26"
            },
            {
              value: "10"
            }
          ]
        },
        {
          seriesname: "Training",
          data: [
            {
              value: "17"
            },
            {
              value: "15"
            },
            {
              value: "18"
            },
            {
              value: "16"
            },
            {
              value: "10"
            }
          ]
        },
        {
          seriesname: "AMC",
          data: [
            {
              value: "12"
            },
            {
              value: "17"
            },
            {
              value: "16"
            },
            {
              value: "15"
            },
            {
              value: "12"
            }
          ]
        }
      ]
    }
  ]
};
function CostStckChart() {
    return (
      <ReactFusioncharts
        fusioncharts={FusionCharts}
        type="msstackedcolumn2d"
        width="100%"
      height="42%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    );
  }

export default CostStckChart;
