import React, { useState, useEffect } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([["Date", "Prices"]]);

  useEffect(() => {
    if (historicalData?.prices) {
      let dataCopy = [["Date", "Price"]];
      historicalData.prices.forEach((item) => {
        // Format the date and push the data in the correct format
        const date = new Date(item[0]).toLocaleDateString();
        dataCopy.push([date, item[1]]);
      });
      setData(dataCopy);
    }
  }, [historicalData]);

  return (
    <div>
      {data.length > 1 ? (
        <Chart
          chartType="LineChart"
          data={data}
          width="100%"
          height="400px"
          legendToggle
        />
      ) : (
        <p>Loading chart data...</p>
      )}
    </div>
  );
};

export default LineChart;
