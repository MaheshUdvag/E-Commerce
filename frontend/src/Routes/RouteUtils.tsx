import { Route } from "react-router-dom";
import { Redirect } from "react-router";

const RouteUtils: React.FC<any> = (route: any) => {
  return (
    <Route
      path={route.path}
      render={(props) =>
        route.protected ? (
          route.authenticated ? (
            <route.component {...props} routes={route.routes} />
          ) : (
            <Redirect to="/login" />
          )
        ) : (
          <route.component {...props} routes={route.routes} />
        )
      }
      exact={route.exact}
    />
  );
};

export default RouteUtils;
