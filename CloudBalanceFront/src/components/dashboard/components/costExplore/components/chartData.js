const commonTextColors = {
  captionFontColor: "#000000",
  subCaptionFontColor: "#000000",
  xAxisNameFontColor: "#000000",
  yAxisNameFontColor: "#000000",
  labelFontColor: "#000000",
  valueFontColor: "#000000",
  legendItemFontColor: "#000000",
  toolTipColor: "#000000",
  toolTipBgColor: "#ffffff",
};


export const chartTypeConfig = {
  bar: {
    type: "mscolumn2d",
    chartSettings: {
      xaxisname: "Years",
      yaxisname: "Total number of apps in store",
      theme: "candy",
      bgColor: "#ffffff",
      bgAlpha: "100",
      canvasBgColor: "#ffffff",
      canvasBgAlpha: "100",
      ...commonTextColors,
    },
  },

  line: {
    type: "msline",
    chartSettings: {
      yaxisname: "% of Adults on this platform",
      showhovereffect: "1",
      numbersuffix: "%",
      drawcrossline: "1",
      plottooltext:
        "<b>$dataValue</b> of Adults were on $seriesName",
      theme: "candy",
      bgColor: "#ffffff",
      bgAlpha: "100",
      canvasBgColor: "#ffffff",
      canvasBgAlpha: "100",
      ...commonTextColors,
    },
  },

  stack: {
    type: "msstackedcolumn2d",
    chartSettings: {
      xaxisname: "Year",
      yaxisname: "Sales in M$",
      numberprefix: "$",
      numbersuffix: "M",
      showsum: "1",
      plottooltext:
        "Revenue from <b>$seriesName</b> in $label was <b>$dataValue</b>",
      theme: "candy",
      bgColor: "#ffffff",
      bgAlpha: "100",
      canvasBgColor: "#ffffff",
      canvasBgAlpha: "100",
      ...commonTextColors,
    },
  },
};



export const apiResponseData = {
  caption: "App Publishing Trend",
  subcaption: "2018-2024",
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

const transformToStackedDataset = (flatDataset) => {
  const midpoint = Math.ceil(flatDataset.length / 2);
  
  return [
    {
      dataset: flatDataset.slice(0, midpoint)
    },
    {
      dataset: flatDataset.slice(midpoint)
    }
  ];
};

// Helper function to build chart data source
export const buildChartDataSource = (chartType, apiData) => {
  const config = chartTypeConfig[chartType] || chartTypeConfig.bar;
  
  // Stack chart requires different dataset structure
  // Transform the flat dataset to nested format
  const dataset = chartType === 'stack' 
    ? transformToStackedDataset(apiData.dataset)
    : apiData.dataset;
  
  return {
    chart: {
      caption: apiData.caption,
      subcaption: apiData.subcaption,
      ...config.chartSettings
    },
    categories: apiData.categories,
    dataset: dataset
  };
};
