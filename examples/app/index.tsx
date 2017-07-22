import * as React from "react";
import * as ReactDOM from "react-dom";

import NumberSpinner from '../../src/InputNumberSpinner';

ReactDOM.render(
  <NumberSpinner
    step={1}
    format={2}
  />,
  document.getElementById("simple-example")
);