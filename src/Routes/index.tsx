import { Switch, Route, Redirect } from "react-router-dom";
import About from "../pages/About";
import MainLayout from "../layouts/MainLayout";
import OrderBook from "../pages/OrderBook";

function Routes() {
  return (
    <Switch>
      <Route path="/about">
        <MainLayout>
          <About />
        </MainLayout>
      </Route>
      <Route path="/order-book">
        <MainLayout>
          <OrderBook />
        </MainLayout>
      </Route>
      <Redirect from="/" to="/order-book" />
    </Switch>
  );
}

export default Routes;
