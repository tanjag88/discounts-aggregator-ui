import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { useState } from "react";
import { useContext } from "react";
import { AllFiltersContext } from "../Contexts/AllFiltersContext";

const sliderTheme = createTheme({
  overrides: {
    MuiSlider: {
      thumb: {
        color: "black",
      },
      track: {
        color: "black",
      },
      rail: {
        color: "black",
      },
    },
  },
});

function valuetext(value) {
  return `${value}$`;
}

export default function PriceRange() {
  const { filtersState, setFiltersState } = useContext(AllFiltersContext);

  const [value, setValue] = useState(
    filtersState.priceRange.value !== [0, 10000]
      ? filtersState.priceRange.value
      : [0, 10000]
  );

  const handleChangeCommitted = () => {
    setFiltersState((prevFiltersState) => ({
      ...prevFiltersState,
      priceRange: {
        ...prevFiltersState.priceRange,
        value: [value[0], value[1]],
      },
      currentPage: { ...prevFiltersState.currentPage, value: 1 },
    }));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div className="price-range pt-4 mb-5">
        <h6 className="text-uppercase mb-4">Price range</h6>
        <br></br>
        <ThemeProvider theme={sliderTheme}>
          <Slider
            step={50}
            value={filtersState.priceRange.value}
            onChangeCommitted={handleChangeCommitted}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            min={0}
            max={10000}
            valueLabelFormat={(n) => "$" + n.toFixed()}
            passive={true}
          />
        </ThemeProvider>

        <div className="row pt-2">
          <div className="col-6">
            <strong className="small font-weight-bold text-uppercase">
              From{" "}
              <span style={{ color: "green" }}>
                {`${filtersState.priceRange.value[0]}$`}{" "}
              </span>
            </strong>
          </div>

          <div className="col-6 text-right">
            <strong className="small font-weight-bold text-uppercase">
              To{" "}
              <span style={{ color: "green" }}>
                {`${filtersState.priceRange.value[1]}$`}{" "}
              </span>
            </strong>
          </div>
        </div>
      </div>
    </>
  );
}
