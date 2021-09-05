import { Route } from "react-router-dom";
import { Redirect } from "react-router";
import { IRoute } from "./Routes";

interface IRouteUtils {
  route: IRoute;
  authenticated: boolean;
}

const RouteUtils: React.FC<IRouteUtils> = ({ route, authenticated }) => {
  return (
    <Route
      path={route.path}
      render={(props) =>
        route.type === "authenticated" ? (
          authenticated ? (
            <route.component {...props} routes={route.routes} />
          ) : (
            <Redirect to="/login" />
          )
        ) : route.type === "unAuthenticated" && authenticated ? (
          <Redirect to="/" />
        ) : (
          <route.component {...props} routes={route.routes} />
        )
      }
      exact={route.exact}
    />
  );
};

export default RouteUtils;
