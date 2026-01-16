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

// CHART CONFIG 
export const chartTypeConfig = {
  bar: {
    type: "mscolumn2d",
    chartSettings: {
      xaxisname: "Month",
      yaxisname: "Cost",
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
      xaxisname: "Month",
      yaxisname: "Cost",
      drawcrossline: "1",
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
      xaxisname: "Month",
      yaxisname: "Cost",
      showsum: "1",
      theme: "candy",
      bgColor: "#ffffff",
      bgAlpha: "100",
      canvasBgColor: "#ffffff",
      canvasBgAlpha: "100",
      ...commonTextColors,
    },
  },
};



const MONTH_ORDER = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

// Stack Chart Helper
const transformToStackedDataset = (flatDataset) => {
  const midpoint = Math.ceil(flatDataset.length / 2);

  return [
    {
      dataset: flatDataset.slice(0, midpoint),
    },
    {
      dataset: flatDataset.slice(midpoint),
    },
  ];
};

//  API RESPONSE to CHART FORMAT 
export const transformCostExplorerApiResponse = (apiData) => {
  if (!apiData || !apiData.length) return null;

  const categories = [];
  const dataset = [];

  // Collect all unique month-year keys
  const monthSet = new Set();
  apiData.forEach(item => {
    Object.keys(item.monthlyCost || {}).forEach(m => monthSet.add(m));
  });

  // Sort month-year properly
  const sortedMonths = Array.from(monthSet).sort((a, b) => {
    const [y1, m1] = a.split("-");
    const [y2, m2] = b.split("-");
    return new Date(`${m1} 1 ${y1}`) - new Date(`${m2} 1 ${y2}`);
  });

  // Categories (X-axis)
  sortedMonths.forEach(month => {
    categories.push({ label: month });
  });

  // Dataset
  apiData.forEach(item => {
    dataset.push({
      seriesname: item.groupByKey,
      data: sortedMonths.map(m => ({
        value: item.monthlyCost?.[m] || 0
      }))
    });
  });

  return {
    chart: {
      xAxisName: "Month",
      yAxisName: "Cost",
      theme: "candy"
    },
    categories: [{ category: categories }],
    dataset
  };
};


//BUILD FINAL DATASOURCE 
export const buildChartDataSource = (chartType, apiData) => {
  const config = chartTypeConfig[chartType] || chartTypeConfig.bar;

  const dataset =
    chartType === "stack"
      ? transformToStackedDataset(apiData.dataset)
      : apiData.dataset;

  return {
    chart: {
      caption: apiData.caption,
      subcaption: apiData.subcaption,
      ...config.chartSettings,
    },
    categories: apiData.categories,
    dataset: dataset,
  };
};
