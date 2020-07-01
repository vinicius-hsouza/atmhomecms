import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";
import Products from "../pages/product/Products";
import login from "../pages/login";
import Main from "../pages/Main";
import EditProduct from "../pages/product/EditProduct";
import Category from "../pages/category";
import EditCategory from "../pages/category/edit";
import Guide from "../pages/intallation";
import Integrator from "../pages/integrator";
import User from "../pages/User";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route path="/login" component={login} isPrivate={false} />
      <Route exact path="/product" component={Products} />
      <Route path="/product/new" component={EditProduct} />
      <Route path="/product/edit/:id" component={EditProduct} />
      <Route exact path="/category" component={Category} />
      <Route path="/category/new" component={EditCategory} />
      <Route path="/category/edit/:id" component={EditCategory} />
      <Route path="/guide" component={Guide} />
      <Route path="/integrator" component={Integrator} />
      <Route path="/users" component={User} />
    </Switch>
  );
}
