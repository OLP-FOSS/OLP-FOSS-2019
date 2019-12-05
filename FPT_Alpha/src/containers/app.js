import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import HomeContainer from "./home.container";
const App = () => (
  <BrowserRouter>
    <switch>
      <Route exact path="/" component={HomeContainer} />
    </switch>
  </BrowserRouter>
);

export default App;
