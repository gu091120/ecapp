declare const module: any;

import * as ReactDom from "react-dom";
import * as React from "react";
import App from './App';

ReactDom.render(<App />, document.getElementById("root"));

if (module.hot) module.hot.accept();
