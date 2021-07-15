import React from "react";

import { ThemeProvider } from "@material-ui/styles";

import { createTheme } from "@material-ui/core/styles";

import Slider from "@material-ui/core/Slider";
import { useState } from "react";

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

export default function PriceRange({ priceRangeCallback, selectedValue}) {
 
  const [value, setValue] = useState(selectedValue?selectedValue:[0, 100000]);

  

  const handleChangeCommitted = () => {
    priceRangeCallback(
      `&price_gte=${value[0].toFixed()}&price_lte=${value[1].toFixed()}`
    );
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <div class="price-range pt-4 mb-5">
        <h6 class="text-uppercase mb-4">Price range</h6>
        <br></br>
        <ThemeProvider theme={sliderTheme}>
          <Slider
            step={50}
            value={value}
            onChangeCommitted={handleChangeCommitted}
            onChange={handleChange}
            valueLabelDisplay="auto"
            aria-labelledby="range-slider"
            getAriaValueText={valuetext}
            min={0}
            max={10000}
            valueLabelFormat={(n) => "$" + n.toFixed()}
          />
        </ThemeProvider>

        <div class="row pt-2">
          <div class="col-6">
            <strong class="small font-weight-bold text-uppercase">
              From <span style={{ color: "green" }}>{`${value[0]}$`} </span>
            </strong>
          </div>

          <div class="col-6 text-right">
            <strong class="small font-weight-bold text-uppercase">
              To <span style={{ color: "green" }}>{`${value[1]}$`} </span>
            </strong>
          </div>
        </div>
      </div>
    </>
  );
}
