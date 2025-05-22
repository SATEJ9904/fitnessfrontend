import React from "react";
import styled from "styled-components";
import { ResponsivePie } from "@nivo/pie";

const Card = styled.div`
  flex: 1;
  min-width: 320px;
  padding: 32px;
  border: 1px solid ${"#fff"};
  border-radius: 14px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  background-color: ${({ theme }) => (theme === "dark" ? "#222" : "#121212")};
  display: flex;
  flex-direction: column;
  gap: 12px;
  @media (max-width: 600px) {
    padding: 20px;
  }
`;

const Title = styled.div`
  font-weight: 700;
  font-size: 20px;
  color: ${({ theme }) => (theme === "dark" ? "#000" : "#fff")};
  text-align: center;
  @media (max-width: 600px) {
    font-size: 16px;
  }
`;

const ChartWrapper = styled.div`
  height: 350px;
`;

const CategoryChart = ({ data, theme }) => {
  if (!data?.pieChartData || data.pieChartData.length === 0) {
    return (
      <Card theme={theme}>
        <Title theme={theme}>No data available</Title>
      </Card>
    );
  }

  return (
    <Card theme={theme}>
      <Title theme={theme}>Body Part Workout Ratio</Title>
      <ChartWrapper>
        <ResponsivePie
          data={data.pieChartData.map((item) => ({
            id: item.label,
            label: item.label,
            value: item.value,
          }))}
          margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
          innerRadius={0.2}
          padAngle={1}
          cornerRadius={2}
          colors={["#AF52DE", "#24C6B7", "#40A9F3"]}
          borderWidth={0}
          borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
          enableArcLabels={true}
          arcLabelsTextColor="#fff"
          arcLabelsFontSize={18}
          enableArcLinkLabels={true}
          arcLinkLabelsTextColor="#fff"
          arcLinkLabelsThickness={2}
          arcLinkLabelsColor={{ from: "color" }}
        />
      </ChartWrapper>
    </Card>
  );
};

export default CategoryChart;
