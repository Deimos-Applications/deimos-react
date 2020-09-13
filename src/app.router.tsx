import React from "react";
import { Router } from "@reach/router";

import HomePage from "./modules/dashboard/pages/home.page";
import ExamplePage from "./modules/example/pages/example.page";
import UserCrudPage from "./modules/user/pages/user-crud.page";
import LoginPage from "./modules/auth/pages/login.page";
import RegisterPage from "./modules/auth/pages/register.page";

const AppRouter = () => {
  return (
    <Router>
      <LoginPage path="/"></LoginPage>
      <RegisterPage path="/register"></RegisterPage>

      <HomePage path="/home" />
      <ExamplePage path="/example" />

      <UserCrudPage path="/users"></UserCrudPage>
    </Router>
  );
};

export default AppRouter;
