// PieChartComponent.jsx
import React from "react";
import Chart from "react-apexcharts";

const PieChartComponent = ({ pieChartData }) => {

  if (!pieChartData || !pieChartData.series || pieChartData.series.length === 0) {
    return <p>Data tidak tersedia untuk tahun yang dipilih</p>;
  }

  const data = {
    series: pieChartData.series,
    options: pieChartData.options,
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <Chart
        options={data.options}
        series={data.series}
        type="pie"
        width="100%"
      />
    </div>
  );
};

export default PieChartComponent;
