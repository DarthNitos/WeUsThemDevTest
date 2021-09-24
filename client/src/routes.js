import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Contacts } from "./pages/Contacts";
import { CreateContact } from "./pages/CreateContact";
import { UpdateContact } from "./pages/UpdateContact";

export const useRoutes = () => {
  return (
    <Switch>
      <Route path="/contacts" exact>
        <Contacts />
      </Route>
      <Route path="/create" exact>
        <CreateContact />
      </Route>
      <Route path="/update/:id">
        <UpdateContact />
      </Route>
      <Redirect to="/contacts" />
    </Switch>
  );
};
