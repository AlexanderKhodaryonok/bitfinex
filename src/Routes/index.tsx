import { Switch, Route, Redirect } from "react-router-dom";
import About from "../pages/About";
import OrderBook from "../pages/OrderBook";

function Routes() {
  return (
    <Switch>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/order-book">
        <OrderBook />
      </Route>
      <Redirect from="/" to="/order-book" />
    </Switch>
  );
}

export default Routes;
