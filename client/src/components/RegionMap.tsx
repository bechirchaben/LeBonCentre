import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/regions-version-simplifiee.geojson";

const RegionMap = ({ onRegionSelect }: { onRegionSelect: (region: string) => void }) => {
  return (
    <>
      <h2 className="mb-4">Cliquez sur une région</h2>
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{ scale: 1200, center: [2.5, 46.5] }}
        width={300}
        height={300}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onMouseDown={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onRegionSelect(geo.properties.nom);
                }}
                style={{
                  default: { fill: "#e0e0e0", stroke: "#fff", outline: "none", cursor: "pointer" },
                  hover: { fill: "#0047AB", stroke: "#333", strokeWidth: 0.8 },
                  pressed: { fill: "#0077cc", outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </>
  );
};

export default RegionMap;
