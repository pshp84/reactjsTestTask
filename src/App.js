import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import TodolistWrapper from "./pages/todo/todolist";

import "./styles/styles.scss";

function App() {
  return (
    <BrowserRouter basename="/">
      <Fragment>
        <Switch>
          <Route exact path="/" component={props => <TodolistWrapper {...props} />} />
          {/* <Route exact path="/" component={TodolistWrapper} /> */}
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
