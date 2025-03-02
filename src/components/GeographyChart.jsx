import { useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { geoFeatures } from "../data/mockGeoFeatures";
import { tokens } from "../theme";
import { mockGeographyData as data } from "../data/mockData";

const GeographyChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ResponsiveChoropleth
      data={data}
      features={geoFeatures.features}
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      domain={[0, 1000000]}
      unknownColor="#717171" // اللون الأساسي للخرائط
      label="properties.name"
      valueFormat=".2s"
      projectionScale={isDashboard ? 40 : 150}
      projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
      projectionRotation={[0, 0, 0]}
      // borderWidth={1}
      // borderColor="#3F3F3F"
      colors={["#717171", "#703233", "#0BB783", "#717171", "#A020F0", "#FF4500"]} // الرمادي أساسي والباقي بنسب قليلة
      fill={[
        { match: d => d.id === "USA", id: "#FFA800" }, 
        { match: d => d.id === "BRA", id: "#F64E60" },
        { match: d => d.id === "CHN", id: "#A020F0" }, // الصين بنفسجي
        // { match: d => d.id === "IND", id: "#0BB783" }, // الهند أخضر
        // { match: d => d.id === "RUS", id: "#FF4500" }, // روسيا برتقالي محمر
      ]}
      legends={undefined} 
    />
  );
};

export default GeographyChart;


// import { useTheme } from "@mui/material";
// import { ResponsiveChoropleth } from "@nivo/geo";
// import { geoFeatures } from "../data/mockGeoFeatures";
// import { tokens } from "../theme";
// import { mockGeographyData as data } from "../data/mockData";

// const GeographyChart = ({ isDashboard = false }) => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   return (
//     <ResponsiveChoropleth
//       data={data}
//       theme={{
//         axis: {
//           domain: {
//             line: {
//               stroke: colors.grey[100],
//             },
//           },
//           legend: {
//             text: {
//               fill: colors.grey[100],
//             },
//           },
//           ticks: {
//             line: {
//               stroke: colors.grey[100],
//               strokeWidth: 1,
//             },
//             text: {
//               fill: colors.grey[100],
//             },
//           },
//         },
//         legends: {
//           text: {
//             fill: colors.grey[100],
//           },
//         },
//       }}
//       features={geoFeatures.features}
//       margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
//       domain={[0, 1000000]}
//       unknownColor="#666666"
//       label="properties.name"
//       valueFormat=".2s"
//       projectionScale={isDashboard ? 40 : 150}
//       projectionTranslation={isDashboard ? [0.49, 0.6] : [0.5, 0.5]}
//       projectionRotation={[0, 0, 0]}
//       borderWidth={1.5}
//       borderColor="#ffffff"
//       legends={
//         !isDashboard
//           ? [
//               {
//                 anchor: "bottom-left",
//                 direction: "column",
//                 justify: true,
//                 translateX: 20,
//                 translateY: -100,
//                 itemsSpacing: 0,
//                 itemWidth: 94,
//                 itemHeight: 18,
//                 itemDirection: "left-to-right",
//                 itemTextColor: colors.grey[100],
//                 itemOpacity: 0.85,
//                 symbolSize: 18,
//                 effects: [
//                   {
//                     on: "hover",
//                     style: {
//                       itemTextColor: "#ffffff",
//                       itemOpacity: 1,
//                     },
//                   },
//                 ],
//               },
//             ]
//           : undefined
//       }
//     />
//   );
// };

// export default GeographyChart;
